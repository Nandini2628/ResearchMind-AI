import time
import requests


# =========================================
# Semantic Scholar
# =========================================

def search_semantic_scholar(topic, limit=50):

    url = "https://api.semanticscholar.org/graph/v1/paper/search"

    params = {
        "query": topic,
        "limit": min(limit, 100),
        "fields": "title,authors,year,abstract,url"
    }

    try:
        response = requests.get(
            url,
            params=params,
            timeout=30
        )

        print("Semantic Scholar Status:", response.status_code)

        if response.status_code == 200:

            data = response.json()
            papers = []

            for paper in data.get("data", []):

                papers.append({
                    "title": paper.get("title"),
                    "authors": [
                        author.get("name")
                        for author in paper.get("authors", [])
                    ],
                    "year": paper.get("year"),
                    "abstract": paper.get("abstract"),
                    "url": paper.get("url"),
                    "source": "Semantic Scholar"
                })

            return papers

        if response.status_code == 429:
            print("Semantic Scholar rate limit reached.")

        return []

    except requests.exceptions.RequestException as e:

        print("Semantic Scholar error:", e)

        return []


# =========================================
# OpenAlex
# =========================================

def search_openalex(topic, limit=50):

    url = "https://api.openalex.org/works"

    queries = [
        topic,
        "multi agent systems",
        "multi-agent systems",
        "distributed artificial intelligence",
        "multi agent artificial intelligence",
        "agent based artificial intelligence"
    ]

    papers = []
    seen_ids = set()

    try:

        for query in queries:

            if len(papers) >= limit:
                break

            params = {
                "search": query,
                "per-page": min(50, limit),
                "mailto": "researchmindai@gmail.com"
            }

            response = requests.get(
                url,
                params=params,
                timeout=30
            )

            print(
                "OpenAlex query:",
                query,
                "Status:",
                response.status_code
            )

            if response.status_code == 429:

                print("OpenAlex rate limit reached.")
                continue

            if response.status_code != 200:

                print(
                    "OpenAlex error:",
                    response.status_code
                )
                continue

            data = response.json()

            for work in data.get("results", []):

                if len(papers) >= limit:
                    break

                work_id = work.get("id")

                if not work_id:
                    continue

                if work_id in seen_ids:
                    continue

                seen_ids.add(work_id)

                authors = []

                for author in work.get("authorships", []):

                    name = author.get(
                        "author", {}
                    ).get("display_name")

                    if name:
                        authors.append(name)
                # Convert OpenAlex abstract inverted index into normal text
                abstract = None
                inverted_index = work.get("abstract_inverted_index")
                if inverted_index:
                    words = []
                    for word, positions in inverted_index.items():
                        for position in positions:
                            words.append((position, word))
                    words.sort(key=lambda x: x[0])

                    abstract = " ".join(
                        word for _, word in words
                    )
                papers.append({
                    "title": work.get("title"),
                    "authors": authors,
                    "year": work.get("publication_year"),
                    "abstract": abstract,
                    "url": (
                        work.get("doi")
                        or work.get("id")
                    ),
                    "source": "OpenAlex"
                })

                print(
                    "OpenAlex collected:",
                    len(papers)
                )

            # Small delay between API requests
            time.sleep(1)

        return papers[:limit]

    except requests.exceptions.RequestException as e:

        print("OpenAlex error:", e)

        return papers[:limit]


# =========================================
# Crossref
# =========================================

def search_crossref(topic, limit=50):

    url = "https://api.crossref.org/works"

    queries = [
        topic,
        "multi agent artificial intelligence",
        "multi agent systems",
        "multi-agent systems",
        "distributed artificial intelligence",
        "agent based artificial intelligence",
        "AI multi agent"
    ]

    papers = []
    seen_ids = set()

    try:

        for query in queries:

            if len(papers) >= limit:
                break

            params = {
                "query": query,
                "rows": 50,
                "mailto": "researchmindai@gmail.com"
            }

            response = requests.get(
                url,
                params=params,
                timeout=30
            )

            print(
                "Crossref query:",
                query,
                "Status:",
                response.status_code
            )

            if response.status_code == 429:

                print("Crossref rate limit reached.")
                continue

            if response.status_code != 200:

                print(
                    "Crossref error:",
                    response.status_code
                )
                continue

            data = response.json()

            items = (
                data.get("message", {})
                .get("items", [])
            )

            for item in items:

                if len(papers) >= limit:
                    break

                title_list = item.get("title", [])

                if not title_list:
                    continue

                title = title_list[0]

                paper_id = (
                    item.get("DOI")
                    or item.get("URL")
                    or title.lower()
                )

                if paper_id in seen_ids:
                    continue

                seen_ids.add(paper_id)

                authors = []

                for author in item.get("author", []):

                    given = author.get("given", "")
                    family = author.get("family", "")

                    name = (
                        given + " " + family
                    ).strip()

                    if name:
                        authors.append(name)

                year = None

                published = (
                    item.get("published-print")
                    or item.get("published-online")
                    or item.get("issued")
                )

                if published:

                    date_parts = published.get(
                        "date-parts",
                        []
                    )

                    if date_parts and date_parts[0]:

                        year = date_parts[0][0]

                papers.append({
                    "title": title,
                    "authors": authors,
                    "year": year,
                    "abstract": item.get("abstract"),
                    "url": (
                        item.get("URL")
                        or item.get("DOI")
                    ),
                    "source": "Crossref"
                })

                print(
                    "Crossref collected:",
                    len(papers)
                )

            # Small delay
            time.sleep(1)

        return papers[:limit]

    except requests.exceptions.RequestException as e:

        print("Crossref error:", e)

        return papers[:limit]


# =========================================
# Remove Duplicate Papers
# =========================================

def remove_duplicates(papers):

    unique = []
    seen_titles = set()

    for paper in papers:

        title = (
            paper.get("title")
            or ""
        ).strip()

        if not title:
            continue

        normalized_title = (
            title.lower()
            .replace(" ", "")
            .replace("-", "")
            .replace(":", "")
            .replace(".", "")
            .replace(",", "")
        )

        if normalized_title in seen_titles:
            continue

        seen_titles.add(normalized_title)

        unique.append(paper)

    return unique


# =========================================
# Main Search
# =========================================

def search_papers(topic, limit=50):

    print(
        "\nSearching papers for:",
        topic
    )

    all_papers = []

    # -------------------------------------
    # 1. Semantic Scholar
    # -------------------------------------

    semantic_papers = search_semantic_scholar(
        topic,
        limit
    )

    if semantic_papers:

        print(
            "Semantic Scholar papers:",
            len(semantic_papers)
        )

        all_papers.extend(
            semantic_papers
        )

    else:

        print(
            "Semantic Scholar unavailable."
        )


    # -------------------------------------
    # 2. OpenAlex
    # -------------------------------------

    if len(all_papers) < limit:

        print(
            "Trying OpenAlex..."
        )

        remaining = limit - len(all_papers)

        openalex_papers = search_openalex(
            topic,
            remaining
        )

        openalex_papers = openalex_papers or []

        print(
            "OpenAlex papers:",
            len(openalex_papers)
        )

        all_papers.extend(
            openalex_papers
        )


    # -------------------------------------
    # 3. Crossref
    # -------------------------------------

    if len(all_papers) < limit:

        print(
            "Trying Crossref..."
                )

        remaining = limit - len(all_papers)

        crossref_papers = search_crossref(
            topic,
            remaining
        )

        crossref_papers = crossref_papers or []

        print(
            "Crossref papers:",
            len(crossref_papers)
        )

        all_papers.extend(
            crossref_papers
        )


    # -------------------------------------
    # Remove duplicates
    # -------------------------------------

    all_papers = remove_duplicates(
        all_papers
    )


    # -------------------------------------
    # Final papers
    # -------------------------------------

    all_papers = all_papers[:limit]

    print(
        "Total unique papers:",
        len(all_papers)
    )


    if not all_papers:

        return {
            "status": "error",
            "message": "No research papers found"
        }


    return {
        "status": "success",
        "topic": topic,
        "total_papers": len(all_papers),
        "papers": all_papers
    }


# =========================================
# Test
# =========================================

if __name__ == "__main__":

    result = search_papers(
        "multi agent artificial intelligence",
        limit=50
    )

    print("\nRESULT:")
    print(result)