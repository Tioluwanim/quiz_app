export default function StartScreen({ categories, onStart }) {
  return (
    <div className="screen-enter" style={{
      width: "100%", maxWidth: 480,
      paddingTop: "3rem", margin: "0 auto",
    }}>
      <div className="intro-card" style={{ textAlign: "center" }}>

        {/* Decorative top glow */}
        <div style={{
          position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)",
          width: 240, height: 100,
          background: "radial-gradient(ellipse, rgba(168,85,247,0.13), transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Heading */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2rem, 6vw, 2.8rem)",
            fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.1,
            marginBottom: "0.6rem",
            background: "linear-gradient(135deg, var(--violet-light) 0%, var(--violet) 45%, var(--lavender) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Quiz<span style={{ fontStyle: "italic" }}>App</span>
          </div>
          <p style={{
            color: "var(--text-dim)", fontSize: "0.88rem",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 400, lineHeight: 1.65,
          }}>
            Pick a category and test your knowledge
          </p>
        </div>

        {/* Category buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className="topic-row"
              onClick={() => onStart(cat)}
              style={{ justifyContent: "space-between" }}
            >
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, fontSize: "0.9rem", color: "var(--text)",
              }}>
                {cat}
              </span>
              <span style={{ color: "var(--violet)", fontSize: "0.85rem", opacity: 0.7 }}>→</span>
            </button>
          ))}

          {/* All categories */}
          <button
            className="topic-row"
            onClick={() => onStart(null)}
            style={{
              justifyContent: "space-between",
              borderStyle: "dashed",
              borderColor: "rgba(192,132,252,0.22)",
            }}
          >
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, fontSize: "0.9rem", color: "var(--text-dim)",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span>🎲</span> All Categories
            </span>
            <span style={{ color: "var(--lavender)", fontSize: "0.85rem", opacity: 0.7 }}>→</span>
          </button>
        </div>

        {/* Footer note */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%",
            background: "var(--lavender)", opacity: 0.5,
            display: "inline-block",
          }} />
          <span style={{
            fontSize: "0.72rem", color: "var(--text-faint)",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
            letterSpacing: "0.04em",
          }}>
            15 seconds per question
          </span>
          <span style={{
            width: 5, height: 5, borderRadius: "50%",
            background: "var(--lavender)", opacity: 0.5,
            display: "inline-block",
          }} />
        </div>

      </div>
    </div>
  );
}