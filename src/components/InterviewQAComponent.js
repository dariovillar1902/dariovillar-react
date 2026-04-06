import React, { useState } from 'react';
import { qaQuestions, quizQuestions } from '../data/interviewData';
import InterviewFlashcardMode from './InterviewFlashcardMode';
import InterviewListMode from './InterviewListMode';
import InterviewQuizMode from './InterviewQuizMode';

const CATEGORIES = ['react', 'typescript', 'angular', 'dotnet'];
const CATEGORY_LABELS = {
  react: 'React',
  typescript: 'TypeScript',
  angular: 'Angular',
  dotnet: '.NET',
};
const MODES = ['flashcard', 'list', 'quiz'];
const MODE_LABELS = {
  en: { flashcard: 'Flashcard', list: 'List', quiz: 'Quiz' },
  es: { flashcard: 'Tarjetas', list: 'Lista', quiz: 'Quiz' },
};

const InterviewQAComponent = ({ darkMode }) => {
  const [mode, setMode] = useState('flashcard');
  const [lang, setLang] = useState('en');
  const [activeCategories, setActiveCategories] = useState(new Set(CATEGORIES));

  const toggleCategory = (cat) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const filteredQA = qaQuestions.filter((q) => activeCategories.has(q.category));
  const filteredQuiz = quizQuestions.filter((q) => activeCategories.has(q.category));

  const modeLabels = MODE_LABELS[lang];

  return (
    <div>
      {/* Toolbar */}
      <div className='iv-toolbar'>
        {/* Mode selector */}
        <div className='iv-toolbar-group'>
          <span className='iv-toolbar-label'>{lang === 'es' ? 'Modo' : 'Mode'}</span>
          {MODES.map((m) => (
            <button
              key={m}
              className={`iv-btn${mode === m ? ' iv-btn-active' : ''}`}
              onClick={() => setMode(m)}
            >
              {modeLabels[m]}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className='iv-toolbar-group'>
          <span className='iv-toolbar-label'>{lang === 'es' ? 'Stack' : 'Stack'}</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`iv-btn${activeCategories.has(cat) ? ' iv-btn-active' : ''}`}
              onClick={() => toggleCategory(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Language toggle */}
        <div className='iv-toolbar-group' style={{ marginLeft: 'auto' }}>
          <span className='iv-toolbar-label'>Lang</span>
          {['en', 'es'].map((l) => (
            <button
              key={l}
              className={`iv-btn${lang === l ? ' iv-btn-active' : ''}`}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Active mode */}
      {mode === 'flashcard' && (
        <InterviewFlashcardMode questions={filteredQA} lang={lang} darkMode={darkMode} />
      )}
      {mode === 'list' && (
        <InterviewListMode questions={filteredQA} lang={lang} darkMode={darkMode} />
      )}
      {mode === 'quiz' && (
        <InterviewQuizMode questions={filteredQuiz} lang={lang} darkMode={darkMode} />
      )}
    </div>
  );
};

export default InterviewQAComponent;
