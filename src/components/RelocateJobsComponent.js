import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';
import { RelocateJobCardComponent } from './RelocateJobCardComponent';
import {
  fetchRelocateJobs,
  fetchArsPerUsd,
  getCuratedCompanies,
  getRegionLabel,
} from '../services/relocateJobsService';

const TARGET_ARS_MONTHLY = 5833474;
const REGIONS = ['us', 'europe', 'latam', 'anz', 'worldwide'];

const RelocateJobsComponent = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { isSpanish } = useContext(LanguageContext);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [fxRate, setFxRate] = useState(null);

  const [activeRegions, setActiveRegions] = useState(new Set(REGIONS));
  const [authFilter, setAuthFilter] = useState('all'); // all | likely | unclear
  const [meetsSalaryOnly, setMeetsSalaryOnly] = useState(false);
  const [searchText, setSearchText] = useState('');

  const curatedCompanies = getCuratedCompanies();
  const targetUsdMonthly = fxRate ? TARGET_ARS_MONTHLY / fxRate : null;

  useEffect(() => {
    fetchArsPerUsd().then(setFxRate);
  }, []);

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    setProgress(null);

    try {
      const result = await fetchRelocateJobs((prog) => setProgress(prog));
      setJobs(result.jobs);
      setFxRate(result.fxRate);
      setHasLoaded(true);
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

  const toggleRegion = (region) => {
    setActiveRegions(prev => {
      const next = new Set(prev);
      if (next.has(region)) next.delete(region); else next.add(region);
      return next;
    });
  };

  const filtered = jobs.filter(job => {
    if (!job.regions.some(r => activeRegions.has(r))) return false;
    if (authFilter !== 'all' && job.authorizationStatus !== authFilter) return false;
    if (meetsSalaryOnly && targetUsdMonthly) {
      const value = job.salaryMax || job.salaryMin;
      if (!value) return false;
    }
    if (searchText) {
      const q = searchText.toLowerCase();
      const haystack = `${job.title} ${job.company} ${job.techTags.join(' ')}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const renderCuratedSection = (regionKey) => {
    const companies = curatedCompanies[regionKey] || [];
    if (companies.length === 0) return null;
    return (
      <div key={regionKey} className='jb-boards-section'>
        <h3 className='jb-boards-title'>
          <i className='fas fa-globe'></i> {getRegionLabel(regionKey, isSpanish)}
        </h3>
        <div className='jb-boards-grid'>
          {companies.map((c, idx) => (
            <div key={idx} className={`jb-board-card ${darkMode ? 'jb-board-dark' : 'jb-board-light'}`}>
              <h4 className='jb-board-name'>
                <i className={c.icon}></i> {c.name}
              </h4>
              <p className='rj-company-note'>{c.hiringModel}</p>
              <div className='jb-board-links'>
                <a href={c.careerUrl} target='_blank' rel='noopener noreferrer' className='jb-board-link'>
                  {isSpanish ? 'Ver posiciones' : 'View openings'} <i className='fas fa-arrow-right'></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Container fluid className={`jb-container ${darkMode ? 'jb-dark' : 'jb-light'}`}>
      <Row className='jb-header-row'>
        <Col md={12}>
          <div className='jb-header'>
            <div className='jb-header-left'>
              <h1 className='jb-title'>
                <i className='fas fa-suitcase-rolling'></i>
                {' ' + (isSpanish ? 'Trabajo Remoto y Viajar' : 'Remote & Travel Jobs')}
              </h1>
              <p className='jb-subtitle'>
                {isSpanish
                  ? 'Empleos remotos en EE.UU., Europa, LATAM y Australia/NZ, filtrados por tu stack y tu objetivo salarial. Volvé al '
                  : 'Remote jobs in the US, Europe, LATAM and Australia/NZ, filtered by your stack and salary target. Back to the '
                }
                <a href='/jobs'>{isSpanish ? 'buscador principal de empleos' : 'main job board'}</a>.
              </p>
            </div>
            <div className='jb-header-right'>
              <button className='jb-refresh-btn' onClick={handleRefresh} disabled={loading}>
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

      <Row>
        <Col md={12}>
          <div className='rj-target-banner'>
            <i className='fas fa-bullseye'></i>{' '}
            {isSpanish
              ? `Tu objetivo: ARS ${TARGET_ARS_MONTHLY.toLocaleString()}/mes neto combinado`
              : `Your target: ARS ${TARGET_ARS_MONTHLY.toLocaleString()}/mo combined net`
            }
            {targetUsdMonthly && (
              <> {' ≈ USD ' + Math.round(targetUsdMonthly).toLocaleString() + '/' + (isSpanish ? 'mes' : 'mo')}
                {' '}({isSpanish ? 'dólar blue' : 'blue-dollar rate'}: {fxRate ? Math.round(fxRate).toLocaleString() : '...'} ARS/USD)
              </>
            )}
          </div>
          <div className='rj-disclaimer'>
            <i className='fas fa-exclamation-triangle'></i>{' '}
            {isSpanish
              ? 'Los badges de "autorización" y los requisitos son detectados automáticamente desde el texto de cada publicación — son una guía, no un dato confirmado. Siempre verificá con la empresa antes de aplicar.'
              : 'The "authorization" badges and requirements are auto-detected from each listing\'s text — they are a guide, not confirmed fact. Always verify with the company before applying.'
            }
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          {REGIONS.map(renderCuratedSection)}
        </Col>
      </Row>

      {loading && progress && (
        <Row>
          <Col md={12}>
            <div className='jb-progress-bar'>
              <div className='jb-progress-fill' style={{ width: `${(progress.current / progress.total) * 100}%` }}></div>
            </div>
            <p className='jb-progress-text'>
              {isSpanish ? `Cargando ${progress.query}... (${progress.current}/${progress.total})` : `Loading ${progress.query}... (${progress.current}/${progress.total})`}
            </p>
          </Col>
        </Row>
      )}

      {error && (
        <Row>
          <Col md={12}>
            <div className='jb-error'><i className='fas fa-exclamation-triangle'></i> {error}</div>
          </Col>
        </Row>
      )}

      {hasLoaded && (
        <Row>
          <Col md={12}>
            <div className='jb-filters'>
              <div className='jb-filter-group'>
                <label className='jb-filter-label'><i className='fas fa-search'></i></label>
                <input
                  type='text'
                  className='jb-filter-input'
                  placeholder={isSpanish ? 'Buscar por título, empresa o tech...' : 'Search by title, company or tech...'}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className='jb-filter-group rj-region-toggles'>
                {REGIONS.map(r => (
                  <label key={r} className='jb-filter-checkbox-label'>
                    <input
                      type='checkbox'
                      className='jb-filter-checkbox'
                      checked={activeRegions.has(r)}
                      onChange={() => toggleRegion(r)}
                    />
                    {getRegionLabel(r, isSpanish)}
                  </label>
                ))}
              </div>
              <div className='jb-filter-group'>
                <label className='jb-filter-label'>{isSpanish ? 'Autorización:' : 'Authorization:'}</label>
                <select className='jb-filter-input' value={authFilter} onChange={(e) => setAuthFilter(e.target.value)}>
                  <option value='all'>{isSpanish ? 'Todas' : 'All'}</option>
                  <option value='likely'>{isSpanish ? 'Probablemente abierto' : 'Likely open'}</option>
                  <option value='unclear'>{isSpanish ? 'A verificar' : 'Unclear'}</option>
                </select>
              </div>
              <div className='jb-filter-group'>
                <label className='jb-filter-checkbox-label'>
                  <input
                    type='checkbox'
                    checked={meetsSalaryOnly}
                    onChange={(e) => setMeetsSalaryOnly(e.target.checked)}
                    className='jb-filter-checkbox'
                  />
                  {isSpanish ? 'Solo con salario publicado' : 'Only with disclosed salary'}
                </label>
              </div>
              <div className='jb-filter-results'>
                {filtered.length} / {jobs.length} {isSpanish ? 'resultados' : 'results'}
              </div>
            </div>
          </Col>
        </Row>
      )}

      {!hasLoaded && !loading && (
        <Row>
          <Col md={12}>
            <div className='jb-empty-state'>
              <i className='fas fa-suitcase-rolling'></i>
              <h3>{isSpanish ? 'Empleos para relocalizarte' : 'Relocate-friendly jobs'}</h3>
              <p>
                {isSpanish
                  ? 'Presioná "Actualizar" para buscar empleos remotos de las mismas fuentes del buscador principal, filtrados por región y con requisitos detectados automáticamente.'
                  : 'Click "Refresh" to search remote jobs from the same sources as the main board, filtered by region with auto-detected requirements.'
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
              <p>{isSpanish ? 'Probá ajustar los filtros para ver más empleos.' : 'Try adjusting the filters to see more jobs.'}</p>
            </div>
          </Col>
        </Row>
      )}

      <Row>
        <Col md={12} className='jb-jobs-list'>
          {filtered.map((job) => (
            <RelocateJobCardComponent key={job.id} job={job} targetUsdMonthly={targetUsdMonthly} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default RelocateJobsComponent;
