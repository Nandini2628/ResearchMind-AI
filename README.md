# ResearchMind-AI

## AI-Powered Multi-Agent Research Assistant

ResearchMind-AI is an AI-powered research assistant designed to help students and researchers search, collect, and analyze research papers efficiently.

The system uses a Python backend and local AI model integration through Ollama to analyze research papers and generate structured research insights.

## Features

* 🔎 Search research papers
* 📚 Collect research paper information
* 🤖 AI-powered paper analysis
* 🧠 Research focus identification
* 🎯 Research problem identification
* ⚙️ Methodology analysis
* 📊 Key findings extraction
* ⚠️ Limitations identification
* 🔍 Research gap identification
* 💡 Novelty analysis
* 🚀 Future scope generation
* 📄 Structured paper analysis

## AI Model

**Llama 3.2 via Ollama**

The project uses the locally running Llama 3.2 model through the Ollama API for research paper analysis.

> The Llama 3.2 model itself is not stored inside this GitHub repository. It runs locally through Ollama.

## System Architecture

```text
User
  ↓
Frontend
  ↓
Python Backend
  ↓
Research Paper Search
  ↓
Paper Data
  ↓
Paper Analysis Agent
  ↓
Ollama API
  ↓
Llama 3.2
  ↓
Structured AI Analysis
  ↓
User
```

## Paper Analysis Output

For each research paper, the system generates:

```text
Research Focus
Research Problem
Methodology
Key Findings
Limitations
Research Gap
Novelty
Future Scope
```

The analysis is generated using the title and abstract of the research paper.

The system is instructed not to invent information and to mention when information is not clearly available in the abstract.

## Technologies Used

* Python
* Ollama
* Llama 3.2
* Requests
* Research Paper APIs
* HTML / CSS / JavaScript frontend
* Git
* GitHub

## Project Structure

```text
ResearchMind-AI/
│
├── backend/
│   ├── agents/
│   │   └── paper_analysis_agent.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│
├── .gitignore
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Nandini2628/ResearchMind-AI.git
```

### 2. Open the project

```bash
cd ResearchMind-AI
```

### 3. Install Python dependencies

```bash
pip install -r backend/requirements.txt
```

### 4. Install Ollama

Install Ollama on your computer and make sure it is running.

### 5. Download the AI model

```bash
ollama pull llama3.2
```

### 6. Start the backend

Run the backend according to the project's backend entry point.

## Environment Variables

API keys and other secrets should be stored locally in a `.env` file.

Example:

```text
OPENAI_API_KEY=your_api_key_here
```

**Do not upload `.env` files or API keys to GitHub.**

## Purpose

ResearchMind-AI aims to reduce the time required to understand research papers by providing structured AI-assisted analysis.

It can help students and researchers quickly understand:

* What the paper is about
* What problem it addresses
* Which methodology is used
* What findings are reported
* What limitations exist
* What research gaps remain
* What future research can be explored

## Future Scope

* Multi-agent research workflow
* Automatic paper summarization
* Citation analysis
* Research trend detection
* Similar paper recommendation
* Research topic recommendation
* Knowledge graph generation
* Improved multi-paper comparison
* Advanced research gap detection

## Author

**Nandini**

## Repository

[ResearchMind-AI on GitHub](https://github.com/Nandini2628/ResearchMind-AI)
