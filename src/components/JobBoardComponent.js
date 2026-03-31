import React, { useContext, useState, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';
import { JobCardComponent } from './JobCardComponent';
import { fetchAndRankJobs, getJobBoardSearchLinks, isArgentinaAccessible } from '../services/jobSearchService';

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

  // Apply filters
  const filtered = jobs.filter(job => {
    if (argentinaOnly && !isArgentinaAccessible(job)) return false;
    if (job.matchScore < minScore) return false;
    if (remoteOnly && !job.isRemote) return false;
    if (searchText) {
      const q = searchText.toLowerCase();
      const haystack = `${job.title} ${job.company} ${job.techTags.join(' ')} ${job.publisher}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

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
                  ? '9 APIs automáticas + Oil & Gas, recruiters IT y portales remotos'
                  : '9 automatic APIs + Oil & Gas, IT recruiters & remote boards'
                }
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
              <div className='jb-filter-results'>
                {filtered.length} / {jobs.length} {isSpanish ? 'resultados' : 'results'}
              </div>
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
                  ? 'Presioná "Actualizar" para cargar empleos de Remotive, Arbeitnow, RemoteOK, Himalayas, GetOnBoard, Mercado Libre, Ashby (Mural, Linear, PostHog y más) y Workday (Chevron, Halliburton, Baker Hughes). Para Oil & Gas, recruiters IT y otros portales, usá los links de arriba.'
                  : 'Click "Refresh" to load jobs from Remotive, Arbeitnow, RemoteOK, Himalayas, GetOnBoard, Mercado Libre, Ashby (Mural, Linear, PostHog and more) & Workday (Chevron, Halliburton, Baker Hughes). For Oil & Gas, IT recruiters and other boards, use the links above.'
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
          {filtered.map((job) => (
            <JobCardComponent key={job.id} job={job} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default JobBoardComponent;
