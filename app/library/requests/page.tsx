import { LibraryRequestsFeed } from "@/components/library-requests-feed";
import { getRequests } from "@/services/reccs/get-requests";
import { currentUser } from "@clerk/nextjs";

export default async function LibraryRequestsPage() {
  const requests = await getRequests({ mode: "MINE" });
  const user = await currentUser();
  const userId = user?.id || "";

  return <LibraryRequestsFeed requests={requests} userId={userId} />;
}
