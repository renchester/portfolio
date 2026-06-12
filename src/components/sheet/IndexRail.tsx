'use client';

import './IndexRail.scss';
import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero-section', index: '01', label: 'Intro' },
  { id: 'about', index: '02', label: 'About' },
  { id: 'experience', index: '03', label: 'Experience' },
  { id: 'projects', index: '04', label: 'Projects' },
  { id: 'contact', index: '05', label: 'Contact' },
];

// Scroll-spy section index, pinned to the right edge of the sheet.
function IndexRail() {
  const [activeId, setActiveId] = useState('hero-section');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      // a narrow band around the viewport's vertical center
      { rootMargin: '-45% 0px -45% 0px' },
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="rail" aria-label="Section index">
      <ul className="rail__list">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="rail__link"
              data-active={activeId === section.id}
              aria-current={activeId === section.id ? 'true' : undefined}
            >
              <span className="rail__label">{section.label}</span>
              <span className="rail__index">{section.index}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default IndexRail;
