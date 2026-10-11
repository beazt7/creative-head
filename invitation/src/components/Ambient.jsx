import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export function Ambient() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div className="ambient" aria-hidden="true">
      {Array.from({ length: 7 }, (_, index) => (
        <motion.span
          key={index}
          style={{
            left: `${8 + index * 14}%`,
            top: `${16 + ((index * 17) % 70)}%`,
          }}
          animate={{
            y: [0, -22, 0],
            opacity: [0.08, 0.2, 0.08],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: 7 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
        >
          {index % 3 === 0 ? <Heart size={12} /> : <Sparkles size={10} />}
        </motion.span>
      ))}
    </div>
  );
}
