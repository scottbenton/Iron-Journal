import { useEffect, useState } from "react";

export function useImageDimensions(imageUrl: string | undefined) {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      setDimensions(null);
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setDimensions({
        width: img.width,
        height: img.height,
      });
    };
  }, [imageUrl]);

  return dimensions;
}
