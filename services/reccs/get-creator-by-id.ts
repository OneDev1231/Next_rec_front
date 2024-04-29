"use server";

import { getXataClient } from "../../xata";

const xata = getXataClient();

export async function getCreatorById({ id }: { id: string }) {
  const user = await xata.db.users.filter({ id: id }).getFirst();

  if (user) return user;
  return null;
}
