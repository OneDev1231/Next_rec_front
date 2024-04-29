"use server";

import { currentUser } from "@clerk/nextjs";

import { getXataClient } from "../../xata";

const xata = getXataClient();

export async function removeBookmarkReccById({
  reccListId,
}: {
  reccListId: string;
}) {
  const user = await currentUser();
  if (!user) throw new Error("NO_USER");

  const bookmark = await xata.db.recc_list_saves
    .filter({ user_id: user.id, recc_list_id: reccListId })
    .getFirst();

  if (bookmark) return xata.db.recc_list_saves.delete(bookmark.id);
  return null;
}
