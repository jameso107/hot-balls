"use client";

import { useEffect, useRef, useState } from "react";

type IntroTransitionProps = {
  children: React.ReactNode;
};

const ROLL_DURATION_MS = 3000;
const DROP_DURATION_MS = 320;
const SLIDE_DURATION_MS = 3000;

export default function IntroTransition({ children }: IntroTransitionProps) {
  const [isSliding, setIsSliding] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setIsReady(true);
      return;
    }

    const sceneEl = sceneRef.current;
    const ballEl = ballRef.current;
    const holeEl = holeRef.current;
    if (!sceneEl || !ballEl || !holeEl) {
      setIsReady(true);
      return;
    }

    let rafId = 0;
    let done = false;
    let slideTimer = 0;

    const sceneRect = sceneEl.getBoundingClientRect();
    const ballRect = ballEl.getBoundingClientRect();
    const holeRect = holeEl.getBoundingClientRect();

    const startX = 0;
    const startY = 0;
    const endX = holeRect.left + holeRect.width / 2 - (ballRect.left + ballRect.width / 2);
    const endY = holeRect.top + holeRect.height / 2 - (ballRect.top + ballRect.height / 2);

    const controlX = endX * 0.55;
    const controlY = endY - Math.max(120, sceneRect.height * 0.18);

    const now = performance.now();

    const animate = (time: number) => {
      const elapsed = time - now;

      if (elapsed <= ROLL_DURATION_MS) {
        const t = Math.min(1, elapsed / ROLL_DURATION_MS);
        const oneMinus = 1 - t;

        const x =
          oneMinus * oneMinus * startX +
          2 * oneMinus * t * controlX +
          t * t * endX;
        const y =
          oneMinus * oneMinus * startY +
          2 * oneMinus * t * controlY +
          t * t * endY;
        const scale = 1 - t * 0.46;

        ballEl.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        ballEl.style.opacity = "1";
        rafId = window.requestAnimationFrame(animate);
        return;
      }

      const dropElapsed = elapsed - ROLL_DURATION_MS;
      if (dropElapsed <= DROP_DURATION_MS) {
        const t = Math.min(1, dropElapsed / DROP_DURATION_MS);
        const dropY = endY + t * 10;
        const scale = 0.54 + (0.04 - 0.54) * t;
        const opacity = t < 0.72 ? 1 : 1 - (t - 0.72) / 0.28;
        ballEl.style.transform = `translate(${endX}px, ${dropY}px) scale(${scale})`;
        ballEl.style.opacity = `${Math.max(0, opacity)}`;
        rafId = window.requestAnimationFrame(animate);
        return;
      }

      if (!done) {
        done = true;
        setIsSliding(true);
        slideTimer = window.setTimeout(() => setIsReady(true), SLIDE_DURATION_MS);
      }
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(slideTimer);
    };
  }, []);

  return (
    <>
      {!isReady && (
        <div
          className={`introOverlay${isSliding ? " introOverlaySlideUp" : ""}`}
          aria-label="Hot Balls golf intro animation"
        >
          <div className="introScene" aria-hidden="true" ref={sceneRef}>
            <div className="introSunGlow" />
            <div className="introSlope" />
            <div className="introFlag">
              <span />
            </div>
            <div className="introHole" ref={holeRef} />
            <div className="introBall" ref={ballRef} />
            <p className="introText">Hot Balls</p>
            <p className="introSubtext">
              Warm your golf balls. Keep your winter distance.
            </p>
          </div>
        </div>
      )}

      <div className={`siteShell${isReady ? " siteShellReady" : ""}`}>{children}</div>
    </>
  );
}
