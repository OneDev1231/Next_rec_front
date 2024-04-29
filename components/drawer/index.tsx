"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import logoImage from "@/public/recc-logo.svg";

export function Drawer({
  backUrl,
  children,
}: {
  backUrl: string;
  children: ReactNode;
}) {
  const router = useRouter();

  const eventGoBack = () => {
    router.push(backUrl);
  };

  return (
    <div className="fixed top-0 w-full h-full flex flex-grow-1">
      <div
        className="w-full h-full bg-slate-950/50"
        onClick={eventGoBack}
      ></div>
      <div className="flex flex-col gap-8 bg-white text-white w-full absolute bottom-0 p-3.5 rounded-t-3xl">
        <div className="flex justify-center w-full">
          <Image src={logoImage} alt="logo" width="54" height="29" />
        </div>

        {children}
      </div>
    </div>
  );
}
