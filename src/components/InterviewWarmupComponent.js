import React, { useState } from 'react';
import { codingExercises } from '../data/codingExercises';

// Warm-up content is always in English (matches the interview language)
const STORAGE_KEY = 'iv-warmup-solved';

const STEPS = [
  'Restate the problem and ask clarifying questions',
  'Walk through an example by hand',
  'List edge cases before coding',
  'Code the simple version, then say what you would use in production',
  'Test with your examples and state the complexity',
];

const loadSolved = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveSolved = (ids) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (e) {
    // storage unavailable: progress simply won't persist
  }
};

const InterviewWarmupComponent = () => {
  const [solved, setSolved] = useState(loadSolved);
  const [open, setOpen] = useState({});

  const toggleSolved = (id) => {
    const next = solved.includes(id) ? solved.filter((x) => x !== id) : [...solved, id];
    setSolved(next);
    saveSolved(next);
  };

  const toggle = (id, section) => {
    const key = `${id}-${section}`;
    setOpen({ ...open, [key]: !open[key] });
  };

  return (
    <div>
      <div className='iv-ex-intro'>
        <p className='iv-ex-progress'>
          <i className='fas fa-check-circle' /> {solved.length} / {codingExercises.length} solved
        </p>
        <p className='iv-ex-lead'>
          Typical live-coding warm-ups. Write the solution in a plain editor first, without built-ins,
          then open the hints and the reference solution.
        </p>
        <ol className='iv-ex-steps'>
          {STEPS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>

      <div className='iv-ex-list'>
        {codingExercises.map((ex) => {
          const isSolved = solved.includes(ex.id);
          return (
            <div key={ex.id} className={`iv-lc-card iv-ex-card${isSolved ? ' iv-ex-solved' : ''}`}>
              <div className='iv-lc-card-header'>
                <h4 className='iv-lc-title'>{ex.title}</h4>
                <span className={`iv-badge iv-badge-${ex.difficulty}`}>{ex.difficulty}</span>
              </div>

              <p className='iv-ex-prompt'>{ex.prompt}</p>

              <div className='iv-ex-examples'>
                {ex.examples.map((e) => (
                  <div key={e.input} className='iv-ex-example'>
                    <code>{e.input}</code> <span>→</span> <code>{e.output}</code>
                  </div>
                ))}
              </div>

              <div className='iv-lc-tags'>
                {ex.tags.map((tag) => (
                  <span key={tag} className='iv-lc-tag'>{tag}</span>
                ))}
              </div>

              <div className='iv-ex-actions'>
                <button className='iv-btn' onClick={() => toggle(ex.id, 'hints')}>
                  {open[`${ex.id}-hints`] ? 'Hide hints' : 'Hints & edge cases'}
                </button>
                <button className='iv-btn' onClick={() => toggle(ex.id, 'solution')}>
                  {open[`${ex.id}-solution`] ? 'Hide solution' : 'Show solution'}
                </button>
                <button
                  className={`iv-btn iv-ex-check${isSolved ? ' iv-btn-active' : ''}`}
                  onClick={() => toggleSolved(ex.id)}
                  aria-pressed={isSolved}
                >
                  <i className={`fas ${isSolved ? 'fa-check-circle' : 'fa-circle'}`} /> {isSolved ? 'Solved' : 'Mark solved'}
                </button>
              </div>

              {open[`${ex.id}-hints`] && (
                <div className='iv-ex-panel'>
                  <strong>Hints</strong>
                  <ul>
                    {ex.hints.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <strong>Edge cases</strong>
                  <ul>
                    {ex.edgeCases.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {open[`${ex.id}-solution`] && (
                <div className='iv-ex-panel'>
                  <pre className='iv-ex-code'><code>{ex.solution}</code></pre>
                  <p className='iv-ex-complexity'>
                    <strong>Complexity:</strong> {ex.complexity}
                  </p>
                </div>
              )}

              {ex.related.length > 0 && (
                <div className='iv-ex-related'>
                  <span>Related on LeetCode:</span>
                  {ex.related.map((r) => (
                    <a key={r.url} href={r.url} target='_blank' rel='noopener noreferrer'>
                      {r.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewWarmupComponent;
