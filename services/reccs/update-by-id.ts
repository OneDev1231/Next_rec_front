"use server"

import { ReccLists, getXataClient } from "../../xata";

const xata = getXataClient();

export async function updateReccById({ id, title, promptText, status }: {id: string, title?: string, promptText?: string, status?: "draft" | "active" }) {
  const mapping: ReccLists = { id };

  if (title) mapping.title = title;
  if (promptText) mapping.prompt_text = promptText;
  if (status) mapping.status = status;

  const record = await xata.db.recc_lists.update(id, mapping);
  return record;
}