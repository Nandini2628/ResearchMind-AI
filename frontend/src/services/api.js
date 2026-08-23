const API_URL = "http://127.0.0.1:8000";


// =========================================
// Start Research
// =========================================

export async function startResearch(topic) {
  const response = await fetch(
    `${API_URL}/api/research`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        topic: topic,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Research request failed: ${response.status}`
    );
  }

  return await response.json();
}


// =========================================
// Analyze Papers
// =========================================

export async function analyzeResearch(topic) {
  const response = await fetch(
    `${API_URL}/api/analyze`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        topic: topic,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Analysis request failed: ${response.status}`
    );
  }

  return await response.json();
}


// =========================================
// Health Check
// =========================================

export async function checkBackend() {
  const response = await fetch(
    `${API_URL}/`
  );

  if (!response.ok) {
    throw new Error(
      "Backend is not responding"
    );
  }

  return await response.json();
}