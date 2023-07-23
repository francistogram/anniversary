/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef, useState, useEffect } from "react";
import { type Ref } from "react";

const useScrollPercentage = (): [Ref<HTMLDivElement>, number] => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  const reportScroll = (e: Event) => {
    console.log(e);
    setScrollPercentage(getScrollPercentage(e.target));
  };

  useEffect(() => {
    const node = scrollRef.current;
    if (node !== null) {
      node.addEventListener("scroll", reportScroll, { passive: true });
      if (Number.isNaN(scrollPercentage)) {
        setScrollPercentage(getScrollPercentage(node));
      }
    }
    return () => {
      if (node !== null) {
        node.removeEventListener("scroll", reportScroll);
      }
    };
  }, [scrollPercentage]);

  return [scrollRef, Number.isNaN(scrollPercentage) ? 0 : scrollPercentage];
};

const getScrollPercentage = (element: EventTarget | null) => {
  if (element === null) {
    return NaN;
  }

  // @ts-ignore I might have types wrong but these exists
  const { scrollHeight, clientHeight, scrollTop } = element;

  const height = scrollHeight - clientHeight;
  return (scrollTop / height) * 100;
};

export default useScrollPercentage;
