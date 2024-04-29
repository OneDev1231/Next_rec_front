"use client";

import { Newspaper, Library, Mic, Megaphone } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { DrawerV2, useDrawerStore } from "../drawer-v2";
import CreateReccComponent from "../create-recc";
import CreateRequestComponent from "../create-request";

function ItemText({ children }: { children: ReactNode }) {
  return (
    <div className="text-sm font-sans font-regular text-stone-600">
      {children}
    </div>
  );
}

function Item({
  text,
  navigateTo,
  children,
}: {
  text: string;
  navigateTo: string;
  children: ReactNode;
}) {
  return (
    <Link href={navigateTo} className="w-full">
      <div className="flex flex-col items-center">
        {children}
        <ItemText>{text}</ItemText>
      </div>
    </Link>
  );
}

const getPressUrl = ({ mode, id }: { mode: Mode; id?: string }) => {
  if (mode === "reccs") return "/create-recc";
  if (mode === "requests") return "/create-request";
  if (mode === "response") return `/create-response/${id}`;

  return "/create-recc";
};

function CreateItem({ mode, userId }: { mode: Mode; userId: string }) {
  const router = useRouter();
  const params = useParams();
  const closeCurrentDrawer = useDrawerStore((state) => state.closeCurrent);
  const pressUrl = getPressUrl({ mode, id: params?.id as string });

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="ring ring-white ring-offset-4 ring-offset-white bg-white rounded-full mt-[-35px]">
        {mode === "reccs" && (
          <DrawerV2
            id="CREATE_RECC"
            trigger={
              <Button
                variant="destructive"
                className="w-[60px] h-[60px] rounded-full"
              >
                <Mic />
              </Button>
            }
          >
            <CreateReccComponent userId={userId} />
          </DrawerV2>
        )}

        {mode === "requests" && (
          <DrawerV2
            id="CREATE_REQUEST"
            trigger={
              <Button
                variant="destructive"
                className="w-[60px] h-[60px] rounded-full bg-stone-900 hover:bg-stone-700"
              >
                <Megaphone className="stroke-white" />
              </Button>
            }
          >
            <CreateRequestComponent userId={userId} />
          </DrawerV2>
        )}

        {mode === "response" && (
          <Link href={pressUrl}>
            <Button
              variant="destructive"
              className="w-[60px] h-[60px] rounded-full"
              onClick={() => router.push(pressUrl)}
            >
              <Mic />
            </Button>
          </Link>
        )}
      </div>

      <ItemText>{mode === "reccs" ? "Create" : "Request"}</ItemText>
    </div>
  );
}

type Mode = "reccs" | "requests" | "response";
const getMode = ({ path }: { path: string }): Mode => {
  if (path.includes("/reccs")) return "reccs";
  if (path.includes("/requests")) return "requests";
  if (path.includes("/request")) return "response";

  return "reccs";
};

export function DefaultFooter({ userId }: { userId: string }) {
  const path = usePathname();
  const mode = getMode({ path });
  const doNotRenderList = [
    "/create-recc",
    "/create-request",
    "/create-response",
    "/recc/",
  ];
  const identifiedPaths = doNotRenderList.filter((url) => {
    return path.includes(url);
  });
  const renderFooter = !identifiedPaths.length;

  return (
    <div
      className={`${
        renderFooter ? "flex" : "hidden"
      } flex-row justify-between items-center w-full fixed bottom-0 bg-white py-3.5 px-4 z-10 rounded-lg`}
      style={{ boxShadow: "0 0 8px 0 #44403C12" }}
    >
      <Item text="Feed" navigateTo="/">
        <Newspaper
          color={
            path === "/reccs" || path === "/requests" ? "#FF2F00" : "#57534E"
          }
        />
      </Item>

      <CreateItem mode={mode} userId={userId} />

      <Item text="Library" navigateTo="/library/saved">
        <Library color={path.includes("/library") ? "#FF2F00" : "#57534E"} />
      </Item>
    </div>
  );
}
