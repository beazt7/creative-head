import { useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { site } from "../content";

export function MusicToggle() {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const available = Boolean(site.music.src) && !failed;
  const toggle = async () => {
    if (!available) return;
    if (playing) audio.current.pause();
    else {
      try {
        await audio.current.play();
      } catch {
        setFailed(true);
        setPlaying(false);
      }
    }
  };
  return (
    <>
      {site.music.src && (
        <audio
          ref={audio}
          src={`${import.meta.env.BASE_URL}${site.music.src}`}
          preload="none"
          loop
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setFailed(true);
            setPlaying(false);
          }}
        />
      )}
      <button
        type="button"
        className="icon-button music-button"
        aria-label={
          available
            ? playing
              ? "Pause music"
              : "Play music"
            : "Music unavailable until a track is added"
        }
        aria-pressed={playing}
        disabled={!available}
        title={
          available
            ? `${playing ? "Pause" : "Play"} ${site.music.title}`
            : "Soundtrack to come"
        }
        onClick={toggle}
      >
        {playing ? (
          <Music2 size={17} aria-hidden="true" />
        ) : (
          <VolumeX size={17} aria-hidden="true" />
        )}
      </button>
    </>
  );
}
