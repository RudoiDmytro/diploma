"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type SearchItem = {
  slug: string;
  title: string;
  companyName: string;
};

type SearchResponse = {
  jobs: SearchItem[];
  assessments: SearchItem[];
};

type HomeSearchProps = {
  locale: string;
  placeholder: string;
  buttonLabel: string;
};

export default function HomeSearch({
  locale,
  placeholder,
  buttonLabel,
}: HomeSearchProps) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResponse>({
    jobs: [],
    assessments: [],
  });

  useEffect(() => {
    const value = q.trim();
    if (value.length < 2) {
      setOpen(false);
      setResults({ jobs: [], assessments: [] });
      return;
    }
    setOpen(true);

    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          setResults({ jobs: [], assessments: [] });
          return;
        }

        const data = (await res.json()) as SearchResponse;
        if (!controller.signal.aborted) {
          setResults(data);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setResults({ jobs: [], assessments: [] });
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [q]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = q.trim();
    if (!value) return;
    router.push(`/${locale}/search?q=${encodeURIComponent(value)}`);
    setOpen(false);
  };

  return (
    <div className="relative max-2xl:px-10">
      <form onSubmit={onSubmit} className="flex">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(q.trim().length >= 2)}
          placeholder={placeholder}
          className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2"
        />
        <button
          type="submit"
          className="px-2 py-2 justify-evenly flex flex-row gradient1 text-background rounded-r-lg hover:gradient2 focus:outline-none"
        >
          <Search />
          {buttonLabel}
        </button>
      </form>

      {loading && q.trim().length >= 2 && (
        <div className="absolute z-20 mt-1 w-full rounded-md border bg-background p-2 text-sm text-muted-foreground">
          Searching...
        </div>
      )}

      {open && !loading && (
        <div className="absolute z-20 mt-1 w-full rounded-md border bg-background shadow-md overflow-hidden">
          {results.jobs.length > 0 && (
            <div>
              <p className="px-3 py-2 text-xs text-muted-foreground border-b">Jobs</p>
              {results.jobs.map((job) => (
                <Link
                  key={`job-${job.slug}`}
                  href={`/${locale}/jobs/${job.slug}`}
                  className="block px-3 py-2 hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  <p className="text-sm font-medium">{job.title}</p>
                  <p className="text-xs text-muted-foreground">{job.companyName}</p>
                </Link>
              ))}
            </div>
          )}

          {results.assessments.length > 0 && (
            <div>
              <p className="px-3 py-2 text-xs text-muted-foreground border-y">Assessments</p>
              {results.assessments.map((assessment) => (
                <Link
                  key={`assessment-${assessment.slug}`}
                  href={`/${locale}/test-library/${assessment.slug}`}
                  className="block px-3 py-2 hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  <p className="text-sm font-medium">{assessment.title}</p>
                  <p className="text-xs text-muted-foreground">{assessment.companyName}</p>
                </Link>
              ))}
            </div>
          )}

          {results.jobs.length === 0 && results.assessments.length === 0 && (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
