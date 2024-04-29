import { useEffect } from "react";

export function triggerGoogleAuth() {
  let interval: any;

  interval = setInterval(() => {
    const element: HTMLDivElement | null = document.querySelector(
      ".cl-socialButtonsBlockButton__google"
    );

    if (element) {
      clearInterval(interval);
      element.click();
    }
  }, 50);
}

export function useTriggerGoogleAuth({ start }: { start: string }) {
  useEffect(() => {
    if (start) triggerGoogleAuth();
  }, [start]);
}
