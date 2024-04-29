import { LibrarySavedFeed } from "@/components/library-saved-feed";
import { getBookmarkedReccs } from "@/services/reccs/get-bookmarked-reccs";
import { currentUser } from "@clerk/nextjs";

export default async function LibrarySavedPage() {
  const reccs = await getBookmarkedReccs();
  const user = await currentUser();

  return <LibrarySavedFeed reccs={reccs} userId={user?.id || ""} />;
}
