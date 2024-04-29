import { Button } from "../ui/button";

export type DrawerFooterCallbackType = "DELETE" | "POST" | "CANCEL";
export type DrawerFooterMode = "ITEM_CREATE" | "ITEM_EDITING";
export type FooterType = "CREATING" | "EXISTING";

export function DrawerFooter({
  type,
  primaryCtaText = "Post",
  mode,
  callback,
}: {
  type: FooterType;
  primaryCtaText?: string | null;
  mode: DrawerFooterMode;
  callback: ({ eventType }: { eventType: DrawerFooterCallbackType }) => void;
}) {
  const visibility =
    type === "EXISTING" && mode !== "ITEM_EDITING" ? "invisible" : "visible";

  return (
    <div
      className={`fixed bottom-0 w-full h-[60px] bg-white p-4 flex justify-end items-center rounded-lg ${visibility}`}
      style={{ boxShadow: "0 0 8px 0 #44403C12" }}
    >
      {type === "CREATING" && mode === "ITEM_CREATE" && (
        <div className="w-full flex justify-end gap-2">
          <Button
            variant="secondary"
            className="w-[96px] bg-stone-200"
            onClick={() => callback({ eventType: "CANCEL" })}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="w-[96px] bg-[#FF2F00]"
            onClick={() => callback({ eventType: "POST" })}
          >
            {primaryCtaText}
          </Button>
        </div>
      )}

      {mode === "ITEM_EDITING" && (
        <div className="w-full flex justify-center">
          <Button
            variant="link"
            className="w-[96px] text-red-600"
            onClick={() => callback({ eventType: "DELETE" })}
          >
            Delete All
          </Button>
        </div>
      )}
    </div>
  );
}
