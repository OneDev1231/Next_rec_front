import { getAvatarLetters, shareSheet } from "@/lib/utils";
import { AvatarAndName } from "../avatar-and-name";
import { Button } from "../ui/button";
import { useDrawerStore } from "../drawer-v2";
import { FilledOutRequest } from "@/types";
import { RequestContent } from "../request-content";

export function CreateRequestShare({ request }: { request: FilledOutRequest }) {
  const setOpen = useDrawerStore((state) => state.setOpen);
  const avatarName = `${request.creator.first_name} ${
    request.creator?.last_name || ""
  }`;
  const avatarImage = request.creator.image_url;
  const avatarLetters = getAvatarLetters({
    firstName: request.creator.first_name,
    lastName: request.creator?.last_name || "",
  });

  return (
    <div className="flex flex-col gap-[20px] w-full p-[16px] pb-[24px]">
      <div className="flex flex-col w-full justify-center items-center">
        <div>Success</div>
        <img src="/wave-red.svg" className="w-[38px]" />
      </div>

      <div className="flex flex-col gap-[12px] w-full bg-stone-50 p-[16px] pb-0 rounded">
        <AvatarAndName
          avatarLetters={avatarLetters}
          avatarImage={avatarImage}
          avatarName={avatarName}
        />

        <RequestContent title={request.prompt_text || ""} />
      </div>

      <div className="flex gap-[16px]">
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setOpen({ id: "CREATE_REQUEST", value: false })}
        >
          Close
        </Button>

        <Button
          variant="destructive"
          className="w-full"
          onClick={() =>
            shareSheet({
              url: `${window.location.origin}/request/${request.id}`,
            })
          }
        >
          Share
        </Button>
      </div>
    </div>
  );
}
