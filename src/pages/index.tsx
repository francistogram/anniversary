import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import useScrollPercentage from "../hooks/useScrollPercentage";
import { type ReactNode } from "react";
import Confetti from "react-confetti";
import assert from "assert";

export default function Home() {
  const [scrollRef, scrollPercentage] = useScrollPercentage();

  const sentences: {
    copy: string | ReactNode | (string | ReactNode)[];
    background?: string;
  }[] = [
    { copy: "Hi Mikel. " },
    { copy: "It's been three years today. " },
    { copy: "Time flies. Doesn't it?" },
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
    { copy: "All of this for you. " },
    {
      copy: "Who knows what the future holds but take comfort in knowing some things will never change. ",
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

  const onLastSentence = scrollPercentage > 100 - sectionLength;

  return (
    <>
      {onLastSentence && <Confetti colors={["#FDC5D4"]} />}
      <Head>
        <title>3 Years</title>
        <meta name="description" content="3 Years" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        ref={scrollRef}
        className={classNames(
          "flex h-screen w-screen items-center justify-center overflow-scroll bg-gradient-to-r bg-size-200 transition-all duration-500 ease-in-out",
          background
        )}
      >
        <div className="h-[12000px] w-full">
          <div
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className="pointer-events-none fixed flex h-screen w-full max-w-sm items-center justify-center px-4 text-2xl font-medium leading-[60px] text-transparent 2xl:max-w-5xl "
          >
            <AnimatePresence>
              {onLastSentence && (
                <motion.div
                  key="last-sentence"
                  className={classNames(
                    "flex h-screen w-screen flex-col items-center justify-center gap-2 text-5xl text-white"
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
              {!onLastSentence && (
                <motion.div>
                  {sentences.map((sentence, index) => {
                    const prevBreakpoint = Math.max(1, sectionLength * index);
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
                                  "text-white/10":
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
                            "text-white/10":
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