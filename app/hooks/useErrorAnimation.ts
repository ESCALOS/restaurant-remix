import { useAnimation } from "motion/react";
import { useState } from "react";

export const useErrorAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();

  const errorAnimation = async () => {
    setIsAnimating(true);
    await controls.start({
      x: [0, -10, 10, -10, 10, 0],
      backgroundColor: ["#ffffff", "#fee2e2", "#fee2e2", "#ffffff"],
      transition: { duration: 1, times: [0, 0.1, 0.5, 1] },
    });
    setIsAnimating(false);
  };

  return { controls, isAnimating, errorAnimation };
};
