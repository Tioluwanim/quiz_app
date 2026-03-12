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

      {/* ── Navbar ── */}
      <nav style={{
        width: "100%", maxWidth: 780,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.4rem 0 1.1rem",
        borderBottom: "1px solid rgba(255,179,138,0.1)",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", bottom: -1, left: 0, width: 110, height: 1,
          background: "linear-gradient(90deg, var(--peach), transparent)",
        }} />

        <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.01em", color: "var(--text)" }}>
          Quiz<span style={{ color: "var(--peach)", textShadow: "0 0 16px rgba(255,154,108,0.45)" }}>App</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", boxShadow: "0 0 7px var(--teal)", display: "inline-block" }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.65rem", fontWeight: 600, color: "var(--teal)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Live
            </span>
          </div>
          {screen !== "home" && (
            <button className="btn-secondary" onClick={() => setScreen("home")} style={{ fontSize: "0.72rem", padding: "7px 14px" }}>
              ⌂ Home
            </button>
          )}
        </div>
      </nav>

      {/* ── Screens ── */}
      {screen === "home"   && <HomeScreen courses={courses} onSelectCourse={c => { setActiveCourse(c); setScreen("course"); }} />}
      {screen === "course" && activeCourse && <CourseScreen course={activeCourse} onSelectTopic={t => { setActiveTopic(t); setScreen("intro"); }} onBack={() => setScreen("home")} />}
      {screen === "intro"  && activeTopic && activeCourse && <TopicIntroScreen topic={activeTopic} course={activeCourse} onStart={startQuiz} onBack={d => setScreen(d)} />}
      {screen === "quiz"   && quizQuestions.length > 0 && <QuizScreen questions={quizQuestions} onFinish={handleFinish} />}
      {screen === "result" && <ResultScreen questions={quizQuestions} answers={quizAnswers} topic={activeTopic} onRetry={handleRetry} onBackToTopics={() => setScreen("course")} onHome={() => setScreen("home")} />}

      {/* ── Footer ── */}
      <footer style={{
        width: "100%", maxWidth: 780,
        marginTop: "auto", paddingTop: "3rem",
      }}>
        {/* Peach-to-teal gradient divider */}
        <div style={{
          height: 1, marginBottom: "1.5rem",
          background: "linear-gradient(90deg, transparent, var(--peach), var(--teal), transparent)",
          opacity: 0.2,
        }} />

        <div style={{
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", flexWrap: "wrap",
          gap: "1.25rem", paddingBottom: "2rem",
        }}>

          {/* Left — brand + copyright + promo */}
          <div style={{ maxWidth: 280 }}>
            {/* Logo row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.35rem" }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: "1rem", color: "var(--text)" }}>
                Quiz<span style={{ color: "var(--peach)" }}>App</span>
              </span>
              <span style={{
                fontSize: "0.6rem", fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--teal)",
                background: "rgba(92,232,208,0.08)", border: "1px solid rgba(92,232,208,0.22)",
                borderRadius: 99, padding: "2px 9px",
              }}>
                RADET
              </span>
            </div>

            {/* Copyright */}
            <p style={{
              fontSize: "0.72rem", color: "var(--text-dim)",
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 400,
              marginBottom: "0.65rem",
            }}>
              © {new Date().getFullYear()} RADET. All rights reserved.
            </p>

            {/* Spoudazo promo */}
            <p style={{
              fontSize: "0.72rem", color: "var(--text-dim)",
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 400,
              lineHeight: 1.65,
            }}>
              🎉 Exciting news for students! Join the Spoudazo waitlist and get early access + bonus points:{" "}
              <a
                href="https://spoudazo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--peach)", fontWeight: 600,
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,154,108,0.35)",
                  paddingBottom: 1,
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
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              marginBottom: "0.55rem",
            }}>
              Built by
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", alignItems: "flex-end" }}>
              {/* PM */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  fontSize: "0.62rem", color: "var(--text-faint)",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em",
                }}>
                  Project Manager
                </span>
                <span style={{
                  fontFamily: "'Playfair Display',serif", fontWeight: 700,
                  fontSize: "0.88rem", color: "var(--peach)",
                  textShadow: "0 0 10px rgba(255,154,108,0.4)",
                }}>
                  Enoch
                </span>
              </div>

              {/* Dev */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  fontSize: "0.62rem", color: "var(--text-faint)",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em",
                }}>
                  Developer
                </span>
                <span style={{
                  fontFamily: "'Playfair Display',serif", fontWeight: 700,
                  fontSize: "0.88rem", color: "var(--teal)",
                  textShadow: "0 0 10px rgba(92,232,208,0.4)",
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