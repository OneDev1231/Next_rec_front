"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ReactNode, useEffect } from "react";
import { create } from "zustand";

interface Drawer {
  id: string;
  includeHandle: boolean;
  isOpen: boolean;
  dismissable: boolean;
}

interface DrawerState {
  drawers: Drawer[];
  subscribe: ({
    id,
    includeHandle,
    isOpen,
    dismissable,
  }: {
    id: string;
    includeHandle: boolean;
    isOpen: boolean;
    dismissable: boolean;
  }) => void;
  setOpen: ({ id, value }: { id: string; value: boolean }) => void;
  setHandle: ({ id, value }: { id: string; value: boolean }) => void;
  setDismissable: ({ id, value }: { id: string; value: boolean }) => void;
  closeCurrent: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  drawers: [],
  subscribe: ({ id, includeHandle, isOpen, dismissable }: any) =>
    set((state: any) => {
      const drawers = state.drawers;

      if (!drawers.find((i: any) => i.id === id)) {
        drawers.push({ id, includeHandle, isOpen, dismissable });
      } else {
        const drawer = drawers.find((i: any) => i.id === id);
        drawer.includeHandle = includeHandle;
        drawer.isOpen = isOpen;
        drawer.dismissable = dismissable;
      }

      return { drawers: [...drawers] };
    }),
  setOpen: ({ id, value }: any) => {
    return set((state: any) => {
      const drawers = state.drawers;

      drawers.forEach((drawer: any) => {
        if (drawer.id === id) drawer.isOpen = value;
      });

      return { drawers: [...drawers] };
    });
  },
  setHandle: ({ id, value }: any) => {
    return set((state: any) => {
      const drawers = state.drawers;

      drawers.forEach((drawer: any) => {
        if (drawer.id === id) drawer.includeHandle = value;
      });

      return { drawers: [...drawers] };
    });
  },
  setDismissable: ({ id, value }: { id: string; value: boolean }) => {
    return set((state: any) => {
      const drawers = state.drawers;

      drawers.forEach((drawer: any) => {
        if (drawer.id === id) drawer.dismissable = value;
      });

      return { drawers: [...drawers] };
    });
  },
  closeCurrent: () => {
    return set((state) => {
      const drawers = state.drawers;

      const openDrawers = drawers.filter((i) => i.isOpen);
      const lastOpenDrawer = openDrawers[openDrawers.length - 1];
      if (lastOpenDrawer) lastOpenDrawer.isOpen = false;

      return { drawers: [...drawers] };
    });
  },
}));

export function DrawerV2({
  id,
  trigger,
  open = false,
  handle = true,
  closeCallback,
  children,
}: {
  id: string;
  trigger: ReactNode;
  open?: boolean;
  handle?: boolean;
  closeCallback?: () => void;
  children: ReactNode;
}) {
  const subscribeDrawer = useDrawerStore((state) => state.subscribe);
  const setOpen = useDrawerStore((state) => state.setOpen);
  const drawers = useDrawerStore((state) => state.drawers);
  const drawer = drawers.find((item) => item.id === id);

  useEffect(() => {
    subscribeDrawer({
      id,
      includeHandle: handle,
      isOpen: open,
      dismissable: true,
    });
  }, [id, subscribeDrawer, open, handle]);

  const onOpenChange = (value: boolean) => {
    if (value === false && !drawer?.dismissable) return;

    if (value === false && closeCallback) {
      closeCallback();
    } else {
      setOpen({ id, value });
    }
  };

  if (!drawer) return null;

  return (
    <Drawer
      open={drawer.isOpen}
      onOpenChange={onOpenChange}
      dismissible={drawer.dismissable}
    >
      {!open && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}

      <DrawerContent
        className={`max-h-[calc(100svh-60px)] rounded-t-[32px] overflow-hidden outline-none ${
          drawer.includeHandle ? "" : "[&>div:nth-child(1)]:hidden"
        }`}
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
}
