import requests


# =========================================
# Ollama Configuration
# =========================================

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.2"


# =========================================
# Analyze One Paper
# =========================================

def analyze_paper(paper):

    title = paper.get("title", "")
    abstract = paper.get("abstract")

    if not abstract:
        abstract = "Abstract not available."

    prompt = f"""
You are an expert research assistant.

Analyze this research paper using ONLY the title and abstract.

Paper Title:
{title}

Abstract:
{abstract}

Give the analysis in simple and clear English.

Return exactly these sections:

Research Focus:
Research Problem:
Methodology:
Key Findings:
Limitations:
Research Gap:
Novelty:
Future Scope:

Important rules:
- Do not invent facts.
- Use only information supported by the title and abstract.
- If information is not available, write:
    "Not clearly mentioned in the abstract."
- Keep each section concise and useful for a student researcher.
"""

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False
            },
            timeout=180
        )

        print("Ollama Status:", response.status_code)

        if response.status_code != 200:
            print("Ollama Error:", response.text)
            ai_analysis = "AI analysis could not be generated."

        else:
            data = response.json()

            ai_analysis = data.get(
                "response",
                "AI analysis could not be generated."
           )

    except requests.exceptions.RequestException as e:

        print("Ollama connection error:", e)

        ai_analysis = (
            "Could not connect to Ollama. "
            "Make sure Ollama is running."
        )

    except Exception as e:

        print("Analysis error:", e)

        ai_analysis = "AI analysis could not be generated."

    return {
        "title": title,
        "authors": paper.get("authors", []),
        "year": paper.get("year"),
        "source": paper.get("source"),
        "url": paper.get("url"),
        "abstract": abstract,
        "ai_analysis": ai_analysis
    }


# =========================================
# Analyze Multiple Papers
# =========================================

def analyze_papers(papers):

    results = []

    print(
        "\nTotal papers received for analysis:",
        len(papers)
    )

    for index, paper in enumerate(papers):

        try:

            print(
                f"Analyzing paper {index + 1}/{len(papers)}..."
            )

            result = analyze_paper(paper)

            results.append(result)

            print(
                f"Paper {index + 1} analysis completed."
            )

        except Exception as e:

            print(
                f"Analysis error for paper {index + 1}:",
                e
            )

            # Continue with next paper
            continue

    # IMPORTANT:
    # Return results AFTER ALL papers are analyzed
    print(
        "\nTotal papers analyzed:",
        len(results)
    )

    return results


# =========================================
# Test
# =========================================

if __name__ == "__main__":

    test_paper = {
        "title": "Multi-Agent Systems",
        "authors": ["Test Author"],
        "year": 2024,
        "abstract": (
            "This paper discusses multi-agent systems "
            "and how multiple intelligent agents can "
            "cooperate to solve complex problems."
        ),
        "url": "https://example.com",
        "source": "OpenAlex"
    }

    result = analyze_paper(test_paper)

    print(
        "\n=============================="
    )

    print(
        "AI PAPER ANALYSIS"
    )

    print(
        "==============================\n"
    )

    print(
        result["ai_analysis"]
    )

                                                                