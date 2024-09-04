import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ReactComponent as Heatmap } from "./heatmap.svg";

export default function Psiheatmap() {
  const heatmapRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(DrawSVGPlugin);
    gsap.context(() => {
      // use scoped selectors
      const heatmap = gsap.timeline();
      heatmap.fromTo(
        heatmapRef.current.querySelector("#base"),
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: "power1.inOut" }
      );
      heatmap.fromTo(
        heatmapRef.current.querySelector("#heat"),
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: "power1.inOut" }
      );
      heatmap.fromTo(
        heatmapRef.current.querySelector("#colorbar"),
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: "power1.inOut" }
      );

      ScrollTrigger.create({
        trigger: heatmapRef.current,
        start: "top center",
        end: "center center",
        scrub: true,
        markers: false,
        animation: heatmap,
      });
    });

    // or refs
  }, []);

  return <Heatmap ref={heatmapRef} id="heatmap" />;
}
