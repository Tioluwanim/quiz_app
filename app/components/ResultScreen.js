export default function ResultScreen({ questions, answers, topic, onRetry, onBackToTopics, onHome }) {
  const total   = questions.length;
  const score   = answers.reduce((s, a, i) => a !== null && a !== -1 && a === questions[i].answer ? s + 1 : s, 0);
  const wrong   = answers.filter((a, i) => a !== null && a !== -1 && a !== questions[i].answer).length;
  const skipped = answers.filter(a => a === null || a === -1).length;
  const pct     = Math.round((score / total) * 100);

  function grade() {
    if (pct === 100) return { label: "Flawless!",      emoji: "🏆", color: "var(--amber)",   glow: "rgba(252,211,77,0.25)"   };
    if (pct >= 80)   return { label: "Excellent work", emoji: "🌸", color: "var(--violet)",  glow: "rgba(192,132,252,0.25)"  };
    if (pct >= 50)   return { label: "Good effort",    emoji: "✦",  color: "var(--lavender)", glow: "rgba(129,140,248,0.22)" };
    return               { label: "Keep going",      emoji: "💪", color: "var(--danger)",  glow: "rgba(251,113,133,0.22)"  };
  }

  const { label, emoji, color, glow } = grade();

  return (
    <div className="screen-enter" style={{ width: "100%", maxWidth: 780, paddingTop: "2.5rem" }}>
      <div className="intro-card">

        {/* Radial glow behind circle */}
        <div style={{
          position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
          width: 300, height: 130,
          background: `radial-gradient(ellipse, ${glow}, transparent 70%)`,
          pointerEvents: "none",
        }} />

        {/* Label + topic */}
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.65rem", fontWeight: 700,
          color: "var(--text-faint)", letterSpacing: "0.15em",
          textTransform: "uppercase", marginBottom: "0.3rem",
        }}>
          Quiz Complete
        </div>
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontWeight: 400, fontSize: "clamp(1rem, 3vw, 1.5rem)",
          color: "var(--text)", marginBottom: "0.15rem",
          letterSpacing: "-0.01em",
        }}>
          {topic.title}
        </div>

        {/* Score circle */}
        <div className="result-circle float-anim" style={{
          borderColor: color,
          boxShadow: `0 0 32px ${glow}, 0 0 64px ${glow}, inset 0 0 32px ${glow}`,
        }}>
          <span style={{ fontSize: 22, marginBottom: 3 }}>{emoji}</span>
          <span className="result-score-num" style={{
            textShadow: `0 0 22px ${color}`,
            fontSize: "1.65rem",
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
          }}>
            {score}/{total}
          </span>
          <span className="result-pct" style={{ color }}>{pct}%</span>
        </div>

        {/* Grade label */}
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "1.2rem", fontWeight: 400,
          color, marginBottom: "2rem",
          textShadow: `0 0 16px ${glow}`,
          letterSpacing: "-0.01em",
        }}>
          {label}
        </div>

        {/* Breakdown stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {[
            { value: score,   label: "Correct", color: "var(--success)"  },
            { value: wrong,   label: "Wrong",   color: "var(--danger)"   },
            { value: skipped, label: "Skipped", color: "var(--text-dim)" },
          ].map(({ value, label: lbl, color: c }) => (
            <div key={lbl} className="stat-box">
              <div className="stat-value" style={{ color: c, textShadow: `0 0 10px ${c}` }}>{value}</div>
              <div className="stat-label">{lbl}</div>
            </div>
          ))}
        </div>

        <div className="neon-divider" />

        {/* Actions */}
        <div style={{
          display: "flex", gap: "0.75rem",
          justifyContent: "center", flexWrap: "wrap",
          paddingTop: "0.75rem",
        }}>
          <button className="btn-primary"   onClick={onRetry}>↺ Retry</button>
          <button className="btn-secondary" onClick={onBackToTopics}>← Topics</button>
          <button className="btn-secondary" onClick={onHome}>⌂ Home</button>
        </div>

      </div>
    </div>
  );
}