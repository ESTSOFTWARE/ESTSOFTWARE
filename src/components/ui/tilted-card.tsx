"use client";

import { useRef, useState, type CSSProperties, type FC, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, type SpringOptions } from "motion/react";
import { cn } from "@/lib/utils";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: CSSProperties["height"];
  containerWidth?: CSSProperties["width"];
  imageHeight?: CSSProperties["height"];
  imageWidth?: CSSProperties["width"];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
  className?: string;
  /** Clases extra para la imagen (útil para darle fondo a PNG transparentes). */
  imageClassName?: string;
  tooltipClassName?: string;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export const TiltedCard: FC<TiltedCardProps> = ({
  imageSrc,
  altText = "",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = false,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  className = "",
  imageClassName = "",
  tooltipClassName = "bg-background text-foreground border border-border",
}) => {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetXPosition = e.clientX - rect.left - rect.width / 2;
    const offsetYPosition = e.clientY - rect.top - rect.height / 2;
    const rotationXValue = (offsetYPosition / (rect.height / 2)) * -rotateAmplitude;
    const rotationYValue = (offsetXPosition / (rect.width / 2)) * rotateAmplitude;
    rotateX.set(rotationXValue);
    rotateY.set(rotationYValue);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    const velocityY = offsetYPosition - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetYPosition);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    if (showTooltip) opacity.set(1);
  }

  function handleMouseLeave() {
    if (showTooltip) opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
    setLastY(0);
  }

  return (
    <figure
      ref={ref}
      className={cn(
        "relative [perspective:800px] flex flex-col items-center justify-center",
        className
      )}
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 z-10 block rounded bg-background/80 p-2 text-center text-xs text-muted-foreground sm:hidden sm:text-sm">
          El efecto se aprecia mejor en escritorio.
        </div>
      )}

      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          loading="lazy"
          className={cn(
            "absolute top-0 left-0 h-full w-full rounded-[15px] object-cover will-change-transform [transform:translateZ(0)]",
            imageClassName
          )}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute inset-0 z-[2] flex items-center justify-center will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && captionText && (
        <motion.figcaption
          className={cn(
            "pointer-events-none absolute left-0 top-0 z-[3] hidden rounded-[4px] px-[10px] py-[4px] text-[10px] opacity-0 shadow-md sm:block",
            tooltipClassName
          )}
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
};

export default TiltedCard;
