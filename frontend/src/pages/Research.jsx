import { useState } from "react";
import { startResearch, analyzeResearch } from "../services/api";

function Research() {
  const [topic, setTopic] = useState("");
  const [started, setStarted] = useState(false);

  const [analysis, setAnalysis] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);

  // -----------------------------------------
  // Start Research
  // -----------------------------------------

  const handleStartResearch = async () => {
    if (!topic.trim()) {
      alert("Please enter a research topic.");
      return;
    }

    try {
      const result = await startResearch(topic);

      console.log("Research Result:", result);

      if (result.status === "success") {
        setStarted(true);
      } else {
        alert(result.message || "Research failed.");
      }
    } catch (error) {
      console.error("Research Error:", error);

      alert(
        "Backend connection failed. Please check FastAPI."
      );
    }
  };

  // -----------------------------------------
  // Analyze Papers
  // -----------------------------------------

  const handleAnalyze = async () => {
    if (!topic.trim()) {
      alert("Please enter a research topic.");
      return;
    }

    console.log("Analyze clicked:", topic);

    try {
      setAnalyzing(true);

      const result = await analyzeResearch(topic);

      console.log("Analyze Response:", result);

      if (result.status === "success") {
        setAnalysis(result.analysis || []);

        alert(
          `Analysis completed for ${
            result.analysis?.length || 0
          } papers.`
        );
      } else {
        alert(
          result.message || "Paper analysis failed."
        );
      }
    } catch (error) {
      console.error("Analyze Error:", error);

      alert(
        "Paper analysis failed. Please check backend."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="research-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="research-header">

        <div>

          <p className="small-label">
            NEW RESEARCH
          </p>

          <h2>
            Start Your Research
          </h2>

          <p>
            Enter your research topic and let
            ResearchMind AI analyze papers,
            evidence, gaps and research
            opportunities.
          </p>

        </div>

      </div>


      {/* =========================================
          RESEARCH INPUT
      ========================================= */}

      <div className="research-card">

        <div className="research-card-title">

          <div className="research-card-icon">
            ⌕
          </div>

          <div>

            <h3>
              Research Topic
            </h3>

            <p>
              Enter the topic you want to investigate.
            </p>

          </div>

        </div>


        <label>
          Research Topic
        </label>


        <textarea
          value={topic}
          onChange={(e) =>
            setTopic(e.target.value)
          }
          placeholder="Example: AI in Healthcare, Multi-Agent AI, Climate Change Prediction..."
          rows="5"
        />


        {/* Example Topics */}

        <div className="example-topics">

          <span>
            Try an example:
          </span>


          <button
            onClick={() =>
              setTopic("AI in Healthcare")
            }
          >
            AI in Healthcare
          </button>


          <button
            onClick={() =>
              setTopic("Multi-Agent AI")
            }
          >
            Multi-Agent AI
          </button>


          <button
            onClick={() =>
              setTopic(
                "Climate Change Prediction"
              )
            }
          >
            Climate Change Prediction
          </button>

        </div>


        {/* Start Research */}

        <button
          className="research-start-button"
          onClick={handleStartResearch}
        >
          ✦ Start AI Research
        </button>


        {/* Analyze Papers */}

        <button
          className="research-start-button"
          onClick={handleAnalyze}
          disabled={analyzing}
          style={{
            marginLeft: "12px",
            opacity: analyzing ? 0.7 : 1,
            cursor: analyzing
              ? "not-allowed"
              : "pointer"
          }}
        >

          {analyzing
            ? "⏳ Analyzing Papers..."
            : "✦ Analyze Papers"}

        </button>

      </div>


      {/* =========================================
          AI PIPELINE
      ========================================= */}

      <div className="research-card">

        <div className="research-card-title">

          <div className="research-card-icon">
            ✦
          </div>

          <div>

            <h3>
              AI Research Pipeline
            </h3>

            <p>
              Multiple AI agents will work
              together on your research.
            </p>

          </div>

        </div>


        <div className="research-pipeline">


          {/* 01 */}

          <div
            className={`pipeline-step ${
              started ? "running" : ""
            }`}
          >

            <div className="pipeline-number">
              01
            </div>

            <div>

              <strong>
                Paper Search Agent
              </strong>

              <p>
                Find relevant research papers
              </p>

            </div>

          </div>


          <div className="pipeline-arrow">
            ↓
          </div>


          {/* 02 */}

          <div
            className={`pipeline-step ${
              started ? "running" : ""
            }`}
          >

            <div className="pipeline-number">
              02
            </div>

            <div>

              <strong>
                Paper Analysis Agent
              </strong>

              <p>
                Analyze papers and extract information
              </p>

            </div>

          </div>


          <div className="pipeline-arrow">
            ↓
          </div>


          {/* 03 */}

          <div
            className={`pipeline-step ${
              started ? "running" : ""
            }`}
          >

            <div className="pipeline-number">
              03
            </div>

            <div>

              <strong>
                Research Gap Agent
              </strong>

              <p>
                Identify missing research areas
              </p>

            </div>

          </div>


          <div className="pipeline-arrow">
            ↓
          </div>


          {/* 04 */}

          <div
            className={`pipeline-step ${
              started ? "running" : ""
            }`}
          >

            <div className="pipeline-number">
              04
            </div>

            <div>

              <strong>
                Evidence & Contradiction Agent
              </strong>

              <p>
                Compare evidence and detect contradictions
              </p>

            </div>

          </div>


          <div className="pipeline-arrow">
            ↓
          </div>


          {/* 05 */}

          <div
            className={`pipeline-step ${
              started ? "running" : ""
            }`}
          >

            <div className="pipeline-number">
              05
            </div>

            <div>

              <strong>
                Novelty Agent
              </strong>

              <p>
                Evaluate potential research novelty
              </p>

            </div>

          </div>


          <div className="pipeline-arrow">
            ↓
          </div>


          {/* 06 */}

          <div
            className={`pipeline-step ${
              started ? "running" : ""
            }`}
          >

            <div className="pipeline-number">
              06
            </div>

            <div>

              <strong>
                AI Peer Review Agent
              </strong>

              <p>
                Review the generated research report
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          RESEARCH STATUS
      ========================================= */}

      {started && (

        <div className="research-status">

          <div className="status-icon">
            ✓
          </div>

          <div>

            <strong>
              Research started successfully!
            </strong>

            <p>
              Topic: <b>{topic}</b>
            </p>

            <span>
              Papers have been collected
              successfully.
            </span>

          </div>

        </div>

      )}


      {/* =========================================
          PAPER ANALYSIS RESULTS
      ========================================= */}

      {analysis.length > 0 && (

        <div className="research-card">

          <div className="research-card-title">

            <div className="research-card-icon">
              ✦
            </div>

            <div>

              <h3>
                Paper Analysis Results
              </h3>

              <p>
                Analysis of {analysis.length} research
                papers
              </p>

            </div>

          </div>


          {/* Analysis Cards */}

          {analysis.map((paper, index) => (

            <div
              className="paper-card"
              key={index}
              style={{
                marginTop: "20px",
                padding: "20px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                background: "#ffffff"
              }}
            >

              <h3>
                {index + 1}.{" "}
                {paper.title ||
                  "Untitled Paper"}
              </h3>


              <p>

                <strong>
                  Authors:
                </strong>{" "}

                {paper.authors &&
                paper.authors.length > 0
                  ? paper.authors.join(", ")
                  : "Not available"}

              </p>


              <p>

                <strong>
                  Year:
                </strong>{" "}

                {paper.year ||
                  "Not available"}

              </p>


              <p>

                <strong>
                  Source:
                </strong>{" "}

                {paper.source ||
                  "Not available"}

              </p>


              <p>

                <strong>
                  Research Focus:
                </strong>{" "}

                {paper.research_focus ||
                  "Not available"}

              </p>


              <p>

                <strong>
                  Key Findings:
                </strong>{" "}

                {paper.key_findings ||
                  "Not available"}

              </p>


              <p>

                <strong>
                  Limitations:
                </strong>{" "}

                {paper.limitations ||
                  "Not available"}

              </p>


              {paper.abstract && (

                <p>

                  <strong>
                    Abstract:
                  </strong>{" "}

                  {paper.abstract}

                </p>

              )}


              {paper.url && (

                <a
                  href={paper.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Paper →
                </a>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Research;