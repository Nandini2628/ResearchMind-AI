import { useState } from "react";
import "./App.css";
import Research from "./pages/Research";
import Papers from "./pages/Papers";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const menuItems = [
    "Dashboard",
    "Research",
    "Papers",
    "Research Gap",
    "Evidence",
    "Contradictions",
    "Novelty",
    "Reports",
    "Peer Review",
  ];

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo">R</div>

          <div>
            <h2>ResearchMind</h2>
            <span>AI Research Assistant</span>
          </div>
        </div>

        <div className="menu-title">MAIN MENU</div>

        <nav className="navigation">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`menu-item ${
                activePage === item ? "active" : ""
              }`}
              onClick={() => setActivePage(item)}
            >
              <span className="menu-icon">◇</span>
              <span>{item}</span>
            </button>
          ))}
        </nav>

      </aside>

      {/* Main Content */}
      <main className="main-content">

        <header className="topbar">
          <div>
            <p className="page-label">AI RESEARCH PLATFORM</p>
            <h1>{activePage}</h1>
          </div>

          <div className="profile">
            <div className="avatar">N</div>

            <div className="profile-info">
              <strong>Researcher</strong>
              <span>Student Account</span>
            </div>
          </div>
        </header>

        {/* Research Page */}
        {activePage === "Research" && <Research />}
        {activePage === "Papers" && <Papers />}

        {/* Dashboard */}
        {activePage === "Dashboard" && (
          <div className="dashboard">

            <section className="welcome-card">

              <div className="welcome-text">
                <p className="small-label">WELCOME BACK 👋</p>

                <h2>
                  Build better research
                  <br />
                  with <span>AI.</span>
                </h2>

                <p className="welcome-description">
                  Search papers, discover research gaps, analyze evidence,
                  detect contradictions and generate research reports
                  with intelligent AI agents.
                </p>

                <button
                  className="primary-button"
                  onClick={() => setActivePage("Research")}
                >
                  + Start New Research
                </button>
              </div>

              <div className="ai-visual">
                <div className="ai-core">
                  <span>✦</span>
                </div>
              </div>

            </section>

            <section className="stats-grid">

              <div className="stat-card">
                <div className="stat-icon">⌘</div>
                <div>
                  <p>Research Projects</p>
                  <h3>12</h3>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">▤</div>
                <div>
                  <p>Papers Analyzed</p>
                  <h3>156</h3>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">◇</div>
                <div>
                  <p>Research Gaps</p>
                  <h3>34</h3>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">▧</div>
                <div>
                  <p>Reports Generated</p>
                  <h3>09</h3>
                </div>
              </div>

            </section>

          </div>
        )}

        {/* Other Pages */}
        {activePage !== "Dashboard" &&
          activePage !== "Research" && (
            <div className="coming-page">

              <div className="coming-icon">✦</div>

              <p className="small-label">
                RESEARCHMIND AI
              </p>

              <h2>{activePage}</h2>

              <p>
                This module will be connected to the AI backend
                in the next development step.
              </p>

              <button
                className="primary-button"
                onClick={() => setActivePage("Dashboard")}
              >
                ← Back to Dashboard
              </button>

            </div>
          )}

      </main>

    </div>
  );
}

export default App;