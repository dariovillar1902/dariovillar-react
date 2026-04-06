import React, { useState } from 'react';

const InterviewQuizMode = ({ questions, lang }) => {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Reset quiz when the filtered question list changes (e.g. category filter toggled)
  React.useEffect(() => {
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }, [questions]);

  const handleRestart = () => {
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (!questions.length) {
    return (
      <div className='iv-empty-state'>
        <i className='fas fa-question-circle'></i>
        <p>{lang === 'es' ? 'Sin preguntas. Seleccioná al menos una categoría.' : 'No questions available. Please select at least one category.'}</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className='iv-score-screen'>
        <div className='iv-score-number'>{score}/{questions.length}</div>
        <p className='iv-score-label'>
          {lang === 'es' ? `¡Completado! Respondiste ${score} de ${questions.length} correctamente.` : `Done! You got ${score} out of ${questions.length} correct.`}
        </p>
        <button className='iv-quiz-next-btn' onClick={handleRestart}>
          {lang === 'es' ? 'Reintentar' : 'Try Again'}
        </button>
      </div>
    );
  }

  const current = questions[qIndex];
  const options = current.options[lang];
  const answered = selected !== null;

  const handleSelect = (optIndex) => {
    if (answered) return;
    setSelected(optIndex);
    if (optIndex === current.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    if (qIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setQIndex((i) => i + 1);
    }
  };

  const getOptionClass = (optIndex) => {
    if (!answered) return 'iv-quiz-option';
    if (optIndex === current.correctIndex) return 'iv-quiz-option iv-quiz-option-correct';
    if (optIndex === selected) return 'iv-quiz-option iv-quiz-option-wrong';
    return 'iv-quiz-option';
  };

  return (
    <div className='iv-quiz-wrap'>
      <div className='iv-quiz-progress'>
        {lang === 'es' ? `Pregunta ${qIndex + 1} de ${questions.length}` : `Question ${qIndex + 1} of ${questions.length}`}
      </div>
      <p className='iv-quiz-question'>{current.question[lang]}</p>
      <div className='iv-quiz-options'>
        {options.map((opt, i) => (
          <button
            key={i}
            className={getOptionClass(i)}
            onClick={() => handleSelect(i)}
            disabled={answered}
          >
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <button className='iv-quiz-next-btn' onClick={handleNext}>
          {qIndex + 1 >= questions.length
            ? (lang === 'es' ? 'Ver resultado' : 'See Result')
            : (lang === 'es' ? 'Siguiente →' : 'Next →')}
        </button>
      )}
    </div>
  );
};

export default InterviewQuizMode;
