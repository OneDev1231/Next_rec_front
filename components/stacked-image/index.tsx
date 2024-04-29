export function StackedImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div
      className="relative w-[54px] h-[80px] bg-stone-300 rounded shrink-0"
      style={{ boxShadow: "0 0 8px 0 #44403C12" }}
    >
      <div
        style={{
          backgroundImage: `url("${imageUrl}")`,
          boxShadow: "0 0 8px 0 #44403C12",
        }}
        className={`absolute top-[-4px] right-[-4px] w-[54px] h-[80px] rounded bg-cover bg-center bg-no-repeat shrink-0`}
      />
    </div>
  );
}
