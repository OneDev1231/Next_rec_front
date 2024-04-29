"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function PostedToastListener() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const posted = searchParams.get("posted");
  const hasRun = useRef<boolean>(false);

  useEffect(() => {
    if (!hasRun.current && posted) {
      hasRun.current = true;

      if (posted === "recc") {
        toast("Recc posted");
        router.push("/reccs");
      } else if (posted === "request") {
        toast("Request posted");
        router.push("/requests");
      }
    }
  }, [router, hasRun, posted]);

  return null;
}
