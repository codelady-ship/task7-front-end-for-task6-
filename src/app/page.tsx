import { sampleProgrammers, type Programmer } from "./sample-programmers";

// Full URL of the task6 backend list endpoint, e.g. https://my-api.example.com/programmers
// Without it (or when the API is down) the page shows built-in sample data.
const API_URL = process.env.PROGRAMMERS_API_URL;

async function getProgrammers(): Promise<{ programmers: Programmer[]; live: boolean }> {
  if (!API_URL) return { programmers: sampleProgrammers, live: false };
  try {
    const res = await fetch(API_URL, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const data: unknown = await res.json();
    if (!Array.isArray(data)) throw new Error("API did not return a list");
    return { programmers: data as Programmer[], live: true };
  } catch (error) {
    console.error("Programmers API unreachable, using sample data:", error);
    return { programmers: sampleProgrammers, live: false };
  }
}

const Home = async () => {
  const { programmers, live } = await getProgrammers();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-2 text-3xl font-bold">Programmers</h1>
      {!live && (
        <p className="mb-6 text-sm text-gray-500">
          Demo data: the backend (task6) is not connected, so sample programmers are shown.
        </p>
      )}
      <ul className="grid gap-4 sm:grid-cols-2">
        {programmers.map((p, i) => (
          <li key={p._id ?? i} className="rounded-lg border border-gray-300 p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p>Age: {p.age}</p>
            <p>Stack: {p.stack?.name ?? "-"}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
