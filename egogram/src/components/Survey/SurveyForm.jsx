import { useState } from 'react';
import questions from '../../data/questions.json';
import { calculateScores } from '../../lib/scoreEngine';

const ANSWERS_PER_PAGE = 5;
const TOTAL_PAGES = Math.ceil(questions.length / ANSWERS_PER_PAGE);
const ANSWER_CHOICES = [
  { value: 2, label: '그렇다' },
  { value: 1, label: '어느 쪽도 아니다' },
  { value: 0, label: '그렇지 않다' },
];

function StepDots({ currentPage, totalPages, completedPages }) {
  return (
    <div className="step-dots">
      {Array.from({ length: totalPages }, (_, i) => {
        const isCompleted = i < completedPages;
        const isCurrent = i === currentPage;
        let cls = 'step-dot';
        if (isCompleted && !isCurrent) cls += ' completed';
        if (isCurrent) cls += ' current';
        return (
          <span key={i}>
            {i > 0 && <span className={`step-connector${i <= completedPages ? ' completed' : ''}`} />}
            <span className={cls}>{i + 1}</span>
          </span>
        );
      })}
    </div>
  );
}

export default function SurveyForm({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [page, setPage] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const startIdx = page * ANSWERS_PER_PAGE;
  const pageQuestions = questions.slice(startIdx, startIdx + ANSWERS_PER_PAGE);

  function pageIsComplete(p) {
    const start = p * ANSWERS_PER_PAGE;
    const qs = questions.slice(start, start + ANSWERS_PER_PAGE);
    return qs.every(q => answers[q.id] !== undefined);
  }

  let completedPages = 0;
  for (let i = 0; i < TOTAL_PAGES; i++) {
    if (pageIsComplete(i)) completedPages = i + 1;
    else break;
  }

  function handleAnswer(qId, value) {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  }

  function handleNext() {
    if (page < TOTAL_PAGES - 1) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handlePrev() {
    if (page > 0) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async function handleSubmit() {
    if (Object.keys(answers).length < 50 || submitting) return;
    setSubmitting(true);
    await onComplete(calculateScores(answers));
  }

  const isLastPage = page === TOTAL_PAGES - 1;
  const canAdvance = pageQuestions.every(q => answers[q.id] !== undefined);

  return (
    <section>
      <StepDots currentPage={page} totalPages={TOTAL_PAGES} completedPages={completedPages} />

      {pageQuestions.map((q, i) => (
        <div key={q.id} className="question-card">
          <div className="question-number">Q{startIdx + i + 1}</div>
          <div className="question-text">{q.text}</div>
          <div className="answer-options">
            {ANSWER_CHOICES.map(c => (
              <button
                key={c.value}
                type="button"
                className={`answer-option ${answers[q.id] === c.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(q.id, c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="survey-nav">
        <button type="button" className="btn btn-secondary" onClick={handlePrev} disabled={page === 0}>
          이전
        </button>
        {isLastPage ? (
          <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={!canAdvance || submitting}>
            {submitting ? '저장 중...' : '결과 보기'}
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={handleNext} disabled={!canAdvance}>
            다음
          </button>
        )}
      </div>
    </section>
  );
}
