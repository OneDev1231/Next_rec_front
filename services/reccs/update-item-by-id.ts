"use server"

import { ReccItems, ReccLists, getXataClient } from "../../xata";

const xata = getXataClient();

export async function updateReccItemById({ id, title, description }: {id: string, title?: string, description?: string}) {
  const mapping: ReccItems = { id };
  if (title) mapping.title = title;
  if (description) mapping.description = description;

  const record = await xata.db.recc_items.update(id, mapping);
  return record;
}