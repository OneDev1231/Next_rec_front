import { LibraryTabs } from "../library-tabs";
import { RecFeedItem } from "../recc-feed";

export function LibrarySavedFeed({
  reccs,
  userId,
}: {
  reccs: any[];
  userId: string;
}) {
  return (
    <div className="flex flex-col gap-4 w-full flex-grow-1 px-2 pb-[100px]">
      <LibraryTabs value="saved" />

      {reccs.map((recc, key) => (
        <RecFeedItem key={key} recc={recc} userId={userId} />
      ))}
    </div>
  );
}
