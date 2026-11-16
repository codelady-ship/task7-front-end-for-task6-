import { sampleProgrammers, type Programmer } from "./sample-programmers";

// Full URL of the task6 backend list endpoint, e.g. https://task6-programmers-api.onrender.com/programmers
// Without it (or when the API is down) the page shows built-in sample data.
export const API_URL = process.env.PROGRAMMERS_API_URL;

export async function getProgrammers(): Promise<{ programmers: Programmer[]; live: boolean }> {
  if (!API_URL) return { programmers: sampleProgrammers, live: false };
  try {
    // A free Render service can take ~30 s to wake up, so allow some time.
    const res = await fetch(API_URL, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const data: unknown = await res.json();
    if (!Array.isArray(data)) throw new Error("API did not return a list");
    return { programmers: data as Programmer[], live: true };
  } catch (error) {
    console.error("Programmers API unreachable, using sample data:", error instanceof Error ? error.message : error);
    return { programmers: sampleProgrammers, live: false };
  }
}
