'use client';

import './ContourField.scss';
import { useEffect, useRef } from 'react';

/**
 * Generative topographic field rendered with marching squares over
 * domain-warped fractal noise. The terrain deforms around the pointer,
 * and churns harder the faster the pointer moves. Renders a single
 * static frame when the user prefers reduced motion, and stops drawing
 * entirely while offscreen.
 */

const THRESHOLDS = 13; // contour levels
const ACCENT_LEVEL = 7; // which level gets the redline stroke
const POINTER_RADIUS = 60; // px reach of the cursor deformation
const POINTER_AMP = 0.32; // field units added at the cursor center
const WARP_STRENGTH = 0.45; // how much the noise field folds on itself

function hash2(x: number, y: number): number {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function valueNoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = smooth(x - ix);
  const fy = smooth(y - iy);

  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);

  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

function fbm(x: number, y: number): number {
  return (
    valueNoise(x, y) * 0.55 +
    valueNoise(x * 2.13 + 31.7, y * 2.13 + 11.3) * 0.3 +
    valueNoise(x * 4.41 + 67.1, y * 4.41 + 47.9) * 0.15
  );
}

function ContourField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let width = 0;
    let height = 0;
    let cell = 15;
    let cols = 0;
    let rows = 0;
    let field = new Float32Array(0);

    let rafId = 0;
    let running = false;
    let visible = true;
    let frame = 0;

    let inkColor = 'rgb(20, 20, 20)';
    let accentColor = 'rgb(255, 77, 0)';

    // pointer position eases toward its target; `energy` spikes with
    // pointer speed and decays, driving the strength of the deformation
    const pointer = {
      x: -9999,
      y: -9999,
      tx: -9999,
      ty: -9999,
      strength: 0,
      targetStrength: 0,
      energy: 0,
      lastX: 0,
      lastY: 0,
      lastT: 0,
    };

    const readColors = () => {
      const styles = getComputedStyle(document.body);
      inkColor = styles.getPropertyValue('--color-text').trim() || inkColor;
      accentColor =
        styles.getPropertyValue('--color-redline').trim() || accentColor;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // coarser sampling on narrow (likely lower-powered) viewports
      cell = width < 640 ? 18 : 14;
      cols = Math.ceil(width / cell) + 1;
      rows = Math.ceil(height / cell) + 1;
      field = new Float32Array(cols * rows);
      readColors();
    };

    const computeField = (t: number) => {
      const scale = 0.0028;
      const px = pointer.x;
      const py = pointer.y;
      const radius = POINTER_RADIUS * (1 + pointer.energy * 0.6);
      const sigma2 = 2 * radius * radius;
      const amp = POINTER_AMP * (pointer.strength + pointer.energy);

      for (let j = 0; j < rows; j++) {
        const y = j * cell;
        const ny = y * scale;
        for (let i = 0; i < cols; i++) {
          const x = i * cell;
          const nx = x * scale;

          // domain warp: fold the field through itself so contours
          // meander instead of forming round noise blobs
          const qx = valueNoise(nx * 0.9 + t * 0.014, ny * 0.9 - t * 0.011);
          const qy = valueNoise(
            nx * 0.9 + 52.4 - t * 0.012,
            ny * 0.9 + 97.6 + t * 0.013,
          );

          let v = fbm(
            nx + WARP_STRENGTH * qx + t * 0.016,
            ny + WARP_STRENGTH * qy + t * 0.01,
          );

          if (amp > 0.001) {
            const dx = x - px;
            const dy = y - py;
            const d2 = dx * dx + dy * dy;
            if (d2 < sigma2 * 4) {
              v += amp * Math.exp(-d2 / sigma2);
            }
          }

          field[j * cols + i] = v;
        }
      }
    };

    // marching squares with linear interpolation along cell edges
    const traceLevel = (threshold: number) => {
      ctx.beginPath();

      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = field[j * cols + i]; // top-left
          const b = field[j * cols + i + 1]; // top-right
          const c = field[(j + 1) * cols + i + 1]; // bottom-right
          const d = field[(j + 1) * cols + i]; // bottom-left

          let caseId = 0;
          if (a > threshold) caseId |= 8;
          if (b > threshold) caseId |= 4;
          if (c > threshold) caseId |= 2;
          if (d > threshold) caseId |= 1;
          if (caseId === 0 || caseId === 15) continue;

          const x = i * cell;
          const y = j * cell;

          const top = () => [x + cell * ((threshold - a) / (b - a)), y];
          const right = () => [
            x + cell,
            y + cell * ((threshold - b) / (c - b)),
          ];
          const bottom = () => [
            x + cell * ((threshold - d) / (c - d)),
            y + cell,
          ];
          const left = () => [x, y + cell * ((threshold - a) / (d - a))];

          let segments: number[][][];
          switch (caseId) {
            case 1:
            case 14:
              segments = [[left(), bottom()]];
              break;
            case 2:
            case 13:
              segments = [[bottom(), right()]];
              break;
            case 3:
            case 12:
              segments = [[left(), right()]];
              break;
            case 4:
            case 11:
              segments = [[top(), right()]];
              break;
            case 5:
              segments = [
                [left(), top()],
                [bottom(), right()],
              ];
              break;
            case 6:
            case 9:
              segments = [[top(), bottom()]];
              break;
            case 7:
            case 8:
              segments = [[left(), top()]];
              break;
            case 10:
              segments = [
                [top(), right()],
                [left(), bottom()],
              ];
              break;
            default:
              continue;
          }

          for (const [[x1, y1], [x2, y2]] of segments) {
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
        }
      }

      ctx.stroke();
    };

    const draw = (t: number) => {
      computeField(t);
      ctx.clearRect(0, 0, width, height);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      for (let level = 0; level < THRESHOLDS; level++) {
        const threshold = 0.16 + (level / (THRESHOLDS - 1)) * 0.68;
        if (level === ACCENT_LEVEL) {
          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = 0.45;
          ctx.lineWidth = 1.4;
        } else {
          ctx.strokeStyle = inkColor;
          // deeper levels fade out — reads as elevation
          ctx.globalAlpha = 0.05 + (level / (THRESHOLDS - 1)) * 0.16;
          ctx.lineWidth = 1;
        }
        traceLevel(threshold);
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!running) return;
      frame += 1;

      pointer.x += (pointer.tx - pointer.x) * 0.09;
      pointer.y += (pointer.ty - pointer.y) * 0.09;
      pointer.strength += (pointer.targetStrength - pointer.strength) * 0.06;
      pointer.energy *= 0.94;

      if (frame % 90 === 0) readColors();

      draw(frame / 60);
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();

      if (pointer.lastT > 0) {
        const dt = Math.max(now - pointer.lastT, 1);
        const dist = Math.hypot(x - pointer.lastX, y - pointer.lastY);
        const speed = dist / dt; // px per ms
        pointer.energy = Math.min(pointer.energy + speed * 0.18, 1.4);
      }

      pointer.lastX = x;
      pointer.lastY = y;
      pointer.lastT = now;
      pointer.tx = x;
      pointer.ty = y;
      pointer.targetStrength = 1;
    };

    const handlePointerLeave = () => {
      pointer.targetStrength = 0;
      pointer.lastT = 0;
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };

    resize();

    if (reducedMotion) {
      draw(17.3); // arbitrary fixed time — a pleasant static terrain
    } else {
      start();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw(17.3);
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!reducedMotion) {
          if (visible && !document.hidden) start();
          else stop();
        }
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    const section = canvas.parentElement;
    section?.addEventListener('pointermove', handlePointerMove);
    section?.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      section?.removeEventListener('pointermove', handlePointerMove);
      section?.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="contour-field" aria-hidden />;
}

export default ContourField;
