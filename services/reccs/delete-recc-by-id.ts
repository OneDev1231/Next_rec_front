"use server"

import { getXataClient } from "../../xata";

const xata = getXataClient();

export async function deleteReccById({ id }: {id: string}) {
  return await xata.db.recc_lists.delete(id);
}