import { HTMLAttributes } from "react";
import { Button } from "../ui/button";

export function StopButton(props: HTMLAttributes<HTMLDivElement>) {
  const { ...allProps } = props;

  return (
    <div
      className="flex justify-center items-center w-[60px] h-[60px] border-red-500 border-4 rounded-full"
      {...allProps}
    >
      <Button variant="destructive" className="rounded w-[30px] h-[30px]" />
    </div>
  );
}
