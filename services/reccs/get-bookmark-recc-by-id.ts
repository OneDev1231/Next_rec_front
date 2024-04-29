"use server";

import { currentUser } from "@clerk/nextjs";
import { getXataClient } from "../../xata";

const xata = getXataClient();

export async function getBookmarkReccById({ id }: { id: string }) {
  const user = await currentUser();

  if (!user) return false;

  const recc = await xata.db.recc_list_saves
    .filter({ recc_list_id: id, user_id: user?.id })
    .getFirst();

  if (recc) return true;
  return false;
}
