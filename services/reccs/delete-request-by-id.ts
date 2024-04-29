"use server"

import { getXataClient } from "../../xata";

const xata = getXataClient();

export async function deleteRequestById({ id }: {id: string}) {
  return await xata.db.requests.delete(id);
}