import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';
import { JobCardComponent } from './JobCardComponent';
import { fetchAndRankJobs, getJobBoardSearchLinks, isArgentinaAccessible } from '../services/jobSearchService';
import {
  JOB_ROLES, GENERAL_ROLE, JOB_LEVELS, DATE_RANGES,
  getRoleLabel, getLevelRank, isWithinDays,
} from '../services/jobClassifier';

const PAGE_SIZE = 30;
const ALL_ROLES = [...JOB_ROLES, GENERAL_ROLE];

const SORTERS = {
  match: (a, b) => b.matchScore - a.matchScore || (b.postedTimestamp || 0) - (a.postedTimestamp || 0),
  recent: (a, b) => (b.postedTimestamp || 0) - (a.postedTimestamp || 0),
  oldest: (a, b) => (a.postedTimestamp || Infinity) - (b.postedTimestamp || Infinity),
  levelAsc: (a, b) => getLevelRank(a.level) - getLevelRank(b.level),
  levelDesc: (a, b) => getLevelRank(b.level) - getLevelRank(a.level),
};

const JobBoardComponent = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { isSpanish } = useContext(LanguageContext);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [stats, setStats] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Filters
  const [minScore, setMinScore] = useState(0);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [argentinaOnly, setArgentinaOnly] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const boardLinks = getJobBoardSearchLinks();

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    setProgress(null);

    try {
      const result = await fetchAndRankJobs((prog) => {
        setProgress(prog);
      });

      setJobs(result.jobs);
      setLastUpdated(new Date());
      setHasLoaded(true);
      setStats({
        total: result.jobs.length,
        totalRaw: result.totalRaw,
        avgScore: result.jobs.length > 0
          ? Math.round(result.jobs.reduce((s, j) => s + j.matchScore, 0) / result.jobs.length)
          : 0,
        highMatch: result.jobs.filter(j => j.matchScore >= 70).length,
        sources: result.sourceResults || {},
      });

      if (result.errors.length > 0) {
        setError(result.errors.map(e => `${e.query}: ${e.error}`).join(' | '));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setProgress(null);
    }
  }, []);

  // Apply filters (everything except role, so the role chips can show their own counts)
  const selectedRange = DATE_RANGES.find(r => r.key === dateRange);
  const baseFiltered = jobs.filter(job => {
    if (argentinaOnly && !isArgentinaAccessible(job)) return false;
    if (job.matchScore < minScore) return false;
    if (remoteOnly && !job.isRemote) return false;
    if (levelFilter !== 'all' && job.level !== levelFilter) return false;
    if (!isWithinDays(job.postedTimestamp, selectedRange.days)) return false;
    if (searchText) {
      const q = searchText.toLowerCase();
      const haystack = `${job.title} ${job.company} ${job.techTags.join(' ')} ${job.publisher}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const roleCounts = baseFiltered.reduce((acc, job) => ({ ...acc, [job.role]: (acc[job.role] || 0) + 1 }), {});
  const filtered = (roleFilter === 'all' ? baseFiltered : baseFiltered.filter(job => job.role === roleFilter))
    .slice()
    .sort(SORTERS[sortBy]);
  const visibleJobs = filtered.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [jobs, roleFilter, levelFilter, dateRange, sortBy, searchText, minScore, remoteOnly, argentinaOnly]);

  const clearFilters = () => {
    setRoleFilter('all');
    setLevelFilter('all');
    setDateRange('all');
    setSortBy('match');
    setSearchText('');
    setMinScore(0);
    setRemoteOnly(false);
    setArgentinaOnly(true);
  };

  const renderBoardSection = (title, icon, boards) => (
    <div className='jb-boards-section'>
      <h3 className='jb-boards-title'>
        <i className={icon}></i> {title}
      </h3>
      <div className='jb-boards-grid'>
        {boards.map((board, idx) => (
          <div key={idx} className={`jb-board-card ${darkMode ? 'jb-board-dark' : 'jb-board-light'}`}>
            <h4 className='jb-board-name'>
              <i className={board.icon}></i> {board.name}
            </h4>
            <div className='jb-board-links'>
              {board.urls.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='jb-board-link'
                >
                  {link.label} <i className='fas fa-arrow-right'></i>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Container fluid className={`jb-container ${darkMode ? 'jb-dark' : 'jb-light'}`}>
      {/* Header */}
      <Row className='jb-header-row'>
        <Col md={12}>
          <div className='jb-header'>
            <div className='jb-header-left'>
              <h1 className='jb-title'>
                <i className='fas fa-rocket'></i>
                {' Job Board'}
              </h1>
              <p className='jb-subtitle'>
                {isSpanish
                  ? '12 APIs automáticas + Fintech, Oil & Gas, recruiters IT y portales remotos. '
                  : '12 automatic APIs + Fintech, Oil & Gas, IT recruiters & remote boards. '
                }
                <a href='/jobs/relocate'>
                  {isSpanish ? '¿Querés relocalizarte y viajar? Mirá esta página →' : 'Want to relocate and travel? Check this page →'}
                </a>
              </p>
            </div>
            <div className='jb-header-right'>
              <button
                className='jb-refresh-btn'
                onClick={handleRefresh}
                disabled={loading}
              >
                <i className={`fas fa-sync-alt ${loading ? 'jb-spin' : ''}`}></i>
                {loading
                  ? (isSpanish ? ' Buscando...' : ' Searching...')
                  : (isSpanish ? ' Actualizar' : ' Refresh')
                }
              </button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Board Links */}
      <Row>
        <Col md={12}>
          {renderBoardSection(
            isSpanish ? 'Portales locales (Buenos Aires)' : 'Local boards (Buenos Aires)',
            'fas fa-map-marker-alt',
            boardLinks.local
          )}
          {renderBoardSection(
            isSpanish ? 'Fintech / Bancos' : 'Fintech / Banks',
            'fas fa-coins',
            boardLinks.fintech
          )}
          {renderBoardSection(
            isSpanish ? 'Oil & Gas / Ingeniería' : 'Oil & Gas / Engineering',
            'fas fa-industry',
            boardLinks.oilgas
          )}
          {renderBoardSection(
            isSpanish ? 'Recruiters IT — Buenos Aires' : 'IT Recruiters — Buenos Aires',
            'fas fa-user-tie',
            boardLinks.recruiters
          )}
          {renderBoardSection(
            isSpanish ? 'Agencias de reclutamiento remoto (LATAM)' : 'Remote recruiting agencies (LATAM)',
            'fas fa-handshake',
            boardLinks.agencies
          )}
          {renderBoardSection(
            isSpanish ? 'Crypto / Web3 (remoto)' : 'Crypto / Web3 (remote)',
            'fas fa-cubes',
            boardLinks.web3
          )}
          {renderBoardSection(
            isSpanish ? 'Portales remotos' : 'Remote boards',
            'fas fa-globe',
            boardLinks.remote
          )}
        </Col>
      </Row>

      {/* Progress Bar */}
      {loading && progress && (
        <Row>
          <Col md={12}>
            <div className='jb-progress-bar'>
              <div
                className='jb-progress-fill'
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              ></div>
            </div>
            <p className='jb-progress-text'>
              {isSpanish
                ? `Cargando ${progress.query}... (${progress.current}/${progress.total})`
                : `Loading ${progress.query}... (${progress.current}/${progress.total})`
              }
            </p>
          </Col>
        </Row>
      )}

      {/* Error */}
      {error && (
        <Row>
          <Col md={12}>
            <div className='jb-error'>
              <i className='fas fa-exclamation-triangle'></i> {error}
            </div>
          </Col>
        </Row>
      )}

      {/* Stats Banner */}
      {stats && !loading && (
        <Row>
          <Col md={12}>
            <div className='jb-stats-row'>
              <div className='jb-stat'>
                <span className='jb-stat-number'>{stats.total}</span>
                <span className='jb-stat-label'>{isSpanish ? 'empleos únicos' : 'unique jobs'}</span>
              </div>
              <div className='jb-stat'>
                <span className='jb-stat-number'>{stats.avgScore}</span>
                <span className='jb-stat-label'>{isSpanish ? 'match promedio' : 'avg match'}</span>
              </div>
              <div className='jb-stat'>
                <span className='jb-stat-number'>{stats.highMatch}</span>
                <span className='jb-stat-label'>{'≥70 match'}</span>
              </div>
              {stats.sources && Object.keys(stats.sources).length > 0 && (
                <div className='jb-stat jb-stat-sources'>
                  <span className='jb-stat-label'>
                    {Object.entries(stats.sources).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                  </span>
                </div>
              )}
              {lastUpdated && (
                <div className='jb-stat jb-stat-time'>
                  <span className='jb-stat-label'>
                    <i className='fas fa-clock'></i> {lastUpdated.toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
          </Col>
        </Row>
      )}

      {/* Filters */}
      {hasLoaded && (
        <Row>
          <Col md={12}>
            <div className='jb-filters'>
              <div className='jb-filter-group'>
                <label className='jb-filter-label'>
                  <i className='fas fa-search'></i>
                </label>
                <input
                  type='text'
                  className='jb-filter-input'
                  placeholder={isSpanish ? 'Buscar por título, empresa, tech o fuente...' : 'Search by title, company, tech or source...'}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className='jb-filter-group'>
                <label className='jb-filter-label'>
                  {isSpanish ? 'Match mínimo:' : 'Min match:'}
                </label>
                <input
                  type='range'
                  className='jb-filter-range'
                  min='0'
                  max='100'
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                />
                <span className='jb-filter-value'>{minScore}</span>
              </div>
              <div className='jb-filter-group'>
                <label className='jb-filter-checkbox-label'>
                  <input
                    type='checkbox'
                    checked={remoteOnly}
                    onChange={(e) => setRemoteOnly(e.target.checked)}
                    className='jb-filter-checkbox'
                  />
                  {isSpanish ? 'Solo remotos' : 'Remote only'}
                </label>
              </div>
              <div className='jb-filter-group'>
                <label className='jb-filter-checkbox-label'>
                  <input
                    type='checkbox'
                    checked={argentinaOnly}
                    onChange={(e) => setArgentinaOnly(e.target.checked)}
                    className='jb-filter-checkbox'
                  />
                  {isSpanish ? 'Argentina / remoto global' : 'Argentina / global remote'}
                </label>
              </div>
              <div className='jb-filter-group'>
                <label className='jb-filter-label'>{isSpanish ? 'Nivel:' : 'Level:'}</label>
                <select className='jb-filter-input jb-filter-select' value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
                  <option value='all'>{isSpanish ? 'Todos' : 'All'}</option>
                  {JOB_LEVELS.map(l => <option key={l.key} value={l.key}>{isSpanish ? l.esp : l.eng}</option>)}
                </select>
              </div>
              <div className='jb-filter-group'>
                <label className='jb-filter-label'>{isSpanish ? 'Publicada:' : 'Posted:'}</label>
                <select className='jb-filter-input jb-filter-select' value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                  {DATE_RANGES.map(r => <option key={r.key} value={r.key}>{isSpanish ? r.esp : r.eng}</option>)}
                </select>
              </div>
              <div className='jb-filter-group'>
                <label className='jb-filter-label'>{isSpanish ? 'Ordenar por:' : 'Sort by:'}</label>
                <select className='jb-filter-input jb-filter-select' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value='match'>{isSpanish ? 'Mejor match' : 'Best match'}</option>
                  <option value='recent'>{isSpanish ? 'Más recientes' : 'Most recent'}</option>
                  <option value='oldest'>{isSpanish ? 'Más antiguas' : 'Oldest'}</option>
                  <option value='levelAsc'>{isSpanish ? 'Nivel Junior → Senior' : 'Level Junior → Senior'}</option>
                  <option value='levelDesc'>{isSpanish ? 'Nivel Senior → Junior' : 'Level Senior → Junior'}</option>
                </select>
              </div>
              <button className='jb-clear-btn' onClick={clearFilters}>
                {isSpanish ? 'Borrar filtros' : 'Clear filters'}
              </button>
              <div className='jb-filter-results'>
                {filtered.length} / {jobs.length} {isSpanish ? 'resultados' : 'results'}
              </div>
            </div>
            <div className='jb-chips'>
              <button
                className={`jb-chip${roleFilter === 'all' ? ' jb-chip-active' : ''}`}
                onClick={() => setRoleFilter('all')}
              >
                {isSpanish ? 'Todos los roles' : 'All roles'} ({baseFiltered.length})
              </button>
              {ALL_ROLES.filter(r => roleCounts[r.key]).map(r => (
                <button
                  key={r.key}
                  className={`jb-chip${roleFilter === r.key ? ' jb-chip-active' : ''}`}
                  onClick={() => setRoleFilter(r.key)}
                >
                  {getRoleLabel(r.key, isSpanish)} ({roleCounts[r.key]})
                </button>
              ))}
            </div>
          </Col>
        </Row>
      )}

      {/* Job List */}
      {!hasLoaded && !loading && (
        <Row>
          <Col md={12}>
            <div className='jb-empty-state'>
              <i className='fas fa-briefcase'></i>
              <h3>{isSpanish ? 'Empleos automáticos' : 'Automatic job feed'}</h3>
              <p>
                {isSpanish
                  ? 'Presioná "Actualizar" para cargar empleos de Remotive, Arbeitnow, RemoteOK, Himalayas, GetOnBoard, Mercado Libre, Ashby (Mural, Linear, Pomelo, Brex y más), Workday (Chevron, Halliburton, Baker Hughes), Lever (Nubank, Rappi), Workable (Belo) y Recruitee (Ready). Para Fintech, Oil & Gas, recruiters IT y otros portales, usá los links de arriba.'
                  : 'Click "Refresh" to load jobs from Remotive, Arbeitnow, RemoteOK, Himalayas, GetOnBoard, Mercado Libre, Ashby (Mural, Linear, Pomelo, Brex and more), Workday (Chevron, Halliburton, Baker Hughes), Lever (Nubank, Rappi), Workable (Belo) & Recruitee (Ready). For Fintech, Oil & Gas, IT recruiters and other boards, use the links above.'
                }
              </p>
            </div>
          </Col>
        </Row>
      )}

      {hasLoaded && !loading && filtered.length === 0 && (
        <Row>
          <Col md={12}>
            <div className='jb-empty-state'>
              <i className='fas fa-filter'></i>
              <h3>{isSpanish ? 'Sin resultados' : 'No results'}</h3>
              <p>
                {isSpanish
                  ? 'Probá ajustar los filtros para ver más empleos.'
                  : 'Try adjusting the filters to see more jobs.'
                }
              </p>
            </div>
          </Col>
        </Row>
      )}

      <Row>
        <Col md={12} className='jb-jobs-list'>
          {visibleJobs.map((job) => (
            <JobCardComponent key={job.id} job={job} />
          ))}
          {filtered.length > visibleJobs.length && (
            <div className='jb-more-wrap'>
              <p className='jb-more-count'>
                {isSpanish ? 'Mostrando' : 'Showing'} {visibleJobs.length} {isSpanish ? 'de' : 'of'} {filtered.length}
              </p>
              <button className='jb-more-btn' onClick={() => setVisibleCount(c => c + PAGE_SIZE)}>
                {isSpanish
                  ? `Mostrar ${Math.min(PAGE_SIZE, filtered.length - visibleJobs.length)} más`
                  : `Show ${Math.min(PAGE_SIZE, filtered.length - visibleJobs.length)} more`}
              </button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default JobBoardComponent;
