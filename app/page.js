"use client";
import { useState } from "react";
import courses from "./data/questions.json";
import HomeScreen       from "./components/HomeScreen";
import CourseScreen     from "./components/CourseScreen";
import TopicIntroScreen from "./components/TopicIntroScreen";
import QuizScreen       from "./components/QuizScreen";
import ResultScreen     from "./components/ResultScreen";

function getQuizQuestions(topic) {
  return [...topic.questions].sort(() => Math.random() - 0.5).slice(0, 100);
}

export default function Page() {
  const [screen,        setScreen]        = useState("home");
  const [activeCourse,  setActiveCourse]  = useState(null);
  const [activeTopic,   setActiveTopic]   = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers,   setQuizAnswers]   = useState([]);

  function startQuiz() {
    setQuizQuestions(getQuizQuestions(activeTopic));
    setQuizAnswers([]); setScreen("quiz");
  }
  function handleFinish(a) { setQuizAnswers(a); setScreen("result"); }
  function handleRetry()   { setQuizQuestions(getQuizQuestions(activeTopic)); setQuizAnswers([]); setScreen("quiz"); }

  return (
    <div className="app-shell">

      {/* ── Petal blur orbs ── */}
      <div className="petal-orb petal-orb-1" />
      <div className="petal-orb petal-orb-2" />

      {/* ── Navbar ── */}
      <nav style={{
        width: "100%", maxWidth: 780,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.4rem 0 1.1rem",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        zIndex: 10,
      }}>
        {/* Gradient accent line */}
        <div style={{
          position: "absolute", bottom: -1, left: 0,
          width: 120, height: 1,
          background: "linear-gradient(90deg, var(--violet), transparent)",
        }} />

        {/* Logo */}
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontWeight: 400, fontSize: "1.25rem",
          letterSpacing: "-0.01em", color: "var(--text)",
        }}>
          Quiz<span style={{
            color: "var(--violet)",
            textShadow: "0 0 20px rgba(192,132,252,0.5)",
          }}>App</span>
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          {/* Live indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--lavender)",
              boxShadow: "0 0 8px var(--lavender)",
              display: "inline-block",
            }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.65rem", fontWeight: 700,
              color: "var(--lavender)", letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              Live
            </span>
          </div>

          {screen !== "home" && (
            <button
              className="btn-secondary"
              onClick={() => setScreen("home")}
              style={{ fontSize: "0.72rem", padding: "7px 14px" }}
            >
              ⌂ Home
            </button>
          )}
        </div>
      </nav>

      {/* ── Screens ── */}
      {screen === "home"   && (
        <HomeScreen
          courses={courses}
          onSelectCourse={c => { setActiveCourse(c); setScreen("course"); }}
        />
      )}
      {screen === "course" && activeCourse && (
        <CourseScreen
          course={activeCourse}
          onSelectTopic={t => { setActiveTopic(t); setScreen("intro"); }}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "intro"  && activeTopic && activeCourse && (
        <TopicIntroScreen
          topic={activeTopic}
          course={activeCourse}
          onStart={startQuiz}
          onBack={d => setScreen(d)}
        />
      )}
      {screen === "quiz"   && quizQuestions.length > 0 && (
        <QuizScreen questions={quizQuestions} onFinish={handleFinish} />
      )}
      {screen === "result" && (
        <ResultScreen
          questions={quizQuestions}
          answers={quizAnswers}
          topic={activeTopic}
          onRetry={handleRetry}
          onBackToTopics={() => setScreen("course")}
          onHome={() => setScreen("home")}
        />
      )}

      {/* ── Footer ── */}
      <footer style={{
        width: "100%", maxWidth: 780,
        marginTop: "auto", paddingTop: "3rem",
        position: "relative", zIndex: 10,
      }}>
        {/* Violet-to-lavender divider */}
        <div style={{
          height: 1, marginBottom: "1.5rem",
          background: "linear-gradient(90deg, transparent, var(--violet), var(--lavender), transparent)",
          opacity: 0.22,
        }} />

        <div style={{
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", flexWrap: "wrap",
          gap: "1.25rem", paddingBottom: "2rem",
        }}>

          {/* Left — brand + copyright + promo */}
          <div style={{ maxWidth: 290 }}>
            {/* Logo row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.35rem" }}>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400, fontSize: "1rem", color: "var(--text)",
              }}>
                Quiz<span style={{ color: "var(--violet)" }}>App</span>
              </span>
              <span style={{
                fontSize: "0.6rem", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--lavender)",
                background: "rgba(129,140,248,0.08)",
                border: "1px solid rgba(129,140,248,0.22)",
                borderRadius: 99, padding: "2px 9px",
              }}>
                RADET
              </span>
            </div>

            {/* Copyright */}
            <p style={{
              fontSize: "0.72rem", color: "var(--text-dim)",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
              marginBottom: "0.65rem",
            }}>
              © {new Date().getFullYear()} RADET. All rights reserved.
            </p>

            {/* Spoudazo promo */}
            <p style={{
              fontSize: "0.72rem", color: "var(--text-dim)",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
              lineHeight: 1.65,
            }}>
              🎉 Exciting news for students! Join the Spoudazo waitlist and get
              early access + bonus points:{" "}
              <a
                href="https://spoudazo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--violet)", fontWeight: 600,
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(192,132,252,0.35)",
                  paddingBottom: 1,
                  transition: "color 0.2s",
                }}
              >
                Join Now →
              </a>
            </p>
          </div>

          {/* Right — credits */}
          <div style={{ textAlign: "right" }}>
            <div style={{
              fontSize: "0.62rem", color: "var(--text-faint)",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              marginBottom: "0.55rem",
            }}>
              Built by
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.38rem", alignItems: "flex-end" }}>
              {/* Project Manager */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  fontSize: "0.62rem", color: "var(--text-faint)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em",
                }}>
                  Project Manager
                </span>
                <span style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontWeight: 400, fontSize: "0.9rem",
                  color: "var(--violet)",
                  textShadow: "0 0 12px rgba(192,132,252,0.45)",
                }}>
                  ENOCH(VOTA)
                </span>
              </div>

              {/* Developer */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  fontSize: "0.62rem", color: "var(--text-faint)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em",
                }}>
                  Developer
                </span>
                <span style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontWeight: 400, fontSize: "0.9rem",
                  color: "var(--lavender)",
                  textShadow: "0 0 12px rgba(129,140,248,0.45)",
                }}>
                  Tioluwanimi
                </span>
              </div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}