export default function ResultScreen({ questions, answers, topic, onRetry, onBackToTopics, onHome }) {
  const total   = questions.length;
  const score   = answers.reduce((s, a, i) => a !== null && a !== -1 && a === questions[i].answer ? s + 1 : s, 0);
  const wrong   = answers.filter((a, i) => a !== null && a !== -1 && a !== questions[i].answer).length;
  const skipped = answers.filter(a => a === null || a === -1).length;
  const pct     = Math.round((score / total) * 100);

  function grade() {
    if (pct === 100) return { label: "Flawless!",      emoji: "🏆", color: "var(--gold)",    glow: "rgba(255,209,102,0.25)"  };
    if (pct >= 80)   return { label: "Excellent work", emoji: "🌸", color: "var(--peach)",   glow: "rgba(255,154,108,0.22)"  };
    if (pct >= 50)   return { label: "Good effort",    emoji: "✦",  color: "var(--teal)",    glow: "rgba(92,232,208,0.2)"    };
    return               { label: "Keep going",      emoji: "💪", color: "var(--danger)",  glow: "rgba(255,126,179,0.22)"  };
  }

  const { label, emoji, color, glow } = grade();

  return (
    <div className="screen-enter" style={{ width: "100%", maxWidth: 780, paddingTop: "2.5rem" }}>
      <div className="intro-card">

        {/* radial glow behind circle */}
        <div style={{
          position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
          width: 280, height: 120,
          background: `radial-gradient(ellipse, ${glow}, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.65rem", fontWeight: 700, color: "var(--text-dim)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
          Quiz Complete
        </div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: "clamp(1rem,3vw,1.5rem)", color: "var(--text)", marginBottom: "0.15rem" }}>
          {topic.title}
        </div>

        {/* Score circle */}
        <div className="result-circle" style={{
          borderColor: color,
          boxShadow: `0 0 28px ${glow}, 0 0 60px ${glow}, inset 0 0 30px ${glow}`,
        }}>
          <span style={{ fontSize: 24, marginBottom: 2 }}>{emoji}</span>
          <span className="result-score-num" style={{ textShadow: `0 0 20px ${color}`, fontSize: "1.6rem" }}>{score}/{total}</span>
          <span className="result-pct" style={{ color }}>{pct}%</span>
        </div>

        {/* Grade label */}
        <div style={{
          fontFamily: "'Playfair Display',serif", fontSize: "1.15rem",
          fontWeight: 800, color, marginBottom: "2rem",
          textShadow: `0 0 14px ${glow}`,
        }}>
          {label}
        </div>

        {/* Breakdown stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {[
            { value: score,   label: "Correct", color: "var(--success)" },
            { value: wrong,   label: "Wrong",   color: "var(--danger)"  },
            { value: skipped, label: "Skipped", color: "var(--text-dim)"},
          ].map(({ value, label: lbl, color: c }) => (
            <div key={lbl} className="stat-box">
              <div className="stat-value" style={{ color: c, textShadow: `0 0 8px ${c}` }}>{value}</div>
              <div className="stat-label">{lbl}</div>
            </div>
          ))}
        </div>

        <div className="neon-divider" />

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", paddingTop: "0.75rem" }}>
          <button className="btn-primary"   onClick={onRetry}>↺ Retry</button>
          <button className="btn-secondary" onClick={onBackToTopics}>← Topics</button>
          <button className="btn-secondary" onClick={onHome}>⌂ Home</button>
        </div>
      </div>
    </div>
  );
}