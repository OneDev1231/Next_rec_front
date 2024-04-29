"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { DrawerV2 } from "../drawer-v2";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";

type Mode = "signin" | "signup";
type PressCallback = ({ value }: { value: Mode }) => void;

function AuthTabs({ pressCallback }: { pressCallback: PressCallback }) {
  return (
    <div className="w-full bg-stone-200 rounded-md">
      <Tabs
        defaultValue="signup"
        className="flex justify-center w-full font-sans"
      >
        <TabsList className="w-full">
          <TabsTrigger
            value="signup"
            onClick={() => pressCallback({ value: "signup" })}
            className="w-1/2"
          >
            Sign Up
          </TabsTrigger>
          <TabsTrigger
            value="signin"
            onClick={() => pressCallback({ value: "signin" })}
            className="w-1/2"
          >
            Sign In
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

function AuthenticationDrawer() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const pressCallback = ({ value }: { value: Mode }) => {
    setMode(value);
  };

  return (
    <div className="flex flex-col items-center pt-[24px] px-[36px]">
      <img
        src="/recc-logo.svg"
        alt="Recc logo"
        width={54}
        height={29}
        className="w-[54px] h-[29px]"
      />

      <div className="py-[24px] font-sans text-base text-slate-800 text-center">
        Save and share recommendations with friends. It&apos;s fun.
      </div>

      <AuthTabs pressCallback={pressCallback} />

      <div className="w-full py-[24px]">
        {mode === "signup" && (
          <Link href="/sign-up?start=true">
            <Button className="gap-2 w-full items-center">
              <img src="/Google-logo.svg" className="mt-[-1px]" /> Sign up with
              Google
            </Button>
          </Link>
        )}
        {mode === "signin" && (
          <Link href="/sign-in?start=true">
            <Button className="gap-2 w-full items-center">
              <img src="/Google-logo.svg" className="mt-[-1px]" /> Sign in with
              Google
            </Button>
          </Link>
        )}
      </div>

      <div className="py-[32px] pt-0 max-w-[310px] font-sans text-xs text-stone-500 text-center">
        By continuing, you agree to <br></br>Recc{"'"}s{" "}
        <a href="#" target="_blank" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" target="_blank" className="underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}

export function LoggedOutFooter({ SignUp }: any) {
  const path = usePathname();
  const doNotRenderFooterList = ["/sign-in", "/sign-up", "/after-sign-up"];
  const renderFooter = !doNotRenderFooterList.includes(path);

  return (
    <div
      className={`${
        renderFooter ? "flex" : "hidden"
      } flex-row justify-between items-center w-full fixed left-0 bottom-0 bg-white py-3.5 px-4 rounded-t-[8px]`}
      style={{
        boxShadow: "0 0 8px 0 #44403C12",
      }}
    >
      {SignUp}
      <div className="font-sans text-base w-full max-w-[143px] text-stone-800">
        Voice your recommendations.
      </div>
      <div className="flex flex-row gap-2">
        <DrawerV2
          id="AUTHENTICATION_VIA_FOOTER"
          trigger={
            <Button
              variant="destructive"
              className="font-sans bg-[#FF2F00] w-[96px]"
            >
              Get Started
            </Button>
          }
        >
          <AuthenticationDrawer />
        </DrawerV2>
      </div>
    </div>
  );
}
