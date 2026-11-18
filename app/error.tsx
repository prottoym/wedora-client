"use client";

import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <TriangleAlert className="size-10 text-destructive" />
      <h1 className="mt-4 text-xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-xs text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={reset} className="mt-6 h-9 px-5 text-xs">
        Try again
      </Button>
    </section>
  );
}