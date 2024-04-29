import { ReccFeed } from "@/components/recc-feed";
import { getMyFeed } from "@/services/reccs/get-my-feed";
import { currentUser } from "@clerk/nextjs";

export async function Feed() {
  const reccs = await getMyFeed({ mode: "DEFAULT" });
  const user = await currentUser();

  return <ReccFeed reccs={reccs} userId={user?.id || ""} />;
}
