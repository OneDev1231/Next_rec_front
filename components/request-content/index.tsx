export function RequestContent({ title }: { title: string }) {
  return (
    <div className="flex gap-[16px] items-center">
      <div className="flex flex-col ">
        <div className="font-sans text-xl text-stone-800">{title}</div>
      </div>
    </div>
  );
}
