import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  Code2,
  Eye,
  Fingerprint,
  Heart,
  Layers3,
  Palette,
  PenTool,
  ScanEye,
  Sparkles,
  Type,
} from "lucide-react";
import { chapters, exhibits, benefits, letter, site } from "../content";
import { Photo, Reveal, SectionHeading, TiltCard } from "./Primitives";
import { PhotoGallery } from "./PhotoGallery";

export function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 900], [0, 95]);
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-wash" aria-hidden="true" />
      <motion.div
        className="hero-photo hero-photo-left"
        style={{ y: reduced ? 0 : photoY }}
        initial={reduced ? false : { opacity: 0, rotate: -12 }}
        animate={{ opacity: 1, rotate: -8 }}
        transition={{ duration: 1.2, delay: 0.25 }}
      >
        <Photo name="photo1" priority />
        <span>better, together.</span>
      </motion.div>
      <motion.div
        className="hero-photo hero-photo-right"
        initial={reduced ? false : { opacity: 0, rotate: 12, y: 25 }}
        animate={{ opacity: 1, rotate: 7, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <Photo name="IMG_2505" priority />
        <span>the creative genius.</span>
      </motion.div>
      <div className="hero-content">
        <Reveal>
          <p className="hero-kicker">
            <span className="status-dot" /> A personal invitation, made just for
            you
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 id="hero-title">
            Every Great Project
            <br className="desktop-break" /> Needs a{" "}
            <em>
              Creative
              <br className="desktop-break" /> Genius.
            </em>
            <span className="hero-sparkle" aria-hidden="true">
              <Sparkles />
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="hero-subtitle">
            I built the websites.
            <br className="mobile-break" /> You gave them personality.
          </p>
          <p className="hero-dedication">
            For Aamu. My favourite perspective on everything.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <a className="button button-primary" href="#story">
            There is something I want to ask you{" "}
            <ArrowDownRight size={18} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
      <div className="hero-bottom">
        <span>A little official. A lot from the heart.</span>
        <a
          href="#story"
          className="scroll-cue"
          aria-label="Continue to our story"
        >
          <span>The story of us, creating</span>
          <ArrowDown size={17} aria-hidden="true" />
        </a>
        <span>
          From Kunjuoo, with love <Heart size={12} aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}

export function Story() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const chapter = chapters[active];
  return (
    <section
      className="section story-section"
      id="story"
      aria-labelledby="story-title"
    >
      <div className="container">
        <SectionHeading
          number="01"
          eyebrow="How we got here"
          title={
            <span id="story-title">
              First came the code.
              <br />
              Then came <em>you.</em>
            </span>
          }
        >
          Some things start as side projects. The beautiful ones become
          something more.
        </SectionHeading>
        <div className="story-layout">
          <Reveal className="chapter-list">
            <div
              role="tablist"
              aria-label="Chapters of our story"
              aria-orientation="vertical"
            >
              {chapters.map((entry, index) => (
                <button
                  id={`chapter-${index}`}
                  key={entry.number}
                  className={`chapter-tab ${active === index ? "is-active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-controls="chapter-panel"
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    let next = index;
                    if (event.key === "ArrowDown")
                      next = (index + 1) % chapters.length;
                    else if (event.key === "ArrowUp")
                      next = (index - 1 + chapters.length) % chapters.length;
                    else if (event.key === "Home") next = 0;
                    else if (event.key === "End") next = chapters.length - 1;
                    else return;
                    event.preventDefault();
                    setActive(next);
                    document.getElementById(`chapter-${next}`).focus();
                  }}
                >
                  <span className="chapter-number">{entry.number}</span>
                  <span>{entry.label}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
            <p className="story-aside">
              <Code2 size={18} aria-hidden="true" /> My code. Your vision. Our
              story.
            </p>
          </Reveal>
          <div
            id="chapter-panel"
            className="chapter-panel"
            role="tabpanel"
            aria-labelledby={`chapter-${active}`}
            tabIndex={0}
          >
            <AnimatePresence mode="wait">
              <motion.div
                className="chapter-content"
                key={active}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="chapter-copy">
                  <span className="mini-label">Chapter {chapter.number}</span>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.text}</p>
                </div>
                <figure className="chapter-image">
                  <Photo name={chapter.photo} />
                  <figcaption>{chapter.note}</figcaption>
                </figure>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <PhotoGallery />
      </div>
    </section>
  );
}

export function Evidence() {
  return (
    <section className="section evidence-section" id="evidence">
      <div className="container">
        <SectionHeading
          number="02"
          eyebrow="A very convincing case"
          title={
            <>
              Exhibits A through <em>Infinity.</em>
            </>
          }
        >
          The evidence is rather overwhelming, Meemu.
        </SectionHeading>
        <div className="evidence-grid">
          {exhibits.map((exhibit, index) => (
            <Reveal delay={index * 0.08} key={exhibit.letter}>
              <TiltCard className={`exhibit-card exhibit-${index}`}>
                <div className="exhibit-top">
                  <span>Exhibit {exhibit.letter}</span>
                  <span className="exhibit-letter">{exhibit.letter}</span>
                </div>
                <h3>
                  {exhibit.title}
                  <br />
                  <em>{exhibit.quote}</em>
                </h3>
                <p>{exhibit.note}</p>
                <span className="exhibit-mark" aria-hidden="true">
                  {index === 3 ? <Heart size={22} /> : <CheckCheck size={22} />}
                </span>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="evidence-verdict">
          <span className="mini-label">The verdict</span>
          <p>
            You were never <em>just giving feedback.</em>
            <br />
            You were already shaping the vision.
          </p>
          <span className="stamp">
            CREATIVE GENIUS
            <br />
            CONFIRMED <Check size={13} />
          </span>
        </Reveal>
      </div>
    </section>
  );
}

const responsibilities = [
  {
    icon: Palette,
    title: "Creative Direction",
    text: "Set the feeling. Shape the vision. Make it unmistakably ours.",
  },
  {
    icon: Fingerprint,
    title: "Visual Identity",
    text: "Give every idea a personality worth remembering.",
  },
  {
    icon: Layers3,
    title: "UI Excellence",
    text: "The right details, in exactly the right places.",
  },
  {
    icon: ScanEye,
    title: "Design Reviews",
    text: "Your honest eye. My complete attention.",
  },
  {
    icon: Eye,
    title: "User Experience Decisions",
    text: "Not just how it looks. How it feels to be there.",
  },
  {
    icon: PenTool,
    title: "Branding Strategy",
    text: "A point of view that runs through everything.",
  },
];

export function Role() {
  return (
    <section className="section role-section" id="role">
      <div className="container">
        <div className="role-heading">
          <SectionHeading
            number="03"
            eyebrow="A title that already fits"
            title={
              <>
                Creative <em>Head.</em>
              </>
            }
          >
            Not a job application. An invitation to own the vision.
          </SectionHeading>
          <Reveal className="role-badge">
            <Sparkles size={18} />
            <span>
              One position.
              <br />
              <strong>One very obvious choice.</strong>
            </span>
          </Reveal>
        </div>
        <div className="role-grid">
          {responsibilities.map((item, index) => (
            <Reveal className="role-item" delay={index * 0.05} key={item.title}>
              <item.icon size={25} strokeWidth={1.4} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="role-footnote">
          <Sparkles size={17} aria-hidden="true" />
          <p>And, naturally, making everything prettier than I could.</p>
          <span>You have a gift, Meems.</span>
        </Reveal>
      </div>
    </section>
  );
}

export function Authority() {
  return (
    <section className="section authority-section" id="authority">
      <div className="container">
        <SectionHeading
          number="04"
          eyebrow="With great taste comes great power"
          title={
            <>
              Authority <em>Granted.</em>
            </>
          }
        >
          Your creative judgment is not a suggestion box. It is the direction.
        </SectionHeading>
        <div className="benefits-grid">
          {benefits.map(([title, text], index) => (
            <Reveal className="benefit" delay={index * 0.06} key={title}>
              <span className="benefit-check">
                <Check size={17} aria-hidden="true" />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="authority-note">
          <Type size={19} aria-hidden="true" />
          <span>
            Yes, this includes telling me that my favourite font is terrible.
          </span>
          <Heart size={16} aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}

export function Contract() {
  return (
    <section className="section contract-section" id="trust">
      <div className="container contract-layout">
        <SectionHeading
          number="05"
          eyebrow="The part I mean most"
          title={
            <>
              A contract
              <br />
              of <em>trust.</em>
            </>
          }
        >
          No fine print.
          <br />
          Just a few things I want you to know.
        </SectionHeading>
        <Reveal className="agreement">
          <div className="agreement-top">
            <span>Our future adventures</span>
            <Heart size={18} aria-hidden="true" />
          </div>
          <p className="mini-label">A declaration of creative trust</p>
          <h3>
            Made in good faith.
            <br />
            <em>And a whole lot of love.</em>
          </h3>
          <ol className="trust-clauses">
            <li>
              <span>01</span> I trust your creative instincts.
            </li>
            <li>
              <span>02</span> Your ideas deserve a place in everything I build.
            </li>
            <li>
              <span>03</span> This role comes with complete creative autonomy.
            </li>
          </ol>
          <div className="mission">
            <span className="mini-label">Our shared mission</span>
            <p>
              Build beautiful things <em>together.</em>
            </p>
          </div>
          <div className="signatures">
            <div>
              <span className="signature">Kunjuoo</span>
              <span>The one with the code</span>
            </div>
            <div>
              <span className="signature signature-pending">Aamu</span>
              <span>The one with the vision</span>
            </div>
          </div>
          <p className="agreement-bottom">
            Offered wholeheartedly. Yours to accept, in your own time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Letter() {
  return (
    <section className="section letter-section" id="letter">
      <div className="container">
        <Reveal>
          <p className="eyebrow">
            <span>06</span> Beyond the title
          </p>
        </Reveal>
        <div className="letter-layout">
          <Reveal className="letter-photo">
            <figure>
              <Photo name="photo2" />
              <figcaption>
                My favourite person.
                <br />
                My favourite partnership.
              </figcaption>
            </figure>
            <span className="letter-photo-note">for all that comes next.</span>
          </Reveal>
          <Reveal className="letter-copy">
            <h2>
              A little letter,
              <br />
              <em>just for you.</em>
            </h2>
            <p className="salutation">My Aamu,</p>
            {letter.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="letter-signoff">
              <p>With all my love, and all my trust,</p>
              <span className="signature">{site.sender}</span>
              <Heart size={19} aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const offerDetails = [
  ["Position", "Creative Head"],
  ["Duration", "Forever"],
  ["Starting Date", "Immediately"],
  ["Creative Authority", "Unlimited"],
  ["Salary", "Endless Appreciation"],
  ["Bonus", "Front Row Access To Every New Idea"],
];

export function Offer() {
  return (
    <section className="section offer-section" id="offer">
      <div className="container">
        <SectionHeading
          number="07"
          eyebrow="Consider this the official offer"
          light
          title={
            <>
              Will You Officially Become
              <br />
              My <em>Creative Head?</em>
            </>
          }
        >
          Aamu. Meemu. Meems. Only you.
        </SectionHeading>
        <Reveal className="offer-document">
          <div className="offer-document-header">
            <div>
              <span className="mini-label">A most personal appointment</span>
              <h3>Your next chapter.</h3>
            </div>
            <div className="offer-seal">
              <Heart size={23} fill="currentColor" aria-hidden="true" />
              <span>K + M</span>
            </div>
          </div>
          <dl className="offer-details">
            {offerDetails.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  {value}
                  {value === "Forever" && (
                    <span aria-hidden="true"> &infin;</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="offer-document-footer">
            <span>
              <span className="status-dot" /> Made for you. Nobody else.
            </span>
            <ArrowDown size={17} aria-hidden="true" />
          </div>
        </Reveal>
        <Reveal className="offer-whisper">
          <p>
            The title is Creative Head.
            <br />
            The real offer is{" "}
            <em>building a life full of beautiful things together.</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Epilogue() {
  return (
    <footer className="epilogue" id="epilogue">
      <Reveal>
        <Heart
          className="epilogue-heart"
          size={27}
          strokeWidth={1.2}
          aria-hidden="true"
        />
        <p>
          Built with code.
          <br />
          Improved with creativity.
          <br />
          <em>Made possible by us.</em>
        </p>
        <span className="epilogue-note">
          Kunjuoo + Meems · Our future adventures
        </span>
      </Reveal>
      <div className="footer-line">
        <span>A little side project. A very big feeling.</span>
        <a href="#home" aria-label="Back to the beginning">
          Back to the beginning <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
