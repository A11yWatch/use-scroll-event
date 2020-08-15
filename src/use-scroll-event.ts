import { useState, useEffect } from "react";

interface Props {
  x?: number;
  y?: number;
  scrolling?: boolean;
  scrollOffDelay?: number;
}

export const useScrollEvent = (
  { x, y, scrolling, scrollOffDelay }: Props = {
    x: 0,
    y: 0,
    scrolling: false,
    scrollOffDelay: 350,
  }
): Props => {
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
        timer = setTimeout(
          () =>
            setScroll({
              x: pageXOffset,
              y: pageYOffset,
              scrolling: false,
            }),
          scrollOffDelay || 350
        );
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
    x: scroll.x,
    y: scroll.y,
    scrolling: scroll.scrolling,
  };
};
