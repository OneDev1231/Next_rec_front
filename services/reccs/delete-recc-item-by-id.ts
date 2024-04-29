"use server"

import { getXataClient } from "../../xata";

const xata = getXataClient();

export async function deleteReccItemById({ id }: {id: string}) {
  const reccList = await xata.db.recc_lists.filter({
    recc_items: {
      $includes: id,
    },
  }).getFirst();

  if (reccList) {
    const reccItems = reccList?.recc_items || [];
    const itemIndex = reccItems.findIndex(item => item === id);
    reccItems.splice(itemIndex, 1);
  
    await xata.db.recc_lists.update(reccList.id, {
      recc_items: reccItems,
    });
  
    await xata.db.recc_items.delete(id);
  }
  
  return null;
}