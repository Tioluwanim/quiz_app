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

      <div style={{
        fontFamily: "'Orbitron',sans-serif", fontSize: "0.65rem",
        color: "var(--text-dim)", letterSpacing: "0.12em",
        textTransform: "uppercase", marginBottom: "1rem",
      }}>
        — Select Topic —
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
                  fontFamily: "'Orbitron',sans-serif", fontWeight: 600,
                  fontSize: "0.82rem", color: "#fff",
                  marginBottom: "0.4rem", letterSpacing: "0.03em",
                  textTransform: "uppercase",
                }}>
                  {String(idx + 1).padStart(2, "0")}. {topic.title}
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                  <span className={DIFF_CLASS[diffKey] ?? DIFF_CLASS.beginner}>{topic.difficulty ?? "Beginner"}</span>
                  <span className="pill">⚡ {quizCount} questions</span>
                  <span className="pill">⏱ ~{mins} min</span>
                </div>
              </div>
              <span style={{ color: "var(--neon-cyan)", fontSize: "1.1rem", opacity: 0.6 }}>›</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}