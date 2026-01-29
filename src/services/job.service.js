const API_URL = "https://workifybackend-production.up.railway.app/api";

export async function getJobs() {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) throw new Error("Failed to fetch jobs");
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
