import { useEffect, useRef, useState } from "react";

interface UseDynamicFontSizeProps {
  value: string;
  maxFontSize?: number;
  minFontSize?: number;
  containerWidth?: number;
}

export function useDynamicFontSize({
  value,
  maxFontSize = 48,
  minFontSize = 24,
  containerWidth,
}: UseDynamicFontSizeProps) {
  const [fontSize, setFontSize] = useState(maxFontSize);
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    const availableWidth = containerWidth || element.offsetWidth;

    const tempElement = document.createElement("span");
    tempElement.style.visibility = "hidden";
    tempElement.style.position = "absolute";
    tempElement.style.whiteSpace = "nowrap";
    tempElement.style.fontFamily = getComputedStyle(element).fontFamily;
    tempElement.style.fontWeight = getComputedStyle(element).fontWeight;
    tempElement.style.fontSize = `${maxFontSize}px`;
    tempElement.textContent = value || "0";

    document.body.appendChild(tempElement);

    let currentFontSize = maxFontSize;
    const padding = 20;

    while (currentFontSize > minFontSize) {
      tempElement.style.fontSize = `${currentFontSize}px`;
      const textWidth = tempElement.offsetWidth;

      if (textWidth <= availableWidth - padding) {
        break;
      }

      currentFontSize -= 2;
    }

    document.body.removeChild(tempElement);
    setFontSize(Math.max(currentFontSize, minFontSize));
  }, [value, maxFontSize, minFontSize, containerWidth]);

  return { fontSize, textRef };
}
