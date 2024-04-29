import { DeletedToastListener } from "@/components/deleted-toast-listener";
import { PostedToastListener } from "@/components/posted-toast-listener";
import { RequestsFeed } from "@/components/requests-feed";
import { currentUser } from "@clerk/nextjs";

// Edge runtime for backend on this page (and actions called from this page)
export const runtime = "edge"; // 'nodejs' (default) | 'edge'

// Do not use data cache on this page
export const dynamic = "force-dynamic";

export default async function ReccsPage() {
  const user = await currentUser();

  return (
    <>
      <RequestsFeed userId={user?.id || ""} />
      <PostedToastListener />
      <DeletedToastListener />
    </>
  );
}
