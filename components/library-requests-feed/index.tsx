import { LibraryTabs } from "../library-tabs";
import { RequestFeedItem } from "../requests-feed";
import { RequestsRecord } from "@/xata";

export function LibraryRequestsFeed({
  requests,
  userId,
}: {
  requests: RequestsRecord[];
  userId: string;
}) {
  return (
    <div className="flex flex-col gap-4 w-full flex-grow-1 px-2 pb-[100px]">
      <LibraryTabs value="requests" />

      {requests.map((request, key) => (
        <RequestFeedItem key={key} request={request} userId={userId} />
      ))}
    </div>
  );
}
