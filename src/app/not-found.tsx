import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="font-semibold text-teal-700">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700">
        Back to the directory
      </Link>
    </div>
  );
}
