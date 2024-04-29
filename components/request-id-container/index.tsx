"use client";

import { RequestIdDrawer } from "@/app/request/[id]/drawer";
import { RequestsRecord } from "@/xata";
import { ReactNode, useState } from "react";
import useSWR from "swr";
import { useDrawerStore } from "../drawer-v2";

export const REQUEST_BY_ID_URL = "/api/request";

const requestByIdFetcher = async ({ url, id }: { url: string; id: string }) => {
  const query = await fetch(`${url}?id=${id}`);
  const response = await query.json();

  return response;
};

const useRequestById = ({
  id,
  shouldOpen,
}: {
  id: string;
  shouldOpen: boolean;
}) => {
  const { data: request } = useSWR(
    shouldOpen ? [REQUEST_BY_ID_URL, id] : null,
    ([url, id]) => requestByIdFetcher({ url, id })
  );

  return { request };
};

export function RequestIdContainer({
  userId,
  request,
  children,
}: {
  userId: string;
  request: RequestsRecord;
  children: ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { request: queriedRequest } = useRequestById({
    id: request.id,
    shouldOpen: open,
  });

  const press = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    const isSelfPressed = e.target.closest(
      `[data-request-id-container="${request.id}"]`
    );
    if (!isSelfPressed) return;

    setOpen(true);
  };

  const drawerCallback = () => {
    setOpen(false);
  };

  return (
    <div className="w-full" data-request-id-container={request.id}>
      {open && (
        <RequestIdDrawer
          userId={userId}
          request={queriedRequest}
          callback={drawerCallback}
        />
      )}

      <div className="w-full cursor-auto" onClick={press}>
        {children}
      </div>
    </div>
  );
}
