"use client";

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { usePathname } from "next/navigation";

interface Tab {
  label: string;
  url: string;
}

export function TabsHeader({ tabsList }: { tabsList: Tab[] }) {
  const pathname = usePathname();
  const activeTab = tabsList.find((i) => i.url === pathname)?.url;

  if (!activeTab) return null;

  return (
    <Tabs
      defaultValue="account"
      className="flex justify-center w-full font-sans"
      value={activeTab}
    >
      <TabsList>
        {tabsList.map((tab, index) => (
          <Link key={index} href={tab.url}>
            <TabsTrigger
              value={tab.url}
              className="w-[96px] text-base font-semibold data-[state=active]:underline underline-offset-[7px] data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent shadow-none outline-none border-none"
            >
              {tab.label}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
