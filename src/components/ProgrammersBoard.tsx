"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addProgrammer } from "@/app/actions";
import { STACK_SUGGESTIONS, type Programmer } from "@/app/sample-programmers";

const LOCAL_KEY = "task7-local-programmers";

type Props = { initial: Programmer[]; live: boolean };

const stackOf = (p: Programmer) => p.stack?.name?.trim() || "Other";

export default function ProgrammersBoard({ initial, live }: Props) {
  const router = useRouter();
  const [local, setLocal] = useState<Programmer[]>([]);
  const [query, setQuery] = useState("");
  const [stack, setStack] = useState("All");
  const [sort, setSort] = useState<"name" | "age-asc" | "age-desc">("name");
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  // Demo mode: programmers added in this browser are kept in localStorage.
  useEffect(() => {
    if (live) return;
    try {
      const saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
      if (Array.isArray(saved)) setLocal(saved);
    } catch {
      /* ignore broken storage */
    }
  }, [live]);

  const all = useMemo(() => (live ? initial : [...initial, ...local]), [initial, local, live]);
  const stacks = useMemo(() => ["All", ...Array.from(new Set(all.map(stackOf))).sort()], [all]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all
      .filter((p) => stack === "All" || stackOf(p) === stack)
      .filter((p) => !q || p.name.toLowerCase().includes(q) || stackOf(p).toLowerCase().includes(q))
      .sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : sort === "age-asc" ? a.age - b.age : b.age - a.age));
  }, [all, query, stack, sort]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const input = {
      name: String(fd.get("name") || "").trim(),
      age: Number(fd.get("age")),
      stack: String(fd.get("stack") || "").trim(),
    };
    setMessage(null);

    if (!live) {
      const p: Programmer = { _id: `local-${Date.now()}`, name: input.name, age: input.age, stack: { name: input.stack } };
      const next = [...local, p];
      setLocal(next);
      try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
      } catch {
        /* storage full or blocked: keep it in memory only */
      }
      setMessage({ type: "ok", text: `${p.name} was added in this browser only (demo mode).` });
      form.reset();
      return;
    }

    startTransition(async () => {
      const res = await addProgrammer(input);
      if (res.ok) {
        setMessage({ type: "ok", text: `${res.programmer.name ?? input.name} was saved to the database.` });
        form.reset();
        router.refresh();
      } else {
        setMessage({ type: "error", text: res.error });
      }
    });
  };

  const clearLocal = () => {
    setLocal([]);
    try {
      localStorage.removeItem(LOCAL_KEY);
    } catch {
      /* ignore */
    }
    setMessage(null);
  };

  const field =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <section aria-labelledby="list-heading" className="min-w-0">
        <h2 id="list-heading" className="sr-only">
          Programmers list
        </h2>

        <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="sr-only" htmlFor="q">
            Search
          </label>
          <input id="q" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or stack…" className={field} />
          <label className="sr-only" htmlFor="sort">
            Sort
          </label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className={field}>
            <option value="name">Name A–Z</option>
            <option value="age-asc">Youngest first</option>
            <option value="age-desc">Oldest first</option>
          </select>
        </div>

        <div role="group" aria-label="Filter by stack" className="mb-6 flex flex-wrap gap-2">
          {stacks.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStack(s)}
              aria-pressed={stack === s}
              className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
                stack === s ? "border-teal-600 bg-teal-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-teal-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <p className="mb-3 text-sm text-slate-500" aria-live="polite">
          Showing {visible.length} of {all.length}
        </p>

        {visible.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            {all.length === 0 ? "No programmers yet. Add the first one." : "No programmers match your search."}
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((p, i) => (
              <li key={p._id ?? i} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal-100 text-lg font-semibold text-teal-700">
                  {p.name.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-slate-900">{p.name}</h3>
                  <p className="text-sm text-slate-500">{p.age} years old</p>
                  <span className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700" translate="no">
                    {stackOf(p)}
                  </span>
                  {p._id?.startsWith("local-") && <span className="ml-2 text-xs text-amber-700">local</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside aria-labelledby="add-heading" className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
        <h2 id="add-heading" className="mb-1 text-lg font-semibold text-slate-900">
          Add a programmer
        </h2>
        <p className={`mb-4 rounded-md px-3 py-2 text-sm ${live ? "bg-teal-50 text-teal-800" : "bg-amber-50 text-amber-800"}`}>
          {live
            ? "Saved to MongoDB through the task6 API."
            : "Demo mode: the API is not connected, so new programmers are saved only in this browser."}
        </p>
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Name
            <input name="name" required minLength={2} maxLength={60} autoComplete="off" className={`${field} mt-1`} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Age
            <input name="age" type="number" required min={14} max={99} className={`${field} mt-1`} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Stack
            <input name="stack" required maxLength={40} list="stack-options" placeholder="e.g. React" className={`${field} mt-1`} />
            <datalist id="stack-options">
              {STACK_SUGGESTIONS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </label>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-teal-600 px-4 py-2.5 font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
          >
            {pending ? "Saving…" : "Add programmer"}
          </button>
        </form>
        {message && (
          <p role="status" className={`mt-3 text-sm ${message.type === "ok" ? "text-teal-700" : "text-red-700"}`}>
            {message.text}
          </p>
        )}
        {!live && local.length > 0 && (
          <button type="button" onClick={clearLocal} className="mt-3 text-sm text-slate-500 underline hover:text-slate-700">
            Remove the {local.length} local programmer{local.length > 1 ? "s" : ""}
          </button>
        )}
      </aside>
    </div>
  );
}
