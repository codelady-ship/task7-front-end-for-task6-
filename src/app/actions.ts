"use server";

import { revalidatePath } from "next/cache";
import { API_URL } from "./api";
import type { Programmer } from "./sample-programmers";

export type AddResult = { ok: true; programmer: Programmer } | { ok: false; error: string };

/**
 * Server Action: sends the new programmer to the task6 API.
 * Runs on the server, so PROGRAMMERS_API_URL never reaches the browser.
 */
export async function addProgrammer(input: { name: string; age: number; stack: string }): Promise<AddResult> {
  if (!API_URL) return { ok: false, error: "No API is configured." };

  const name = String(input.name ?? "").trim();
  const age = Number(input.age);
  const stack = String(input.stack ?? "").trim();
  if (!name || !stack || !Number.isInteger(age) || age < 14 || age > 99) {
    return { ok: false, error: "Please enter a name, a stack and an age between 14 and 99." };
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, stack: { name: stack } }),
      signal: AbortSignal.timeout(8000),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: body?.message || `The API responded with ${res.status}.` };
    revalidatePath("/");
    return { ok: true, programmer: body as Programmer };
  } catch {
    return { ok: false, error: "The API could not be reached. Please try again in a minute." };
  }
}
