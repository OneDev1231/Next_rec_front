import { RequestsFeed } from "@/components/requests-feed";

export async function Feed({
  userId,
  offset,
}: {
  userId: string;
  offset: number;
}) {
  return <RequestsFeed userId={userId} offset={offset} />;
}
