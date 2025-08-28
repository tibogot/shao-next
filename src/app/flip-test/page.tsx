"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Flip, ScrollTrigger);

export default function FlipTest() {
  useGSAP(() => {
    // Exact CodePen logic
    let flipCtx: gsap.Context | undefined;

    const createTimeline = () => {
      flipCtx && flipCtx.revert();

      flipCtx = gsap.context(() => {
        // Debug flip-test for comparison
        const boxElement = document.querySelector(".box");
        const marker2Element = document.querySelector(".second .marker");

        console.log("=== FLIP-TEST DEBUG ===");
        if (boxElement && marker2Element) {
          const boxRect = boxElement.getBoundingClientRect();
          const marker2Rect = marker2Element.getBoundingClientRect();

          console.log("Box getBoundingClientRect():", boxRect);
          console.log("Marker2 getBoundingClientRect():", marker2Rect);

          const boxStyles = window.getComputedStyle(boxElement);
          const marker2Styles = window.getComputedStyle(marker2Element);

          console.log("Box position:", boxStyles.position);
          console.log("Marker2 position:", marker2Styles.position);
        }

        const secondState = Flip.getState(".second .marker");
        const thirdState = Flip.getState(".third .marker");

        console.log("Second state:", secondState);
        console.log("Third state:", thirdState);
        const flipConfig = {
          ease: "none",
          duration: 1,
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".container.initial",
            start: "clamp(top center)",
            endTrigger: ".final",
            end: "clamp(top center)",
            scrub: 1,
            markers: true,
          },
        });

        const flipFit1 = Flip.fit(
          ".box",
          secondState,
          flipConfig,
        ) as gsap.core.Tween;
        const flipFit2 = Flip.fit(
          ".box",
          thirdState,
          flipConfig,
        ) as gsap.core.Tween;

        if (flipFit1) tl.add(flipFit1);
        if (flipFit2) tl.add(flipFit2, "+=0.5");
      });
    };

    createTimeline();

    // Handle resize like CodePen
    const handleResize = () => createTimeline();
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      flipCtx && flipCtx.revert();
    };
  }, []);

  return (
    <main>
      {/* Exact CodePen HTML structure */}
      <div className="spacer">scroll down</div>
      <div className="main">
        <div className="initial container">
          <div className="box"></div>
        </div>
        <div className="second container">
          <div className="marker"></div>
        </div>
        <div className="third container">
          <div className="marker"></div>
        </div>
      </div>
      <div className="final"></div>

      <style jsx>{`
        .spacer {
          width: 100%;
          height: 20vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main {
          position: relative;
          height: 100vh;
          min-height: 800px;
        }

        .container {
          position: absolute;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed #666;
          border-radius: 10px;
        }

        .initial {
          left: 60%;
          top: 10%;
        }

        .box {
          width: 100px;
          height: 100px;
          position: relative;
          z-index: 10;
          border-radius: 10px;
          background-color: #fbbf24;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
        }

        .box::after {
          content: "FLIP";
          color: black;
        }

        .second {
          left: 10%;
          top: 50%;
        }

        .marker {
          border-radius: 10px;
        }

        .second .marker {
          width: 100px;
          height: 100px;
        }

        .third {
          right: 10%;
          bottom: 3rem;
        }

        .third .marker {
          width: 100px;
          height: 100px;
        }

        .final {
          height: 20vh;
        }
      `}</style>
    </main>
  );
}
