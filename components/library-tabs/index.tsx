import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

type Value = "created" | "requests" | "saved";

export function LibraryTabs({ value = "created" }: { value: Value }) {
  return (
    <Tabs
      defaultValue="created"
      className="flex justify-center w-full font-sans pb-4"
      value={value}
    >
      <TabsList>
        <TabsTrigger value="saved">
          <Link href="/library/saved">Saved</Link>
        </TabsTrigger>
        <TabsTrigger value="created">
          <Link href="/library/created">Created</Link>
        </TabsTrigger>
        <TabsTrigger value="requests">
          <Link href="/library/requests">Requests</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
