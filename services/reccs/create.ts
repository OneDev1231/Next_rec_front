"use server"

import { currentUser } from "@clerk/nextjs";

import { getXataClient } from "../../xata";

const xata = getXataClient();

interface ReccItem {
  reccListId: string,
  reccList: string,
  title: string,
  description: string,
  imageUrl: string,
  link: string,
  category: string,
}

interface PrebuiltRecc {
  userId: string,
  reccItems: ReccItem[],
  title: string,
  promptText: string,
  requestId: string | null,
}

export async function generateReccAI({ promptText }: { promptText: string }) {
  // Fetch AI & places results
  const AI_REQUEST_URL = "https://api.recc.ooo/extract_text_data";
  
  const formData = new FormData();
  formData.set("text", promptText);
  
  const aiQuery = await fetch(AI_REQUEST_URL, {
    method: "POST",
    body: formData,
  });

  return aiQuery.json();
}

export async function createPrebuiltRecc({ userId, reccItems, title, promptText, requestId }: PrebuiltRecc ) {
  const listRecord = await xata.db.recc_lists.create({
    user_id: userId,
    user: userId,
    recc_items: [],
    title: title,
    prompt_text: promptText,
    request_id: requestId || null,
  });

  // Create individual recc items from the results
  const listItems: string[] = [];
  const itemsToIterate = reccItems;
  for (let i = 0; i < itemsToIterate.length; i++) {
    const item = itemsToIterate[i];

    const listItemRecord = await xata.db.recc_items.create({
      recc_list_id: listRecord.id,
      recc_list: listRecord.id,
      title: item.title,
      description: item.description,
      image_url: item.imageUrl,
      link: item.link,
      category: item.category,
    });

    listItems.push(listItemRecord.id);
  }
  
  const updatedListRecord = await xata.db.recc_lists.update(listRecord.id, {
    recc_items: listItems,
  });

  return updatedListRecord;
}

export async function createReccService({ promptText, requestId }: { promptText: string, requestId?: string }){
  const user = await currentUser();
  if (!user) throw new Error("NO_USER");

  // Fetch AI & places results
  const AI_REQUEST_URL = "https://api.recc.ooo/extract_text_data";
  const formData = new FormData();
  formData.set("text", promptText);
  const aiQuery = await fetch(AI_REQUEST_URL, {
    method: "POST",
    body: formData,
  });
  const aiQueryResult = await aiQuery.json();

  const listRecord = await xata.db.recc_lists.create({
    user_id: user.id,
    user: user.id,
    recc_items: [],
    title: aiQueryResult.title || "This is a new title!",
    prompt_text: promptText,
    request_id: requestId || null,
    status: "draft",
  });

  // Create individual recc items from the results
  const listItems: string[] = [];
  const itemsToIterate = aiQueryResult?.media || [];
  for (let i = 0; i < itemsToIterate.length; i++) {
    const item = itemsToIterate[i];

    const listItemRecord = await xata.db.recc_items.create({
      recc_list_id: listRecord.id,
      recc_list: listRecord.id,
      title: item.Title,
      description: item.Description,
      image_url: item.imgURL,
      link: item.launchURL,
      category: item.Category,
    });

    listItems.push(listItemRecord.id);
  }
  
  const updatedListRecord = await xata.db.recc_lists.update(listRecord.id, {
    recc_items: listItems,
  });

  return updatedListRecord;
}