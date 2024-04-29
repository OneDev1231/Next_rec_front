import { LibraryCreatedFeed } from "@/components/library-created-feed";
import { getMyFeed } from "@/services/reccs/get-my-feed";
import { currentUser } from "@clerk/nextjs";

export default async function LibraryCreatedPage() {
  const reccs = await getMyFeed({ mode: "MINE" });
  const user = await currentUser();

  return <LibraryCreatedFeed reccs={reccs} userId={user?.id || ""} />;
}
