"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function DeletedToastListener() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const deleted = searchParams.get("deleted");
  const hasRun = useRef<boolean>(false);

  useEffect(() => {
    if (!hasRun.current && deleted) {
      hasRun.current = true;

      if (deleted === "recc") {
        toast("Recc deleted");
      } else if (deleted === "request") {
        toast("Request deleted");
      }

      const url = new URL(window.location.href);
      const editableSearchParams = new URLSearchParams(url.search);
      editableSearchParams.delete("deleted");
      const searchParamsAsString = editableSearchParams.toString();

      router.push(`${pathname}?${searchParamsAsString}`);
    }
  }, [router, pathname, searchParams, hasRun, deleted]);

  return null;
}
