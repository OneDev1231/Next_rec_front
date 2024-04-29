"use client";

import { Button } from "../ui/button";
import { useCallback, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { LottieWave } from "../lottie-wave";

export function LoadMoreReccFeed({
  callback,
}: {
  callback: (currentScroll: number) => void;
}) {
  const handler = useDebouncedCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      logic();
    }
  }, 600);

  const logic = useCallback(() => {
    const currentScroll = window.scrollY;
    callback(currentScroll);
  }, [callback]);

  useEffect(() => {
    window.addEventListener("scroll", handler, false);
    return () => window.removeEventListener("scroll", handler);
  }, [logic, handler]);

  return (
    <div className="flex justify-center w-full py-[50px] pb-[125px]">
      <Button variant="link">
        <div className="origin-center scale-[.5]">
          <LottieWave />
        </div>
      </Button>
    </div>
  );
}
