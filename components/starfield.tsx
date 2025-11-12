"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  velocity: number;
};

const STAR_COUNT = 120;

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return () => undefined;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return () => undefined;
    }

    let animationFrame = 0;
    const stars: Star[] = [];

    const initializeStars = (width: number, height: number) => {
      stars.length = 0;
      for (let index = 0; index < STAR_COUNT; index += 1) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.2 + 0.2,
          velocity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const setCanvasSize = () => {
      const { innerWidth, innerHeight } = window;
      const devicePixelRatio = window.devicePixelRatio || 1;

      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(devicePixelRatio, devicePixelRatio);
      initializeStars(innerWidth, innerHeight);
    };

    const draw = () => {
      const { innerWidth, innerHeight } = window;
      context.clearRect(0, 0, innerWidth, innerHeight);

      const starColor =
        resolvedTheme === "light"
          ? "rgba(5, 5, 5, 0.8)"
          : "rgba(240, 240, 240, 0.85)";
      const glowColor =
        resolvedTheme === "light"
          ? "rgba(40, 40, 40, 0.08)"
          : "rgba(255, 255, 255, 0.08)";

      stars.forEach((star) => {
        context.beginPath();
        context.fillStyle = starColor;
        context.shadowColor = glowColor;
        context.shadowBlur = resolvedTheme === "light" ? 6 : 12;
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();

        star.y += star.velocity;
        if (star.y > innerHeight + 10) {
          star.y = -10;
          star.x = Math.random() * innerWidth;
        }
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    setCanvasSize();
    animationFrame = window.requestAnimationFrame(draw);

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70"
      aria-hidden
    />
  );
}
