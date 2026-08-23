import { useEffect, useState } from "react";

function Papers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const topic = "multi agent artificial intelligence";

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/research", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: topic,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Papers:", data);
        setPapers(data.papers || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="papers-page">

      <div className="research-header">
        <div>
          <p className="small-label">RESEARCH PAPERS</p>
          <h2>Research Papers</h2>
          <p>
            Papers collected for your research topic.
          </p>
        </div>
      </div>

      {loading && (
        <div className="research-card">
          <h3>Searching papers...</h3>
          <p>Please wait while ResearchMind AI collects papers.</p>
        </div>
      )}

      {!loading && papers.length === 0 && (
        <div className="research-card">
          <h3>No papers found</h3>
          <p>Try searching another research topic.</p>
        </div>
      )}

      {!loading && papers.length > 0 && (
        <>
          <div className="papers-count">
            <strong>{papers.length}</strong> papers found
          </div>

          <div className="papers-list">

            {papers.map((paper, index) => (
              <div className="paper-card" key={index}>

                <div className="paper-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="paper-content">

                  <h3>{paper.title}</h3>

                  <p className="paper-authors">
                    <strong>Authors:</strong>{" "}
                    {paper.authors?.length
                      ? paper.authors.join(", ")
                      : "Not available"}
                  </p>

                  <div className="paper-meta">
                    <span>
                      Year: {paper.year || "N/A"}
                    </span>

                    <span>
                      Source: {paper.source || "Unknown"}
                    </span>
                  </div>

                  {paper.abstract && (
                    <p className="paper-abstract">
                      {paper.abstract}
                    </p>
                  )}

                  {paper.url && (
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noreferrer"
                      className="paper-link"
                    >
                      View Paper →
                    </a>
                  )}

                </div>

              </div>
            ))}

          </div>
        </>
      )}

    </div>
  );
}

export default Papers;