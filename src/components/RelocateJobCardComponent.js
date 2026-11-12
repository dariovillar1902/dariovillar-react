import React, { useContext, useState } from 'react';
import { LanguageContext } from './languageContext';
import { DarkModeContext } from './darkModeContext';
import { getRegionLabel, getAuthorizationGuidance, getSalaryComparison } from '../services/relocateJobsService';

const AUTH_BADGE = {
  likely: { icon: 'fas fa-check-circle', className: 'rj-auth-likely' },
  unclear: { icon: 'fas fa-question-circle', className: 'rj-auth-unclear' },
  unlikely: { icon: 'fas fa-times-circle', className: 'rj-auth-unlikely' },
};

export const RelocateJobCardComponent = ({ job, targetUsdMonthly }) => {
  const { isSpanish } = useContext(LanguageContext);
  const { darkMode } = useContext(DarkModeContext);
  const [expanded, setExpanded] = useState(false);

  const authBadge = AUTH_BADGE[job.authorizationStatus] || AUTH_BADGE.unclear;
  const authLabel = {
    likely: isSpanish ? 'Probablemente abierto a Argentina' : 'Likely open to Argentina',
    unclear: isSpanish ? 'A verificar' : 'Unclear — verify',
    unlikely: isSpanish ? 'Probablemente requiere visa local' : 'Likely requires local visa',
  }[job.authorizationStatus];

  const salaryComparison = getSalaryComparison(job, targetUsdMonthly);
  const salaryLabel = salaryComparison.status === 'unknown'
    ? (isSpanish ? 'Salario no publicado' : 'Salary not disclosed')
    : salaryComparison.status === 'meets_or_exceeds'
      ? (isSpanish ? `≈ USD ${salaryComparison.monthlyUsd.toLocaleString()}/mes — cumple tu objetivo` : `≈ USD ${salaryComparison.monthlyUsd.toLocaleString()}/mo — meets your target`)
      : (isSpanish ? `≈ USD ${salaryComparison.monthlyUsd.toLocaleString()}/mes — por debajo de tu objetivo` : `≈ USD ${salaryComparison.monthlyUsd.toLocaleString()}/mo — below your target`);

  return (
    <div className={`jb-card rj-card ${darkMode ? 'jb-card-dark' : 'jb-card-light'}`}>
      <div className='jb-card-header'>
        <div className='jb-card-info'>
          {job.companyLogo && (
            <img
              src={job.companyLogo}
              alt={job.company}
              className='jb-company-logo'
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          <div className='jb-card-titles'>
            <h3 className='jb-job-title'>{job.title}</h3>
            <p className='jb-company-name'>{job.company}</p>
          </div>
        </div>
        <div className={`rj-auth-badge ${authBadge.className}`}>
          <i className={authBadge.icon}></i> {authLabel}
        </div>
      </div>

      <div className='jb-card-meta'>
        <span className='jb-meta-item'>
          <i className='fas fa-map-marker-alt'></i> {job.city || (isSpanish ? 'Remoto' : 'Remote')}
        </span>
        {job.regions.map(r => (
          <span key={r} className='rj-region-tag'>
            <i className='fas fa-globe'></i> {getRegionLabel(r, isSpanish)}
          </span>
        ))}
        {job.postedAt && (
          <span className='jb-meta-item'>
            <i className='fas fa-clock'></i> {isSpanish ? job.postedAt.esp : job.postedAt.eng}
          </span>
        )}
        <span className={`rj-salary-tag ${salaryComparison.status === 'meets_or_exceeds' ? 'rj-salary-good' : salaryComparison.status === 'below' ? 'rj-salary-low' : ''}`}>
          <i className='fas fa-dollar-sign'></i> {salaryLabel}
        </span>
      </div>

      {job.techTags && job.techTags.length > 0 && (
        <div className='jb-tech-tags'>
          {job.techTags.map((tag, i) => (
            <span key={i} className='jb-tech-tag'>{tag}</span>
          ))}
        </div>
      )}

      <div className='rj-auth-guidance'>
        <i className='fas fa-info-circle'></i> {getAuthorizationGuidance(job.authorizationStatus, isSpanish)}
      </div>

      {job.requirements && job.requirements.length > 0 && (
        <div className='rj-requirements'>
          <button className='jb-expand-btn' onClick={() => setExpanded(!expanded)}>
            {expanded
              ? (isSpanish ? 'Ocultar requisitos detectados ▲' : 'Hide detected requirements ▲')
              : (isSpanish ? 'Ver requisitos detectados ▼' : 'View detected requirements ▼')
            }
          </button>
          {expanded && (
            <ul className='rj-requirements-list'>
              {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
            </ul>
          )}
        </div>
      )}

      <div className='jb-card-actions'>
        {job.applyUrl && (
          <a href={job.applyUrl} target='_blank' rel='noopener noreferrer' className='jb-btn jb-btn-apply'>
            <i className='fas fa-paper-plane'></i> {isSpanish ? 'Postularme' : 'Apply'}
          </a>
        )}
      </div>
    </div>
  );
};

export default RelocateJobCardComponent;
