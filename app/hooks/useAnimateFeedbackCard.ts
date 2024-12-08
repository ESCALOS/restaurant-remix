import { useAnimation } from "framer-motion";
import { useState } from "react";

export const useAnimateFeedbackCard = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();

  const animate = async (type: "success" | "error" | "warning" | "info") => {
    setIsAnimating(true);

    const feedbackStyles = {
      success: {
        scale: [1, 1.2, 1], // Más notorio
        opacity: [0, 1],
        backgroundColor: ["#ffffff", "#4caf50", "#ffffff"], // Verde más brillante
      },
      error: {
        x: [0, -15, 15, -15, 15, 0], // Sacudida más fuerte
        backgroundColor: ["#ffffff", "#f44336", "#ffffff"], // Rojo brillante
      },
      warning: {
        scale: [1, 1.1, 1], // Un pequeño rebote
        opacity: [0, 1],
        backgroundColor: ["#ffffff", "#ff9800", "#ffffff"], // Amarillo intenso
      },
      info: {
        opacity: [0, 1],
        y: [10, 0], // Se desliza hacia arriba
        backgroundColor: ["#ffffff", "#2196f3", "#ffffff"], // Azul brillante
      },
    };

    const animation = feedbackStyles[type];

    await controls.start({
      ...animation,
      transition: { duration: 0.6, ease: "easeOut", times: [0, 0.5, 1] },
    });

    setIsAnimating(false);
  };

  return { controls, isAnimating, animate };
};
