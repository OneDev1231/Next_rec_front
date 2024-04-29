"use server";

import { FilledOutRecc } from "@/types";
import { ReccListsRecord, getXataClient } from "../../xata";
import { getCreatorForReccList, getReccItemsForReccList } from "./lib";

const xata = getXataClient();

export async function getReccById({ id }: { id: string }) {
  const recc = (await xata.db.recc_lists
    .filter({ id })
    .getFirst({ consistency: "eventual" })) as ReccListsRecord;

  if (!recc) return null;

  const reccItems = await getReccItemsForReccList({ recc });
  const creator = await getCreatorForReccList({ recc });

  return { ...recc, creator, reccItems } as FilledOutRecc;
}
