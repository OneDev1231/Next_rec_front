"use client";

import useSWR from "swr";
import { Bookmark } from "../bookmark";
import { ReccListSavesRecord } from "@/xata";

const reccSavedFetcher = async ({ url, id }: { url: string; id: string }) => {
  const query = await fetch(`${url}?id=${id}`);
  const response = await query.json();

  return response as ReccListSavesRecord;
};

const useReccSaved = ({ id }: { id: string }) => {
  const { data: saved } = useSWR(["/api/recc-saved", id], ([url, id]) =>
    reccSavedFetcher({ url, id })
  );

  return { saved };
};

export function ReccSaved({ id, userId }: { id: string; userId: string }) {
  const { saved } = useReccSaved({ id });

  return <Bookmark id={id} userId={userId} which={saved ? "SET" : "UNSET"} />;
}
