"use server";

import { currentUser } from "@clerk/nextjs";
import { getXataClient } from "../../xata";

const xata = getXataClient();

export async function getBookmarkedReccs() {
  const user = await currentUser();

  let reccs = [];
  const bookmarks = await xata.db.recc_list_saves
    .filter({ user_id: user?.id })
    .getAll();

  for (let i = 0; i < bookmarks.length; i++) {
    const bookmark = bookmarks[i];
    let queryParts = xata.db.recc_lists
      .sort("xata.createdAt", "desc")
      .select([
        "*",
        "user.*",
        {
          name: "<-recc_items.recc_list",
          columns: ["*"],
          as: "recc_items_expanded",
        },
      ])
      .filter({ id: bookmark.recc_list?.id });

    const recc = await queryParts.getFirst();
    if (recc) reccs.push(recc);
  }

  const adjustedReccs = [];

  for (let i = 0; i < reccs.length; i++) {
    const recc = reccs[i];
    const reccItemRecords = recc.recc_items_expanded?.records || [];
    const creator = {
      first_name: recc.user?.first_name,
      last_name: recc.user?.last_name || "",
      image_url: recc.user?.image_url,
    };

    adjustedReccs.push({ ...recc, creator, reccItems: reccItemRecords });
  }

  return adjustedReccs;
}
