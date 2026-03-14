const DIFF_CLASS = {
  beginner:     "diff diff-beginner",
  intermediate: "diff diff-intermediate",
  advanced:     "diff diff-advanced",
};

export default function TopicIntroScreen({ topic, course, onStart, onBack }) {
  const quizCount = Math.min(topic.questions.length, 100);
  const mins      = Math.ceil((quizCount * 15) / 60);
  const diffKey   = (topic.difficulty ?? "Beginner").toLowerCase();

  return (
    <div className="screen-enter" style={{ width: "100%", maxWidth: 780, paddingTop: "2.5rem" }}>

      <div className="breadcrumb">
        <button onClick={() => onBack("home")}>Home</button>
        <span className="sep">›</span>
        <button onClick={() => onBack("course")}>{course.title}</button>
        <span className="sep">›</span>
        <span style={{ color: "var(--text-dim)" }}>{topic.title}</span>
      </div>

      <div className="intro-card">
        {/* Top glow */}
        <div style={{
          position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)",
          width: 220, height: 90,
          background: "radial-gradient(ellipse, rgba(168,85,247,0.14), transparent 70%)",
          pointerEvents: "none",
        }} />

        <span
          className={DIFF_CLASS[diffKey] ?? DIFF_CLASS.beginner}
          style={{ display: "inline-block", marginBottom: "1.25rem" }}
        >
          {topic.difficulty ?? "Beginner"}
        </span>

        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(1.4rem, 3.5vw, 1.9rem)",
          fontWeight: 400,
          color: "var(--text)",
          marginBottom: "0.75rem",
          textShadow: "0 0 24px rgba(192,132,252,0.2)",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
        }}>
          {topic.title}
        </div>

        <p style={{
          color: "var(--text-dim)", fontSize: "0.9rem",
          lineHeight: 1.7, maxWidth: "40ch",
          margin: "0 auto 2.25rem",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {topic.description}
        </p>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.25rem" }}>
          {[
            { value: quizCount,              label: "Questions" },
            { value: `~${mins}`,             label: "Minutes"   },
            { value: "15s",                  label: "Per Q"     },
            { value: topic.questions.length, label: "In Bank"   },
          ].map(({ value, label }) => (
            <div key={label} className="stat-box">
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>

        {topic.questions.length > 100 && (
          <p style={{
            fontSize: "0.75rem", color: "var(--text-dim)",
            marginBottom: "1.5rem", letterSpacing: "0.03em",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            ⚡ {quizCount} questions randomly selected from {topic.questions.length}-question bank each attempt
          </p>
        )}

        <button className="btn-primary" onClick={onStart} style={{ minWidth: 180 }}>
          Begin Quiz →
        </button>
      </div>
    </div>
  );
}