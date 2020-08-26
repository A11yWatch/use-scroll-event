import { useState, useEffect } from "react";

export interface ScrollProps {
  x?: number;
  y?: number;
  scrolling?: boolean;
  scrollOffDelay?: number;
  detectScrolling?: boolean;
}

interface ScrollEvent {
  (params?: ScrollProps): {
    x: number;
    y: number;
    scrolling: boolean;
  };
}

export const useScrollEvent: ScrollEvent = (
  { x, y, scrolling, scrollOffDelay, detectScrolling } = {
    x: 0,
    y: 0,
    scrolling: false,
    scrollOffDelay: 350,
    detectScrolling: true,
  }
) => {
  const [scroll, setScroll] = useState(
    (typeof window !== "undefined" && {
      x: window.pageXOffset,
      y: window.pageYOffset,
      scrolling: false,
    }) || { x, y, scrolling }
  );
  let timer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const listener = (): void => {
      timer && clearTimeout(timer);
      const { pageXOffset, pageYOffset } = window;

      requestAnimationFrame(() => {
        setScroll({ x: pageXOffset, y: pageYOffset, scrolling: true });
        if (detectScrolling) {
          timer = setTimeout(() => {
            setScroll({
              x: pageXOffset,
              y: pageYOffset,
              scrolling: false,
            });
          }, Number(scrollOffDelay));
        }
      });
    };

    window.addEventListener("scroll", listener, {
      capture: false,
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return {
    x: scroll?.x || 0,
    y: scroll?.y || 0,
    scrolling: !!scroll.scrolling,
  };
};
