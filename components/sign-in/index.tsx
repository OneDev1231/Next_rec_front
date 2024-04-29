"use client";

import { useTriggerGoogleAuth } from "@/lib/google-auth";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export function SignInComponent() {
  const searchParams = useSearchParams();
  const start = searchParams.get("start");

  useTriggerGoogleAuth({ start: start || "" });

  return (
    <div className="invisible">
      <SignIn />
    </div>
  );
}
