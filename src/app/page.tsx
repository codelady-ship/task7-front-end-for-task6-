import { getProgrammers } from "./api";
import ProgrammersBoard from "@/components/ProgrammersBoard";

// Read the API on every request so new programmers show up straight away.
export const dynamic = "force-dynamic";

const Home = async () => {
  const { programmers, live } = await getProgrammers();

  return (
    <>
      <section className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-teal-700">Full-stack practice project</p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Programmers directory</h1>
        <p className="max-w-2xl text-slate-600">
          A Next.js frontend for my Express + MongoDB API. Search the list, filter by stack and add new programmers.
        </p>
        <p
          className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
            live ? "bg-teal-50 text-teal-800" : "bg-amber-50 text-amber-800"
          }`}
        >
          <span aria-hidden className={`h-2 w-2 rounded-full ${live ? "bg-teal-500" : "bg-amber-500"}`} />
          {live ? "Live data from the task6 API" : "Demo data: the task6 API is not connected"}
        </p>
      </section>

      <ProgrammersBoard initial={programmers} live={live} />
    </>
  );
};

export default Home;
