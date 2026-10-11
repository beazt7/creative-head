import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, PartyPopper, RotateCcw, Sparkles } from "lucide-react";
import { Reveal } from "./Primitives";

function focusSuccessHeading(element) {
  element?.focus({ preventScroll: true });
}

export function Acceptance() {
  const [accepted, setAccepted] = useState(false);
  const [enthusiastic, setEnthusiastic] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [celebrationId, setCelebrationId] = useState(0);
  const reduced = useReducedMotion();
  const generation = useRef(0);

  const celebrate = async (extra = enthusiastic) => {
    const current = ++generation.current;
    if (reduced) return;
    setCelebrationId(current);
    setCelebrating(true);
    try {
      const { default: confetti } = await import("canvas-confetti");
      if (current !== generation.current) return;
      const colors = ["#be6483", "#b2a0d5", "#efc7d3", "#7a4a85", "#e6c580"];
      confetti({
        particleCount: extra ? 150 : 95,
        spread: 85,
        origin: { y: 0.68 },
        colors,
        disableForReducedMotion: true,
        zIndex: 60,
      });
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors,
        disableForReducedMotion: true,
        zIndex: 60,
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.7 },
        colors,
        disableForReducedMotion: true,
        zIndex: 60,
      });
    } catch {
      setCelebrating(true);
    }
  };

  const accept = (extra) => {
    if (accepted) return;
    setEnthusiastic(extra);
    setAccepted(true);
    celebrate(extra);
  };

  return (
    <section
      className={`section acceptance-section ${accepted ? "accepted" : ""}`}
      id="acceptance"
      aria-labelledby="acceptance-title"
    >
      <div className="container acceptance-inner">
        <Reveal>
          <p className="eyebrow">
            <span>08</span> The beginning of something beautiful
          </p>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div
            key={accepted ? "yes" : "offer"}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onAnimationComplete={() => {
              if (accepted)
                document
                  .getElementById("acceptance-title")
                  ?.focus({ preventScroll: true });
            }}
          >
            {!accepted ? (
              <>
                <Heart
                  className="acceptance-icon"
                  size={36}
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
                <h2 id="acceptance-title">
                  So, Meems.
                  <br />
                  <em>Shall we make it official?</em>
                </h2>
                <p className="acceptance-subtitle">
                  Two ways to say yes. One very happy Kunjuoo.
                </p>
                <div className="acceptance-buttons">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => accept(false)}
                  >
                    Accept Position <span aria-hidden="true">💖</span>
                  </button>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => accept(true)}
                  >
                    Accept Position Enthusiastically{" "}
                    <span aria-hidden="true">✨</span>
                  </button>
                </div>
                <p className="acceptance-footnote">
                  An invitation, never an obligation. Always at your pace.
                </p>
              </>
            ) : (
              <div className="success-message">
                <span className="success-emblem">
                  <Heart size={35} fill="currentColor" aria-hidden="true" />
                </span>
                <h2
                  id="acceptance-title"
                  ref={focusSuccessHeading}
                  tabIndex={-1}
                >
                  Congratulations,
                  <br />
                  <em>Creative Head!</em>
                </h2>
                <p role="status">
                  You are now officially the Creative Head of all current and
                  future adventures.
                </p>
                <p className="success-personal">
                  Your vision. My code. Our beautiful, endless possibilities.
                </p>
                <span className="success-signature">
                  Welcome to forever, Aamu. - Kunjuoo
                </span>
                <button
                  className="button button-secondary replay-button"
                  type="button"
                  onClick={() => celebrate()}
                >
                  <RotateCcw size={16} aria-hidden="true" /> Celebrate again{" "}
                  <PartyPopper size={17} aria-hidden="true" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {celebrating && !reduced && (
        <div className="celebration-hearts" aria-hidden="true">
          {Array.from({ length: 14 }, (_, index) => (
            <motion.span
              key={`${celebrationId}-${index}`}
              style={{ left: `${5 + index * 7}%` }}
              initial={{ opacity: 0, y: 60, scale: 0.6 }}
              animate={{
                opacity: [0, 0.6, 0],
                y: -450,
                rotate: index % 2 ? 20 : -20,
                scale: 1.2,
              }}
              transition={{ duration: 3.2, delay: index * 0.07 }}
              onAnimationComplete={() => {
                if (index === 13) setCelebrating(false);
              }}
            >
              <Heart size={18 + (index % 4) * 6} fill="currentColor" />
            </motion.span>
          ))}
          <Sparkles className="celebration-sparkle" size={28} />
        </div>
      )}
    </section>
  );
}
