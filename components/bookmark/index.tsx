"use client";

import { bookmarkRecc, removeBookmarkRecc } from "@/server-actions";
import { useEffect, useRef, useState } from "react";
import { useDrawerStore } from "../drawer-v2";
import { LoadMoreReccFeed } from "../load-more-recc-feed";
import useSWRInfinite from "swr/infinite";
import { ReccFeed } from "../recc-feed";

const OFFSET_BASE = 10;

export const globalReccFeed: any = {
  _data: [],
  _mutate: null,

  mutateSingleRecc({ reccId }: { reccId: string }) {
    let offset: number | null = null;

    globalReccFeed._data.forEach((offsetData: any[], index: number) => {
      const foundItem = offsetData.find((i) => i.id === reccId);
      if (foundItem) offset = index;
    });

    if (offset !== null) {
      globalReccFeed._mutate();
    }
  },
};

const getKey = (pageIndex: number, previousPageData: any) => {
  // No more results so stop fetching
  if (previousPageData && !previousPageData?.length) return null;

  // add the cursor to the API endpoint
  const url = `/api/reccs-feed?offset=${pageIndex * OFFSET_BASE}`;

  return url;
};

const reccFetcher = async (key: string) => {
  const query = await fetch(`${key}`);
  const response = await query.json();

  return response;
};

export const ReccFeedClient = ({ userId }: { userId: string }) => {
  const { data, size, setSize, mutate } = useSWRInfinite(getKey, reccFetcher);

  globalReccFeed._data = data;
  globalReccFeed._mutate = mutate;

  const scroll = useRef(0);

  const callback = (currentScroll: number) => {
    scroll.current = currentScroll;
    setSize(size + 1);
  };

  useEffect(() => {
    window.scroll(0, scroll.current);
  }, [data]);

  const lastItemResults = data ? data[data.length - 1].length : 0;
  const hasMoreResults = lastItemResults > 0;

  return (
    <>
      <ReccFeed reccs={data ? data?.flat() : []} userId={userId} />

      {hasMoreResults && <LoadMoreReccFeed callback={callback} />}

      {!hasMoreResults && <div className="w-full pb-[100px]" />}
    </>
  );
};

export function Bookmark({
  id,
  userId,
  which,
}: {
  id: string;
  userId: string;
  which: "SET" | "UNSET";
}) {
  const setOpen = useDrawerStore((state) => state.setOpen);
  const [stateWhich, setStateWhich] = useState<"SET" | "UNSET">(which);

  useEffect(() => {
    setStateWhich(which);
  }, [which]);

  const callback = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (userId) {
      setStateWhich((curr) => {
        if (curr === "SET") return "UNSET";
        else return "SET";
      });

      if (stateWhich === "SET") await removeBookmarkRecc({ id });
      else await bookmarkRecc({ id });
    } else {
      setOpen({ id: "AUTHENTICATION_VIA_FOOTER", value: true });
    }
  };

  return (
    <>
      <img
        className={`${stateWhich === "SET" ? "block" : "hidden"}`}
        src="/add-check-icon.svg"
        onClick={callback}
      />
      <img
        className={`${stateWhich === "UNSET" ? "block" : "hidden"}`}
        src="/save-icon.svg"
        onClick={callback}
      />
    </>
  );
}
