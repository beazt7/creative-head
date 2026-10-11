import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";
import { Ambient } from "./components/Ambient";
import { MusicToggle } from "./components/MusicToggle";
import {
  Hero,
  Story,
  Evidence,
  Role,
  Authority,
  Contract,
  Letter,
  Offer,
  Epilogue,
} from "./components/InvitationSections";
import { Acceptance } from "./components/Acceptance";

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#story">
        Skip to the story
      </a>
      <motion.div
        className="reading-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <header className="site-header">
        <a
          className="wordmark"
          href="#home"
          aria-label="Kunjuoo and Meems, home"
        >
          <Heart size={18} fill="currentColor" aria-hidden="true" /> k
          <span>+</span>m
          <span className="wordmark-note">a beautiful collaboration</span>
        </a>
        <nav aria-label="Main navigation">
          <a className="nav-story" href="#letter">
            A little love letter
          </a>
          <MusicToggle />
          <a className="nav-offer" href="#offer">
            Your invitation <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
      </header>
      <main>
        <Hero />
        <Story />
        <Evidence />
        <Role />
        <Authority />
        <Contract />
        <Letter />
        <Offer />
        <Acceptance />
        <Epilogue />
      </main>
      <Ambient />
    </MotionConfig>
  );
}
