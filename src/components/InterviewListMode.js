import React from 'react';
import { Accordion } from 'react-bootstrap';

const CATEGORY_LABELS = {
  react: 'React',
  typescript: 'TypeScript',
  angular: 'Angular',
  dotnet: '.NET / C#',
};

const InterviewListMode = ({ questions, lang }) => {
  if (!questions.length) {
    return (
      <div className='iv-empty-state'>
        <i className='fas fa-list'></i>
        <p>{lang === 'es' ? 'Sin preguntas. Seleccioná al menos una categoría.' : 'No questions. Select at least one category.'}</p>
      </div>
    );
  }

  const grouped = questions.reduce((acc, q) => {
    const key = q.category;
    return { ...acc, [key]: [...(acc[key] || []), q] };
  }, {});

  return (
    <div>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <div className='iv-list-group-header'>{CATEGORY_LABELS[category] || category}</div>
          <Accordion>
            {items.map((q) => (
              <Accordion.Item eventKey={String(q.id)} key={q.id}>
                <Accordion.Header>
                  <div className='iv-accordion-header'>
                    <span className='iv-accordion-question'>{q.question[lang]}</span>
                    <span className={`iv-badge iv-badge-${q.difficulty}`}>{q.difficulty}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <p className='iv-accordion-answer'>{q.answer[lang]}</p>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default InterviewListMode;
