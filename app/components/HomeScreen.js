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
    { card: "var(--violet)",   glow: "rgba(168,85,247,0.15)"  },
    { card: "var(--lavender)", glow: "rgba(129,140,248,0.14)" },
    { card: "var(--success)",  glow: "rgba(134,239,172,0.12)" },
    { card: "var(--rose)",     glow: "rgba(249,168,212,0.13)" },
    { card: "var(--amber)",    glow: "rgba(252,211,77,0.12)"  },
  ];

  return (
    <div className="screen-enter" style={{ width: "100%", maxWidth: 780, paddingTop: "3rem" }}>

      {/* Hero badge */}
      <div style={{ marginBottom: "2.25rem" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(192,132,252,0.08)", border: "1px solid rgba(192,132,252,0.22)",
          borderRadius: 99, padding: "5px 16px", marginBottom: "1rem",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--violet)", boxShadow: "0 0 8px var(--violet)",
            display: "inline-block",
          }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            color: "var(--violet)", letterSpacing: "0.07em", textTransform: "uppercase",
          }}>
            Ready to learn
          </span>
        </div>
        <div className="page-title">Select a Module</div>
        <p className="page-subtitle">Pick a course below, choose a topic, and test your knowledge.</p>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(225px, 1fr))", gap: "1rem" }}>
        {courses.map((course, idx) => {
          const topics = course.topics ?? [];
          const totalQ = topics.reduce((s, t) => s + (t.questions?.length ?? 0), 0);
          const accent = accentColors[idx % accentColors.length];

          return (
            <button key={course.id} className="course-card" onClick={() => onSelectCourse(course)}>
              {/* top-right glow corner */}
              <div style={{
                position: "absolute", top: 0, right: 0, width: 55, height: 55,
                background: `radial-gradient(circle at top right, ${accent.glow}, transparent 70%)`,
                borderRadius: "0 18px 0 0",
              }} />

              {/* bottom colour line */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${accent.card}, transparent)`,
                opacity: 0.4,
              }} />

              <div className="float-anim" style={{ fontSize: "2.1rem", marginBottom: "0.85rem" }}>
                {course.icon}
              </div>

              <div style={{
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400, fontSize: "1.05rem",
                color: "var(--text)", marginBottom: "0.35rem",
                letterSpacing: "-0.01em",
              }}>
                {course.title}
              </div>

              <p style={{
                fontSize: "0.78rem", color: "var(--text-dim)",
                lineHeight: 1.65, marginBottom: "1.1rem",
                fontFamily: "'DM Sans', sans-serif",
              }}>
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