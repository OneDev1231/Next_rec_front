import Lottie from "react-lottie";
import * as lottieAnimationData from "../../public/recc-animated-wave-no-text.json";

export function LottieWave() {
  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="origin-top scale-[.6] translate-y-[-10px] h-[40px]">
      <Lottie options={defaultLottieOptions} width={226} height={66} />
    </div>
  );
}
