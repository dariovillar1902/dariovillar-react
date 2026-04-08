import React, { useState } from 'react';

const InterviewFlashcardMode = ({ questions, lang, darkMode }) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());

  // Reset position when the filtered question list changes (e.g. category filter toggled)
  React.useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [questions]);

  if (!questions.length) {
    return (
      <div className='iv-empty-state'>
        <i className='fas fa-layer-group'></i>
        <p>{lang === 'es' ? 'Sin preguntas. Seleccioná al menos una categoría.' : 'No questions. Select at least one category.'}</p>
      </div>
    );
  }

  const current = questions[index];

  const handleFlip = () => setFlipped((f) => !f);

  const handlePrev = () => {
    setFlipped(false);
    setIndex((i) => i - 1);
  };

  const handleNext = () => {
    setFlipped(false);
    setIndex((i) => i + 1);
  };

  const handleKnown = () => {
    setKnown((prev) => new Set([...prev, current.id]));
    if (index < questions.length - 1) handleNext();
  };

  const handleLearning = () => {
    setKnown((prev) => {
      const next = new Set(prev);
      next.delete(current.id);
      return next;
    });
    if (index < questions.length - 1) handleNext();
  };

  const isKnown = known.has(current.id);

  return (
    <div className='iv-flashcard-wrap'>
      <div className='iv-flashcard-progress'>
        {index + 1} / {questions.length}
        {known.size > 0 && (
          <span style={{ marginLeft: 12, color: '#34c759' }}>
            {known.size} {lang === 'es' ? 'sabidas' : 'known'}
          </span>
        )}
      </div>

      <div className='iv-flashcard-scene' onClick={handleFlip} role='button' aria-label='Flip card'>
        <div className={`iv-flashcard-inner${flipped ? ' iv-flipped' : ''}`}>
          <div className='iv-flashcard-front'>
            <span className='iv-flashcard-label'>{lang === 'es' ? 'Pregunta' : 'Question'}</span>
            <p className='iv-flashcard-text'>{current.question[lang]}</p>
            <span className='iv-flashcard-hint'>{lang === 'es' ? 'Clic para ver respuesta' : 'Click to reveal answer'}</span>
          </div>
          <div className='iv-flashcard-back'>
            <span className='iv-flashcard-label'>{lang === 'es' ? 'Respuesta' : 'Answer'}</span>
            <p className='iv-flashcard-answer-text'>{current.answer[lang]}</p>
          </div>
        </div>
      </div>

      <div className='iv-flashcard-nav'>
        <button className='iv-nav-btn' onClick={handlePrev} disabled={index === 0}>
          ← {lang === 'es' ? 'Anterior' : 'Prev'}
        </button>
        <div className='iv-flashcard-actions'>
          <button
            className={`iv-btn ${isKnown ? 'iv-btn-known' : ''} ${darkMode ? '' : ''}`}
            onClick={handleKnown}
            title={lang === 'es' ? 'La sé' : 'I know this'}
          >
            ✓ {lang === 'es' ? 'La sé' : 'Known'}
          </button>
          <button
            className={`iv-btn ${!isKnown && flipped ? 'iv-btn-learning' : ''}`}
            onClick={handleLearning}
            title={lang === 'es' ? 'Seguir repasando' : 'Still learning'}
          >
            ✗ {lang === 'es' ? 'Repasar' : 'Learning'}
          </button>
        </div>
        <button className='iv-nav-btn' onClick={handleNext} disabled={index === questions.length - 1}>
          {lang === 'es' ? 'Sig' : 'Next'} →
        </button>
      </div>
    </div>
  );
};

export default InterviewFlashcardMode;
