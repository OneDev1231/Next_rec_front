import { ReactNode } from "react";
import { create } from "zustand";

export const useFeedStore = create<any>((set: any) => ({
  feed: [],
  append: (node: ReactNode) => {
    return set((state: any) => {
      let feed = state.feed;

      feed = feed.concat(node);

      return { feed };
    });
  },
}));
