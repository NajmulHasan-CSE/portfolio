import { useEffect, useRef } from 'react';

const interactiveSelector = 'a, button, input, textarea, select, [role="button"]';

export default function CursorFollower() {
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: null, y: null, targetX: 0, targetY: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!cursor || !finePointer.matches || reducedMotion.matches) return undefined;

    const animate = () => {
      const position = positionRef.current;
      const x = position.x ?? position.targetX;
      const y = position.y ?? position.targetY;
      const nextX = x + (position.targetX - x) * 0.2;
      const nextY = y + (position.targetY - y) * 0.2;

      position.x = nextX;
      position.y = nextY;
      cursor.style.setProperty('--cursor-x', `${nextX}px`);
      cursor.style.setProperty('--cursor-y', `${nextY}px`);

      if (Math.abs(position.targetX - nextX) > 0.2 || Math.abs(position.targetY - nextY) > 0.2) {
        frameRef.current = window.requestAnimationFrame(animate);
      } else {
        position.x = position.targetX;
        position.y = position.targetY;
        cursor.style.setProperty('--cursor-x', `${position.targetX}px`);
        cursor.style.setProperty('--cursor-y', `${position.targetY}px`);
        frameRef.current = 0;
      }
    };

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      const position = positionRef.current;
      position.targetX = event.clientX;
      position.targetY = event.clientY;
      cursor.classList.add('is-visible');

      if (position.x === null || position.y === null) {
        position.x = event.clientX;
        position.y = event.clientY;
      }

      if (!frameRef.current) frameRef.current = window.requestAnimationFrame(animate);
    };

    const onPointerOver = (event) => {
      if (event.target instanceof Element && event.target.closest(interactiveSelector)) {
        cursor.classList.add('is-hovering');
      }
    };

    const onPointerOut = (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest(interactiveSelector) &&
        !(event.relatedTarget instanceof Element && event.relatedTarget.closest(interactiveSelector))
      ) {
        cursor.classList.remove('is-hovering');
      }
    };

    const onPointerLeave = () => {
      cursor.classList.remove('is-visible', 'is-hovering');
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      positionRef.current.x = null;
      positionRef.current.y = null;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <span ref={cursorRef} className="cursor-follower" aria-hidden="true" />;
}
