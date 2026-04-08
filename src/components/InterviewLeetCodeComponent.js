import React, { useState } from 'react';
import { leetcodeProblems } from '../data/interviewData';

// LeetCode content is always in English (matches leetcode.com)
const DIFFICULTIES = ['all', 'easy', 'medium', 'hard'];

const InterviewLeetCodeComponent = ({ darkMode }) => {
  const [diffFilter, setDiffFilter] = useState('all');

  const filtered = leetcodeProblems.filter(
    (p) => diffFilter === 'all' || p.difficulty === diffFilter
  );

  return (
    <div>
      <div className='iv-lc-filters'>
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            className={`iv-btn${diffFilter === d ? ' iv-btn-active' : ''}`}
            onClick={() => setDiffFilter(d)}
          >
            {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      <div className='iv-lc-grid'>
        {filtered.map((p) => (
          <div key={p.id} className='iv-lc-card'>
            <div className='iv-lc-card-header'>
              <h4 className='iv-lc-title'>{p.title}</h4>
              <span className={`iv-badge iv-badge-${p.difficulty}`}>{p.difficulty}</span>
            </div>
            <div className='iv-lc-meta'>
              <i className='fas fa-tag'></i>
              <span>Category: {p.category}</span>
            </div>
            <div className='iv-lc-tags'>
              {p.tags.map((tag) => (
                <span key={tag} className='iv-lc-tag'>{tag}</span>
              ))}
            </div>
            <a
              href={p.url}
              target='_blank'
              rel='noopener noreferrer'
              className='iv-lc-link'
            >
              <i className='fas fa-external-link-alt' /> Solve on LeetCode
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewLeetCodeComponent;
