"use client";

import { useTriggerGoogleAuth } from "@/lib/google-auth";
import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export function SignUpComponent() {
  const searchParams = useSearchParams();
  const start = searchParams.get("start");

  useTriggerGoogleAuth({ start: start || "" });

  return (
    <div className="invisible">
      <SignUp />
    </div>
  );
}
