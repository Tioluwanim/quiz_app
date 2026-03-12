export default function HomeScreen({ courses, onSelectCourse }) {
  if (!courses?.length) {
    return (
      <div className="screen-enter" style={{ width: "100%", maxWidth: 780, paddingTop: "3rem" }}>
        <div className="page-title">No courses found</div>
        <p className="page-subtitle">Make sure your questions.json is correctly formatted.</p>
      </div>
    );
  }

  const accentColors = [
    { card: "var(--peach)",   glow: "rgba(255,154,108,0.15)" },
    { card: "var(--teal)",    glow: "rgba(92,232,208,0.12)"  },
    { card: "var(--success)", glow: "rgba(110,219,168,0.12)" },
    { card: "var(--danger)",  glow: "rgba(255,126,179,0.12)" },
    { card: "var(--gold)",    glow: "rgba(255,209,102,0.12)" },
  ];

  return (
    <div className="screen-enter" style={{ width: "100%", maxWidth: 780, paddingTop: "3rem" }}>

      {/* Hero badge */}
      <div style={{ marginBottom: "2.25rem" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,179,138,0.08)", border: "1px solid rgba(255,179,138,0.22)",
          borderRadius: 99, padding: "5px 16px", marginBottom: "1rem",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--peach)", boxShadow: "0 0 7px var(--peach)", display: "inline-block" }} />
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 600, color: "var(--peach)", letterSpacing: "0.07em", textTransform: "uppercase" }}>
            Ready to learn
          </span>
        </div>
        <div className="page-title">Select a Module</div>
        <p className="page-subtitle">Pick a course below, choose a topic, and test your knowledge.</p>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(225px, 1fr))", gap: "1rem" }}>
        {courses.map((course, idx) => {
          const topics  = course.topics ?? [];
          const totalQ  = topics.reduce((s, t) => s + (t.questions?.length ?? 0), 0);
          const accent  = accentColors[idx % accentColors.length];

          return (
            <button key={course.id} className="course-card" onClick={() => onSelectCourse(course)}>
              {/* top-right glow corner */}
              <div style={{
                position: "absolute", top: 0, right: 0, width: 50, height: 50,
                background: `radial-gradient(circle at top right, ${accent.glow}, transparent 70%)`,
                borderRadius: "0 16px 0 0",
              }} />

              {/* bottom color line */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${accent.card}, transparent)`,
                opacity: 0.45,
              }} />

              <div className="float-anim" style={{ fontSize: "2.1rem", marginBottom: "0.85rem" }}>
                {course.icon}
              </div>

              <div style={{
                fontFamily: "'Playfair Display',serif", fontWeight: 700,
                fontSize: "1rem", color: "var(--text)", marginBottom: "0.35rem",
              }}>
                {course.title}
              </div>

              <p style={{ fontSize: "0.78rem", color: "var(--text-dim)", lineHeight: 1.6, marginBottom: "1.1rem" }}>
                {course.description}
              </p>

              <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                <span className="pill">📂 {topics.length} topics</span>
                <span className="pill">✦ {totalQ} questions</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}