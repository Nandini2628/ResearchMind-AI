from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agents.paper_analysis_agent import analyze_papers
from agents.paper_search_agent import search_papers


app = FastAPI(
    title="ResearchMind AI",
    description="AI-powered Multi-Agent Research Assistant",
    version="1.0.0"
)


# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================
# Request Model
# =========================================

class ResearchRequest(BaseModel):
    topic: str


# =========================================
# Root
# =========================================

@app.get("/")
def root():

    return {
        "message": "ResearchMind AI Backend is running",
        "status": "success"
    }


# =========================================
# Health
# =========================================

@app.get("/api/health")
def health_check():

    return {
        "status": "healthy",
        "service": "ResearchMind AI Backend"
    }


# =========================================
# Search Papers
# =========================================

@app.post("/api/research")
def start_research(request: ResearchRequest):

    print(
        "\n=============================="
    )

    print(
        "SEARCH REQUEST:",
        request.topic
    )

    print(
        "=============================="
    )

    result = search_papers(
        request.topic,
        limit=100
    )

    print(
        "SEARCH RESULT STATUS:",
        result.get("status")
    )

    print(
        "PAPERS FOUND:",
        len(result.get("papers", []))
    )

    return result


# =========================================
# Analyze Papers
# =========================================

@app.post("/api/analyze")
def analyze_research(request: ResearchRequest):

    print(
        "\n=============================="
    )

    print(
        "ANALYZE REQUEST:",
        request.topic
    )

    print(
        "=============================="
    )

    # -------------------------------------
    # Search papers first
    # -------------------------------------

    search_result = search_papers(
        request.topic,
        limit=100
    )

    if search_result.get("status") != "success":

        print(
            "SEARCH FAILED:",
            search_result
        )

        return search_result


    papers = search_result.get(
        "papers",
        []
    )


    print(
        "PAPERS RECEIVED FOR ANALYSIS:",
        len(papers)
    )


    # -------------------------------------
    # No papers found
    # -------------------------------------

    if not papers:

        return {
            "status": "error",
            "topic": request.topic,
            "total_papers": 0,
            "total_analyzed": 0,
            "papers": [],
            "analysis": [],
            "message": "No research papers found."
        }


    # -------------------------------------
    # AI Analysis
    # -------------------------------------

    print(
        "\nStarting AI analysis..."
    )

    analysis = analyze_papers(
        papers
    )


    print(
        "\nAI ANALYSIS COMPLETED:"
    )

    print(
        "Analyzed papers:",
        len(analysis)
    )


    # -------------------------------------
    # Final response
    # -------------------------------------

    return {
        "status": "success",
        "topic": request.topic,

        "total_papers": len(papers),

        "total_analyzed": len(analysis),

        "papers": papers,

        "analysis": analysis
    }