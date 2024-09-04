import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ReactComponent as PsiGiniPlot } from "./psi-gini.svg";

export default function Psigraph() {
  const giniRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(DrawSVGPlugin);
    gsap.context(() => {
      // use scoped selectors
      const gini = gsap.timeline();
      gini.fromTo(
        giniRef.current.querySelector("#ginibase"),
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: "power1.inOut" }
      );
      gini.fromTo(
        giniRef.current.querySelector("#giniline"),
        { drawSVG: "0%" },
        { duration: 1, drawSVG: "100%" }
      );
      gini.fromTo(
        giniRef.current.querySelector("#ginierror"),
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: "power1.inOut" }
      );

      ScrollTrigger.create({
        trigger: giniRef.current,
        start: "top center",
        end: "center center",
        scrub: true,
        markers: false,
        animation: gini,
      });
    });

    // or refs
  }, []);

  return (
    <div>
      <PsiGiniPlot ref={giniRef} id="gini" />
    </div>
  );
}
