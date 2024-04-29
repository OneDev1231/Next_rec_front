import { currentUser } from "@clerk/nextjs";
import { getXataClient } from "../../xata";

const xata = getXataClient();

type Mode = "DEFAULT" | "MINE";

export const getMyFeed = async ({
  mode = "DEFAULT",
  offset = 0,
}: {
  mode?: Mode;
  offset?: number;
}) => {
  const user = await currentUser();

  let queryParts = xata.db.recc_lists.sort("xata.createdAt", "desc").select([
    "*",
    "user.*",
    {
      name: "<-recc_items.recc_list",
      columns: ["*"],
      as: "recc_items_expanded",
    },
  ]);

  if (mode === "MINE") {
    queryParts = queryParts.filter({ user_id: user?.id });
  }

  const reccs = await queryParts.filter({ status: "active" }).getPaginated({
    pagination: { size: 10, offset },
    consistency: "eventual",
  });

  const adjustedReccs = [];

  for (let i = 0; i < reccs.records.length; i++) {
    const recc = reccs.records[i];
    const reccItemRecords = recc.recc_items_expanded?.records || [];
    const creator = {
      first_name: recc.user?.first_name,
      last_name: recc.user?.last_name || "",
      image_url: recc.user?.image_url,
    };

    adjustedReccs.push({ ...recc, creator, reccItems: reccItemRecords });
  }

  return adjustedReccs;
};
