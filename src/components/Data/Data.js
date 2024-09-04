import Bangmok from "./Bangmok";
import Sillok from "./Sillok";
import { GridNormal, GridHighlight, GridContainer } from "../Layout";

import Cartogram from "./Cartogram";
import Age from "./Age";
import Grid from "@mui/material/Grid";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function Data() {
  const numberRef = useRef();
  const dataRef = useRef();
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".number", { fontSize: "50px" });
      const ntl = gsap.timeline({
        scrollTrigger: {
          trigger: numberRef.current,
          start: "top center", // 요소의 상단이 뷰포트의 중앙에 도달하면 시작
          end: "+=400", // 요소의 하단이 뷰포트의 중앙에서 500px 떨어진 곳에 도달하면 끝
          scrub: true,
          id: "numbers",
          markers: false,
        },
      });
      ntl
        .from("#number1", {
          innerText: 0,
          snap: {
            innerText: 1,
          },
          ease: "power1.inOut",
        })
        .from("#number2", { innerText: 0, snap: { innerText: 1 } })
        .from("#number3", { innerText: 0, snap: { innerText: 1 } });
    }, dataRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="data" ref={dataRef}>
      <GridContainer>
        <GridHighlight>
          <Bangmok />
          <GridNormal>
            <h4 className="text-xl font-semibold mb-2">
              The Fluctuating Numbers of Gwageo Exam Passers
            </h4>
            <p className="text-lg mt-4 leading-loose">
              This chart illustrates the changing numbers of Gwageo exam passers
              attaining Yangban status throughout the Joseon dynasty. Initially
              held triennially, the exam's regularity waned post-17th century.
              The dynasty's final years saw a dramatic increase in successful
              candidates, potentially reflecting the government's response to
              growing social pressures.
            </p>
          </GridNormal>
        </GridHighlight>
        <GridHighlight>
          <h3 className="text-2xl font-bold leading-loose">
            Where did they come from?
          </h3>
          <Cartogram />
        </GridHighlight>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Age />
          </Grid>
          <Grid item xs={3} />
        </Grid>
        <GridNormal>
          <h1 className="text-2xl font-bold leading-loose">
            Surprising Insights into Joseon Dynasty Lifespans
          </h1>
          <p className="text-lg mt-4 leading-loose">
            This chart reveals unexpected findings about lifespans during the
            Joseon Dynasty. Contrary to common assumptions, Yangbans enjoyed
            relatively long lives, averaging 61 years. Kings tended to have
            shorter lifespans, while eunuchs surprisingly had the longest
            average lifespan at 72.33 years.
          </p>
        </GridNormal>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <blockquote className="text-xl  leading-loose border-l-4 border-gray-400 pl-4 mb-96 mt-96">
              Spanning over five centuries, the Annals of the Joseon Dynasty
              stand as a monumental testament to Korean history. These
              meticulous chronicles offer an unparalleled glimpse into the heart
              of a nation, capturing the ebb and flow of royal life, the
              intricacies of governance, and the pulse of an evolving society.
            </blockquote>
          </Grid>
          <Grid item xs={3} />
        </Grid>
        <h2 className="text-2xl font-bold" ref={numberRef}>
          The Annals of Joseon Dynasty
        </h2>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <div className="flex justify-between flex-wrap my-20">
              {[
                { id: "number1", value: 26, label: "Monarchs" },
                { id: "number1", value: 214, label: "Topics" },
                { id: "number2", value: 60158, label: "People appeared" },
                { id: "number2", value: 183342, label: "Days (1392-1894)" },
                { id: "number3", value: 384279, label: "Articles" },
              ].map(({ id, value, label }) => (
                <p key={label}>
                  <span className="number" id={id}>
                    {value}
                  </span>{" "}
                  {label}
                </p>
              ))}
            </div>
          </Grid>
          <Grid item xs={3} />
        </Grid>
        <GridNormal>
          <p className="text-2lg mt-4 leading-loose">
            The Annals of the Joseon Dynasty, also known as the Veritable
            Records of the Joseon Dynasty, represent one of the most
            comprehensive and detailed historical records in world history.
            Spanning over 500 years, these annals provide an unparalleled
            insight into the daily operations of the Joseon court and Korean
            society.
          </p>
          <p className="text-2lg mt-2 leading-loose">
            The sheer volume of the annals is staggering: a monumental 384,279
            individual articles, covering 26 monarchs over 183,342 days. These
            articles mention an astounding 60,158 different people and cover 214
            distinct topics, creating an incredibly rich tapestry of historical
            information.
          </p>
          <p className="text-2lg mt-2 leading-loose">
            This meticulous record-keeping not only serves as a valuable
            resource for historians but also demonstrates the Joseon Dynasty's
            extraordinary commitment to preserving its history. The annals
            provide a day-by-day account of royal decrees, important events, and
            even astronomical observations, making them an invaluable and
            unparalleled source for understanding Korea's past.
          </p>
        </GridNormal>
        <GridHighlight>
          <h2 className="text-4xl font-semibold mb-2">
            The rhythm of the Annals
          </h2>
          <Sillok />
        </GridHighlight>{" "}
        <GridNormal className="bg-white bg-opacity-50 border-4 border-solid border-gray-400 p-6 rounded-lg">
          <p className="text-lg mt-4 leading-loose">
            This visualization transforms the lunar calendar's 360 days into a
            circular chart, where each degree represents a single day. Inspired
            by the question of which dates saw the most royal record entries
            during a king's reign, this unique approach reveals intriguing
            patterns. The resulting sun-like shape not only echoes the symbol of
            monarchy but also provides a novel perspective on the daily rhythms
            of historical documentation in the Joseon Dynasty. By mapping time
            to space in this way, we gain fresh insights into the ebb and flow
            of royal record-keeping throughout the year.
          </p>
        </GridNormal>
      </GridContainer>
    </section>
  );
}
