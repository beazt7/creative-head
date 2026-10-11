import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { imageUrl, photos } from "../content";

export function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  children,
  light = false,
}) {
  return (
    <Reveal className={`section-heading ${light ? "heading-light" : ""}`}>
      <p className="eyebrow">
        <span>{number}</span> {eyebrow}
      </p>
      <h2>{title}</h2>
      {children && <p className="section-intro">{children}</p>}
    </Reveal>
  );
}

export function Photo({ name, className = "", priority = false, ...props }) {
  const photo = photos.find((entry) => entry.name === name);
  return (
    <img
      src={imageUrl(name)}
      alt={photo?.alt ?? "A photograph of us"}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      width="700"
      height="900"
      {...props}
    />
  );
}

export function TiltCard({ children, className = "" }) {
  const reduced = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(tiltY, { stiffness: 180, damping: 22 });
  const handleMove = (event) => {
    if (reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    tiltX.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
    tiltY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 8);
  };
  const reset = () => {
    tiltX.set(0);
    tiltY.set(0);
  };
  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
