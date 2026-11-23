import React, { useState } from 'react';
import { codingExercises } from '../data/codingExercises';

// Contenido del calentamiento en español
const STORAGE_KEY = 'iv-warmup-solved';
const LIVE_SOURCE = 'Entrevista Fleetworthy';

const DIFFICULTY_LABEL = { easy: 'fácil', medium: 'media', hard: 'difícil' };

const STEPS = [
  'Repetí el problema y hacé preguntas aclaratorias',
  'Resolvé un ejemplo a mano',
  'Listá los casos borde antes de codear',
  'Codeá la versión simple y decí qué usarías en producción',
  'Probá con tus ejemplos y decí la complejidad',
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
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div className='iv-ex-intro'>
        <p className='iv-ex-progress'>
          <i className='fas fa-check-circle' /> {solved.length} / {codingExercises.length} resueltos
        </p>
        <p className='iv-ex-lead'>
          Ejercicios típicos de código en vivo. Escribí primero la solución en un editor simple, sin
          usar métodos built-in, y después abrí las pistas y la solución de referencia.
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
                <span className={`iv-badge iv-badge-${ex.difficulty}`}>
                  {DIFFICULTY_LABEL[ex.difficulty] || ex.difficulty}
                </span>
              </div>
              {ex.source && (
                <span className={`iv-ex-source${ex.source === LIVE_SOURCE ? ' iv-ex-source-live' : ''}`}>
                  <i className={`fas ${ex.source === LIVE_SOURCE ? 'fa-star' : 'fa-code'}`} /> {ex.source}
                </span>
              )}

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
                  {open[`${ex.id}-hints`] ? 'Ocultar pistas' : 'Pistas y casos borde'}
                </button>
                <button className='iv-btn' onClick={() => toggle(ex.id, 'solution')}>
                  {open[`${ex.id}-solution`] ? 'Ocultar solución' : 'Ver solución'}
                </button>
                <button
                  className={`iv-btn iv-ex-check${isSolved ? ' iv-btn-active' : ''}`}
                  onClick={() => toggleSolved(ex.id)}
                  aria-pressed={isSolved}
                >
                  <i className={`fas ${isSolved ? 'fa-check-circle' : 'fa-circle'}`} /> {isSolved ? 'Resuelto' : 'Marcar resuelto'}
                </button>
              </div>

              {open[`${ex.id}-hints`] && (
                <div className='iv-ex-panel'>
                  <strong>Pistas</strong>
                  <ul>
                    {ex.hints.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <strong>Casos borde</strong>
                  <ul>
                    {ex.edgeCases.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  {ex.lesson && (
                    <>
                      <strong>Lección de mi intento</strong>
                      <p className='iv-ex-lesson'>{ex.lesson}</p>
                    </>
                  )}
                </div>
              )}

              {open[`${ex.id}-solution`] && (
                <div className='iv-ex-panel'>
                  <pre className='iv-ex-code'><code>{ex.solution}</code></pre>
                  <p className='iv-ex-complexity'>
                    <strong>Complejidad:</strong> {ex.complexity}
                  </p>
                </div>
              )}

              {ex.related.length > 0 && (
                <div className='iv-ex-related'>
                  <span>Relacionados en LeetCode:</span>
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
