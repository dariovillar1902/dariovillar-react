import React, { useContext, useState } from 'react';
import { LanguageContext } from './languageContext';
import { DarkModeContext } from './darkModeContext';

export const JobCardComponent = ({ job, defaultExpanded = false }) => {
  const { isSpanish } = useContext(LanguageContext);
  const { darkMode } = useContext(DarkModeContext);
  const [expanded, setExpanded] = useState(defaultExpanded);

  const scoreClass =
    job.matchScore >= 70 ? 'jb-score-high' :
    job.matchScore >= 40 ? 'jb-score-mid' :
    'jb-score-low';

  const employmentLabel = {
    FULLTIME: isSpanish ? 'Full-time' : 'Full-time',
    PARTTIME: isSpanish ? 'Part-time' : 'Part-time',
    CONTRACTOR: isSpanish ? 'Contratista' : 'Contractor',
    INTERN: isSpanish ? 'Pasantía' : 'Internship',
  };

  const formatSalary = () => {
    if (!job.salaryMin && !job.salaryMax) return null;
    const curr = job.salaryCurrency || 'USD';
    const period = job.salaryPeriod === 'YEAR'
      ? (isSpanish ? '/año' : '/yr')
      : job.salaryPeriod === 'MONTH'
        ? (isSpanish ? '/mes' : '/mo')
        : '';

    if (job.salaryMin && job.salaryMax) {
      return `${curr} ${job.salaryMin.toLocaleString()}–${job.salaryMax.toLocaleString()}${period}`;
    }
    if (job.salaryMin) return `${curr} ${job.salaryMin.toLocaleString()}+${period}`;
    return `${isSpanish ? 'Hasta' : 'Up to'} ${curr} ${job.salaryMax.toLocaleString()}${period}`;
  };

  const salary = formatSalary();

  // Truncate description for preview
  const maxPreviewLen = 300;
  const descriptionPreview = job.description
    ? job.description.slice(0, maxPreviewLen) + (job.description.length > maxPreviewLen ? '...' : '')
    : null;

  return (
    <div className={`jb-card ${darkMode ? 'jb-card-dark' : 'jb-card-light'}`}>
      {/* Header Row */}
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
        <div className={`jb-score-badge ${scoreClass}`}>
          <span className='jb-score-number'>{job.matchScore}</span>
          <span className='jb-score-label'>match</span>
        </div>
      </div>

      {/* Meta Row */}
      <div className='jb-card-meta'>
        <span className='jb-meta-item'>
          <i className='fas fa-map-marker-alt'></i>
          {job.city}{job.isRemote && ` · ${isSpanish ? 'Remoto' : 'Remote'}`}
        </span>
        {job.employmentType && (
          <span className='jb-meta-item'>
            <i className='fas fa-briefcase'></i>
            {employmentLabel[job.employmentType] || job.employmentType}
          </span>
        )}
        {job.postedAt && (
          <span className='jb-meta-item'>
            <i className='fas fa-clock'></i>
            {isSpanish ? job.postedAt.esp : job.postedAt.eng}
          </span>
        )}
        {salary && (
          <span className='jb-meta-item jb-meta-salary'>
            <i className='fas fa-dollar-sign'></i>
            {salary}
          </span>
        )}
        {job.publisher && (
          <span className='jb-meta-item'>
            <i className='fas fa-globe'></i>
            {job.publisher}
          </span>
        )}
      </div>

      {/* Tech Tags */}
      {job.techTags && job.techTags.length > 0 && (
        <div className='jb-tech-tags'>
          {job.techTags.map((tag, i) => (
            <span key={i} className='jb-tech-tag'>{tag}</span>
          ))}
        </div>
      )}

      {/* Description Preview */}
      {descriptionPreview && (
        <div className='jb-description-area'>
          <p className='jb-description-text'>
            {expanded ? job.description : descriptionPreview}
          </p>
          {job.description && job.description.length > maxPreviewLen && (
            <button
              className='jb-expand-btn'
              onClick={() => setExpanded(!expanded)}
            >
              {expanded
                ? (isSpanish ? 'Ver menos ▲' : 'Show less ▲')
                : (isSpanish ? 'Ver más ▼' : 'Show more ▼')
              }
            </button>
          )}
        </div>
      )}

      {/* Actions */}
      <div className='jb-card-actions'>
        {job.applyUrl && (
          <a href={job.applyUrl} target='_blank' rel='noopener noreferrer' className='jb-btn jb-btn-apply'>
            <i className='fas fa-paper-plane'></i>
            {isSpanish ? 'Postularme' : 'Apply'}
          </a>
        )}
        <a href={job.glassdoorUrl} target='_blank' rel='noopener noreferrer' className='jb-btn jb-btn-glassdoor'>
          <i className='fas fa-star'></i> Glassdoor
        </a>
        <a href={job.openqubeUrl} target='_blank' rel='noopener noreferrer' className='jb-btn jb-btn-openqube'>
          <i className='fas fa-chart-bar'></i> Openqube
        </a>
      </div>
    </div>
  );
};

export default JobCardComponent;
