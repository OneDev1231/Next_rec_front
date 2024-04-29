import { Mode } from "../create-recc";
import { LottieWave } from "../lottie-wave";

export function CreateWaves({ mode }: { mode: Mode }) {
  return (
    <>
      {mode === "LISTENING" && <LottieWave />}

      {mode !== "LISTENING" && (
        <div className="h-[40px]">
          <img src={"/wave.svg"} alt="Recording" width={115} />
        </div>
      )}
    </>
  );
}
