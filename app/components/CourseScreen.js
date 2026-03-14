const DIFF_CLASS = {
  beginner:     "diff diff-beginner",
  intermediate: "diff diff-intermediate",
  advanced:     "diff diff-advanced",
};

export default function CourseScreen({ course, onSelectTopic, onBack }) {
  return (
    <div className="screen-enter" style={{ width: "100%", maxWidth: 780, paddingTop: "2.5rem" }}>

      <div className="breadcrumb">
        <button onClick={onBack}>Home</button>
        <span className="sep">›</span>
        <span style={{ color: "var(--text-dim)" }}>{course.title}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "2.5rem" }}>{course.icon}</span>
        <div className="page-title" style={{ margin: 0 }}>{course.title}</div>
      </div>
      <p className="page-subtitle">{course.description}</p>

      <div className="neon-divider" />

      {/* Section label */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700,
        color: "var(--text-faint)", letterSpacing: "0.14em",
        textTransform: "uppercase", marginBottom: "1rem",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{
          display: "inline-block", width: 24, height: 1,
          background: "linear-gradient(90deg, var(--violet), transparent)",
        }} />
        Select Topic
        <span style={{
          display: "inline-block", width: 24, height: 1,
          background: "linear-gradient(90deg, transparent, var(--lavender))",
        }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        {course.topics.map((topic, idx) => {
          const quizCount = Math.min(topic.questions.length, 100);
          const mins      = Math.ceil((quizCount * 15) / 60);
          const diffKey   = (topic.difficulty ?? "Beginner").toLowerCase();

          return (
            <button
              key={topic.id}
              className="topic-row"
              onClick={() => onSelectTopic(topic)}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontWeight: 400, fontSize: "0.95rem",
                  color: "var(--text)", marginBottom: "0.4rem",
                  letterSpacing: "-0.01em",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.62rem", fontWeight: 700,
                    color: "var(--violet)", opacity: 0.7,
                    letterSpacing: "0.06em",
                    minWidth: "1.6rem",
                  }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {topic.title}
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                  <span className={DIFF_CLASS[diffKey] ?? DIFF_CLASS.beginner}>{topic.difficulty ?? "Beginner"}</span>
                  <span className="pill">⚡ {quizCount} questions</span>
                  <span className="pill">⏱ ~{mins} min</span>
                </div>
              </div>
              <span style={{ color: "var(--violet)", fontSize: "1.1rem", opacity: 0.55 }}>›</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}