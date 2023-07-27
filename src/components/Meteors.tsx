import clsx from "clsx";
import { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
}
const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const styles = new Array(number).fill(0).map(() => ({
      top: -5,
      left:
        window.innerWidth -
        Math.floor(Math.random() * window.innerWidth * 1.7) +
        "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 5 + 3) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          className={clsx(
            "absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[230deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          )}
          style={style}
        >
          {/* Meteor Tail */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              width: "50px",
              height: "1px",
              background: "linear-gradient(90deg, #64748b, transparent)",
            }}
          />
        </span>
      ))}
    </>
  );
};

export default Meteors;
