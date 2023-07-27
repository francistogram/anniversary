import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useState, type ReactNode } from "react";
import Confetti from "react-confetti";
import assert from "assert";

export default function Home() {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  const sentences: {
    copy: string | ReactNode | (string | ReactNode)[];
    background?: string;
  }[] = [
    { copy: "Hi Mikel. " },
    { copy: "It's been three years today. " },
    { copy: "Time flies. Doesn't it? " },
    { copy: "We've moved cities, switched jobs, found new friends. " },
    { copy: "Three years of change, of growing together, of love. " },
    {
      copy: "Had you asked then where we'd be today I don't think I could've predicted much. ",
    },
    {
      copy: "I suppose that's the beauty of it all, you can have a vision for the life you want but how you'll get there you can't predict. ",
    },
    {
      copy: "I'm sure you wonder what life will be like three years from now. ",
    },
    { copy: "I wonder too. ", background: "from-black to-cyan-900 bg-pos-100" },
    { copy: "So what can we predict? " },
    { copy: "Maybe I share a quick lesson and offer what I can. " },
    {
      copy: (
        <div className="flex w-full justify-center">
          <span key="code is easy" className="mr-2 font-code">
            Code is easy.
          </span>
          Love is hard.
        </div>
      ),
      background: "from-black via-black to-pink-300 bg-pos-100",
    },
    {
      copy: "The former you write once and it'll live on in that state in perpetuity while the other you have to work on each and everyday. ",
    },
    {
      copy: "While I can't predict the future here's what I can guarantee will stay the same. ",
    },
    { copy: "My commitment to you, to Tala, to us. " },
    {
      copy: [
        "To make time for you",
        ", buy flowers for you",
        ", chauffeur you",
        ", yell your name in excitement when come home to surprise you",
        ", sit in coffee shops with you",
        ", walk Tala so you can sleep in. ",
      ],
      background: "from-yellow-400 to-pink-400 bg-pos-100",
    },
    {
      copy: (
        <div className="flex w-full justify-center">All of this for you.</div>
      ),
    },
  ];

  const sectionLength = 100 / sentences.length;

  // Given the scroll percentage find the current sentence
  const currentSentence =
    sentences[Math.floor((scrollPercentage / 100) * sentences.length)] ??
    sentences[sentences.length - 1];

  assert(currentSentence);

  const background =
    currentSentence.background ?? "from-black to-black bg-pos-0";

  const onLastSentence = scrollPercentage > 100 - sectionLength / 2;

  return (
    <>
      {onLastSentence && <Confetti colors={["#FDC5D4"]} />}
      <Head>
        <title>3 Years</title>
        <meta name="description" content="3 Years" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={classNames(
          "hidden-scrollbar flex h-screen w-screen items-center justify-center overflow-scroll bg-gradient-to-r bg-size-200 transition-all duration-500 ease-in-out",
          background
        )}
        onScroll={(e) => {
          const element = e.target as HTMLDivElement;
          const scrollPercentage =
            (element.scrollTop /
              (element.scrollHeight - element.clientHeight)) *
            100;

          setScrollPercentage(scrollPercentage);
        }}
      >
        <div className="h-[3000px] w-full lg:h-[10000px]">
          <div
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className="pointer-events-none fixed flex h-screen w-screen max-w-sm items-center justify-center px-4 font-medium text-transparent lg:max-w-none "
          >
            <AnimatePresence>
              {scrollPercentage === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="mouse_scroll">
                    <div className="mouse">
                      <div className="wheel"></div>
                    </div>
                    <div>
                      <span className="m_scroll_arrows unu"></span>
                      <span className="m_scroll_arrows doi"></span>
                      <span className="m_scroll_arrows trei"></span>
                    </div>
                  </div>
                </motion.div>
              )}
              {onLastSentence && (
                <motion.div
                  key="last-sentence"
                  className={classNames(
                    "flex h-screen w-full flex-col items-center justify-center gap-2 pt-10 text-2xl text-white lg:text-5xl"
                  )}
                >
                  <motion.div
                    initial={{ rotateX: 90 }}
                    animate={{ rotateX: 0 }}
                    transition={{ duration: 1 }}
                  >
                    Happy Anniversary Mikel!
                  </motion.div>
                  <motion.div
                    initial={{ rotateX: 90 }}
                    animate={{ rotateX: 0 }}
                    transition={{ duration: 1 }}
                  >
                    Francisco
                  </motion.div>
                </motion.div>
              )}
              {scrollPercentage > 0 && !onLastSentence && (
                <motion.div className="max-w-4xl translate-y-4 px-2 text-justify text-xs leading-[30px] lg:w-full lg:text-2xl lg:leading-[60px]">
                  {sentences.map((sentence, index) => {
                    const prevBreakpoint = Math.max(0.1, sectionLength * index);
                    const breakpoint = sectionLength * (index + 1);

                    if (Array.isArray(sentence.copy)) {
                      // We want to splitup the break point in to equal sections for each part of the array
                      const sectionLength =
                        (breakpoint - prevBreakpoint) / sentence.copy.length;

                      return (
                        <>
                          {sentence.copy.map((copy, index) => {
                            const prevInnerBreakpoint =
                              prevBreakpoint + sectionLength * index;

                            return (
                              <span
                                key={index}
                                className={classNames("transition-colors", {
                                  "text-white":
                                    scrollPercentage <= breakpoint &&
                                    scrollPercentage >= prevInnerBreakpoint &&
                                    !onLastSentence,
                                  "text-white/30 lg:text-white/10":
                                    scrollPercentage > breakpoint &&
                                    !onLastSentence,
                                })}
                              >
                                {copy}
                              </span>
                            );
                          })}
                        </>
                      );
                    } else {
                      return (
                        <span
                          key={index}
                          className={classNames("transition-colors", {
                            "text-white":
                              scrollPercentage < breakpoint &&
                              scrollPercentage >= prevBreakpoint &&
                              !onLastSentence,
                            "text-white/30 lg:text-white/10":
                              scrollPercentage > breakpoint && !onLastSentence,
                          })}
                        >
                          {sentence.copy}
                        </span>
                      );
                    }
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </>
  );
}
