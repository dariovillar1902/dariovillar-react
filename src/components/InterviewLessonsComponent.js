import React from 'react';
import {
  guideSteps,
  patterns,
  mistakes,
  csharpChecklist,
  sayAloud,
  universalEdgeCases,
} from '../data/lessonsLearned';

// Lecciones aprendidas: contenido en español
const InterviewLessonsComponent = () => (
  <div className='iv-ls'>
    <section className='iv-ls-section'>
      <h3 className='iv-ls-heading'>Guía general para resolver ejercicios</h3>
      <div className='iv-ls-steps'>
        {guideSteps.map((step) => (
          <div key={step.title} className='iv-lc-card'>
            <h4 className='iv-lc-title'>{step.title}</h4>
            <p className='iv-ls-text'>{step.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className='iv-ls-section'>
      <h3 className='iv-ls-heading'>Señal del problema → técnica</h3>
      <div className='iv-ls-table-wrap'>
        <table className='iv-ls-table'>
          <thead>
            <tr>
              <th>Si el problema dice...</th>
              <th>Pensá en...</th>
              <th>Ejemplos</th>
            </tr>
          </thead>
          <tbody>
            {patterns.map((p) => (
              <tr key={p.signal}>
                <td>{p.signal}</td>
                <td><strong>{p.technique}</strong></td>
                <td>{p.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className='iv-ls-section'>
      <h3 className='iv-ls-heading'>Errores que cometí y cómo corregirlos</h3>
      <div className='iv-ls-mistakes'>
        {mistakes.map((m) => (
          <div key={m.exercise} className='iv-lc-card'>
            <h4 className='iv-lc-title'>{m.exercise}</h4>
            <p className='iv-ls-text'>
              <span className='iv-ls-tag iv-ls-tag-wrong'>Qué falló</span> {m.wrong}
            </p>
            <p className='iv-ls-text'>
              <span className='iv-ls-tag iv-ls-tag-right'>Cómo hacerlo</span> {m.right}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section className='iv-ls-section iv-ls-columns'>
      <div className='iv-lc-card'>
        <h3 className='iv-ls-heading'>Checklist de C#</h3>
        <ul className='iv-ls-list'>
          {csharpChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className='iv-lc-card'>
        <h3 className='iv-ls-heading'>Qué decir en voz alta</h3>
        <ul className='iv-ls-list'>
          {sayAloud.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className='iv-ls-heading'>Casos borde universales</h3>
        <ul className='iv-ls-list'>
          {universalEdgeCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  </div>
);

export default InterviewLessonsComponent;
