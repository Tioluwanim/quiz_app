"use client";
import { useState, useEffect } from "react";

const TIMER  = 15;
const LABELS = ["A", "B", "C", "D"];

export default function QuizScreen({ questions, onFinish }) {
  const total = questions.length;

  const [answers,  setAnswers]  = useState(() => Array(total).fill(null));
  const [current,  setCurrent]  = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER);

  const q         = questions[current];
  const answered  = answers[current] !== null;
  const isTimedOut = answers[current] === -1;           // derived — always accurate
  const isWarn    = timeLeft <= 5 && !answered;

  // Reset timer whenever question changes
  useEffect(() => { setTimeLeft(TIMER); }, [current]);

  // Countdown
  useEffect(() => {
    if (answered) return;
    if (timeLeft === 0) {
      setAnswers(p => { const n = [...p]; n[current] = -1; return n; });
      return;
    }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft, answered, current]);

  function handleSelect(i) {
    if (answered) return;
    setAnswers(p => { const n = [...p]; n[current] = i; return n; });
  }

  function optClass(i) {
    if (!answered)              return "opt-btn";
    if (i === q.answer)         return "opt-btn opt-btn-correct";
    if (i === answers[current]) return "opt-btn opt-btn-wrong";
    return "opt-btn opt-btn-reveal";
  }

  function dotClass(i) {
    if (i === current)       return "prog-dot prog-dot-active";
    if (answers[i] === null) return "prog-dot";
    if (answers[i] === -1)   return "prog-dot prog-dot-skipped";
    return answers[i] === questions[i].answer ? "prog-dot prog-dot-correct" : "prog-dot prog-dot-wrong";
  }

  const score    = answers.reduce((s, a, i) => a !== null && a !== -1 && a === questions[i].answer ? s + 1 : s, 0);
  const timerPct = (timeLeft / TIMER) * 100;
  const isCorrect = answered && !isTimedOut && answers[current] === q.answer;

  return (
    <div className="screen-enter" style={{ width: "100%", maxWidth: 780, paddingTop: "2.5rem" }}>

      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.1rem" }}>
        <span className="quiz-counter">
          Q <strong>{current + 1}</strong> / {total}
        </span>
        <span className="score-badge">SCORE <span>{score}</span></span>
      </div>

      {/* Progress dots — clickable to jump to any question */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: "1.25rem" }}>
        {questions.map((_, i) => (
          <button key={i} className={dotClass(i)} onClick={() => setCurrent(i)} title={`Q${i + 1}`} />
        ))}
      </div>

      {/* Timer */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
        <span className={`timer-num${isWarn ? " timer-num-warn" : ""}`}>
          {answered ? "✓" : timeLeft}
        </span>
        <div className="timer-track">
          <div
            className={`timer-fill${isWarn ? " timer-fill-warn" : ""}`}
            style={{ width: answered ? "100%" : `${timerPct}%` }}
          />
        </div>
      </div>

      {/* Question box */}
      <div style={{
        background: "var(--surface2)", border: "1px solid var(--border)",
        borderLeft: "3px solid var(--neon-cyan)",
        borderRadius: 10, padding: "1.25rem 1.4rem", marginBottom: "1.25rem",
      }}>
        <p className="q-text" style={{ margin: 0 }}>{q.question}</p>
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.25rem" }}>
        {q.options.map((opt, i) => (
          <button key={i} className={optClass(i)} onClick={() => handleSelect(i)} disabled={answered}>
            <span className="opt-letter">{LABELS[i]}</span>
            {opt}
          </button>
        ))}
      </div>

      {/* Explanation — shows after answer or time-out */}
      {answered && q.explanation && (
        <div className={`explain-box ${isCorrect ? "explain-correct" : "explain-wrong"}`}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>
            {isCorrect ? "✅" : isTimedOut ? "⏰" : "💡"}
          </span>
          <div>
            <div style={{
              fontFamily: "'Orbitron',sans-serif", fontSize: 11,
              fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              color: isCorrect ? "var(--neon-green)" : "var(--neon-pink)",
              marginBottom: 4,
            }}>
              {isCorrect ? "Correct" : isTimedOut ? "Time's Up" : "Incorrect"}
            </div>
            <p style={{ color: "var(--text-dim)", margin: 0, fontSize: 14, lineHeight: 1.6 }}>
              {q.explanation}
            </p>
          </div>
        </div>
      )}

      {/* Prev / Next navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <button
          className="btn-secondary"
          onClick={() => setCurrent(c => c - 1)}
          disabled={current === 0}
        >
          ← Prev
        </button>

        {current < total - 1 ? (
          <button className="btn-primary" onClick={() => setCurrent(c => c + 1)}>
            Next →
          </button>
        ) : (
          <button className="btn-primary" onClick={() => onFinish(answers)}>
            Finish →
          </button>
        )}
      </div>
    </div>
  );
}