import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const SITE_URL = "https://task7-front-end-for-task6.vercel.app";
const TITLE = "Programmers directory: Next.js + Express + MongoDB";
const DESCRIPTION =
  "Search, filter and add programmers. A Next.js frontend for an Express and MongoDB REST API, with a demo mode when the API is offline.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Programmers directory" },
  description: DESCRIPTION,
  applicationName: "Programmers directory",
  authors: [{ name: "Antiqa", url: "https://github.com/codelady-ship" }],
  keywords: ["Next.js", "Express", "MongoDB", "Mongoose", "REST API", "Server Actions", "full-stack"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: SITE_URL, siteName: "Programmers directory", title: TITLE, description: DESCRIPTION, locale: "en_US" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = { themeColor: "#0d9488" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased`}>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span aria-hidden className="grid h-8 w-8 place-items-center rounded-lg bg-teal-600 font-mono text-sm text-white">
                {"</>"}
              </span>
              Programmers
            </Link>
            <a
              href="https://github.com/codelady-ship/task6.mongodb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-600 hover:text-teal-700"
            >
              Backend API code
            </a>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-6">
            <p>
              Built by{" "}
              <a href="https://github.com/codelady-ship" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                Antiqa (codelady-ship)
              </a>{" "}
              as a full-stack practice project.
            </p>
            <p>
              <a
                href="https://github.com/codelady-ship/task7-front-end-for-task6-"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-700"
              >
                Frontend source code
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
