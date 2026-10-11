import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { imageUrl, photos } from "../content";
import { Reveal } from "./Primitives";

export function PhotoGallery() {
  const dialog = useRef(null);
  const [selected, setSelected] = useState(0);
  const [offset, setOffset] = useState(0);
  const move = (direction) =>
    setSelected(
      (current) => (current + direction + photos.length) % photos.length,
    );
  const open = (index) => {
    setSelected(index);
    dialog.current.showModal();
  };
  const visible = Array.from(
    { length: 5 },
    (_, index) => (index + offset) % photos.length,
  );
  return (
    <Reveal className="memory-gallery">
      <div className="gallery-heading">
        <p className="eyebrow">The very best part of all this? Us.</p>
        <div className="gallery-controls">
          <button
            className="icon-button"
            type="button"
            title="Previous photos"
            aria-label="Previous photos"
            onClick={() =>
              setOffset(
                (current) => (current - 5 + photos.length) % photos.length,
              )
            }
          >
            <ArrowLeft size={17} />
          </button>
          <button
            className="icon-button"
            type="button"
            title="Next photos"
            aria-label="Next photos"
            onClick={() =>
              setOffset((current) => (current + 5) % photos.length)
            }
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
      <div className="photo-strip">
        {visible.map((index, position) => (
          <button
            className={`memory-photo memory-photo-${position}`}
            key={photos[index].name}
            type="button"
            aria-label={`Open photo ${index + 1}: ${photos[index].alt}`}
            onClick={() => open(index)}
          >
            <img
              src={imageUrl(photos[index].name)}
              alt={photos[index].alt}
              loading="lazy"
              width="280"
              height="340"
            />
            <span className="photo-expand">
              <Expand size={15} aria-hidden="true" />
            </span>
            <span className="photo-number">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(photos.length).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-label="Our photo collection"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
      >
        <div className="lightbox-inner">
          <button
            type="button"
            className="icon-button lightbox-close"
            title="Close photo"
            aria-label="Close photo"
            onClick={() => dialog.current.close()}
          >
            <X size={22} />
          </button>
          <img
            src={imageUrl(photos[selected].name)}
            alt={photos[selected].alt}
            width="1000"
            height="1200"
          />
          <div className="lightbox-footer">
            <button
              type="button"
              className="icon-button"
              title="Previous photo"
              aria-label="Previous photo"
              onClick={() => move(-1)}
            >
              <ArrowLeft size={20} />
            </button>
            <p aria-live="polite">
              {photos[selected].caption}
              <span>
                {selected + 1} / {photos.length}
              </span>
            </p>
            <button
              type="button"
              className="icon-button"
              title="Next photo"
              aria-label="Next photo"
              onClick={() => move(1)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </dialog>
    </Reveal>
  );
}
