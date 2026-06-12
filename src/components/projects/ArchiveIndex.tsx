'use client';

import './ArchiveIndex.scss';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export type ArchiveEntry = {
  id: string;
  number: string;
  name: string;
  type?: string | null;
  materials: string[];
  href: string;
  previewSrc: string;
  previewWidth?: number;
  previewHeight?: number;
};

/**
 * Archive index — additional works presented as catalog entries rather
 * than a thumbnail grid. On hover-capable devices a floating "plate"
 * preview trails the cursor; rows stay plain links everywhere else,
 * so the preview is pure progressive enhancement.
 */
function ArchiveIndex({ entries }: { entries: ArchiveEntry[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [canPreview, setCanPreview] = useState(false);
  const plateRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    const update = () => setCanPreview(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!canPreview || activeIdx === null) return;

    const ease = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.16;
      p.y += (p.ty - p.y) * 0.16;
      const plate = plateRef.current;
      if (plate) {
        plate.style.transform = `translate3d(${p.x + 24}px, ${p.y - 40}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(ease);
    };
    rafRef.current = requestAnimationFrame(ease);
    return () => cancelAnimationFrame(rafRef.current);
  }, [canPreview, activeIdx]);

  const handlePointerMove = (e: React.PointerEvent) => {
    pos.current.tx = e.clientX;
    pos.current.ty = e.clientY;
  };

  const handleEnter = (idx: number) => (e: React.PointerEvent) => {
    // snap to the cursor on entry so the plate doesn't fly across the page
    pos.current.x = pos.current.tx = e.clientX;
    pos.current.y = pos.current.ty = e.clientY;
    setActiveIdx(idx);
  };

  const active = activeIdx !== null ? entries[activeIdx] : null;

  return (
    <div className="archive" onPointerMove={handlePointerMove}>
      <ol className="archive__list">
        {entries.map((entry, idx) => (
          <li className="archive__row" key={entry.id}>
            <Link
              href={entry.href}
              className="archive__link"
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={handleEnter(idx)}
              onPointerLeave={() => setActiveIdx(null)}
              onFocus={() => setActiveIdx(null)}
            >
              <span className="archive__no" aria-hidden>
                {entry.number}
              </span>
              <span className="archive__name">{entry.name}</span>
              <span className="archive__type">{entry.type}</span>
              <span className="archive__materials">
                {entry.materials.join(' · ')}
              </span>
              <svg
                className="archive__arrow"
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="round"
              >
                <path d="M7 7l9.2 9.2M17 7v10H7" transform="rotate(-90 12 12)" />
              </svg>
            </Link>
          </li>
        ))}
      </ol>

      {canPreview && active && (
        <div className="archive__plate" ref={plateRef} aria-hidden>
          <img
            src={active.previewSrc}
            alt=""
            width={active.previewWidth}
            height={active.previewHeight}
            loading="eager"
          />
          <span className="archive__plate-caption">
            plate {active.number} — {active.name}
          </span>
        </div>
      )}
    </div>
  );
}

export default ArchiveIndex;
