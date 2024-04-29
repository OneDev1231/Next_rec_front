import { ReccFeedClient } from "@/components/bookmark";
import { ReccFeed } from "@/components/recc-feed";
import { getMyFeed } from "@/services/reccs/get-my-feed";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import { PostedToastListener } from "@/components/posted-toast-listener";
import { DeletedToastListener } from "@/components/deleted-toast-listener";

export const runtime = "edge"; // 'nodejs' (default) | 'edge'

export default async function ReccsPage({
  searchParams,
}: {
  searchParams: { offset: string };
}) {
  // const offset = searchParams?.offset || "0";
  // const offsetNumber = parseInt(offset, 10);

  // const reccs = await getMyFeed({ offset: offsetNumber });
  const user = await currentUser();

  return (
    <>
      <ReccFeedClient userId={user?.id || ""} />
      <PostedToastListener />
      <DeletedToastListener />
    </>
  );
}
