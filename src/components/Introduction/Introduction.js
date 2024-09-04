import { GridNormal, GridContainer, GridHighlight } from "../Layout";
import { useRef, useEffect } from "react";
import Bureaucracy from "./Bureaucracy";
import Gwageo from "./Gwageo";
import Yangban from "./yangban.svg";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";

export default function Introduction() {
  const deck1Ref = useRef(null);
  const deck2Ref = useRef(null);

  useEffect(() => {
    if (deck1Ref.current) {
      const deck1 = new Reveal(deck1Ref.current, {
        embedded: true,
        width: window.innerWidth,
        height: window.innerHeight,
        progress: false,
        keyboardCondition: "focused",
      });

      deck1.initialize();
    }
    if (deck2Ref.current) {
      const deck2 = new Reveal(deck2Ref.current, {
        embedded: true,
        center: false,
        width: 1200,
        height: window.innerHeight,
        progress: false,
        keyboardCondition: "focused",
      });

      deck2.initialize();
    }
  }, []);
  return (
    <>
      <section id="introduction">
        <h1 className="text-4xl">Introduction</h1>

        <GridContainer>
          <GridNormal>
            <h2 className="text-2xl font-bold">Yangban</h2>
            <div style={{ display: "flex" }}>
              <img width="50%" src={Yangban} alt="Yangban" />
              <ul className="list-disc ml-5 space-y-2 flex flex-col justify-center">
                <li className="list-disc">
                  <p className="text-lg">
                    Joseon's <i>de facto</i> noble class (but they are NOT
                    noble)
                  </p>
                </li>
                <li className="list-disc">
                  <p className="text-lg">
                    The term <b>Yangban</b> combines 양(兩) meaning <b>two</b>{" "}
                    and 반(班) signifying <b>group</b>, referring to both
                    literary (문반; 文班) and military (무반; 武班) officials.
                    However, this definition is misleading as Yangban status was
                    based on social norms, characterized by its subjective and
                    fluid nature, not strictly legal classification
                  </p>
                </li>
                <li className="list-disc">
                  <p className="text-lg">
                    Attaining Yangban status required more than passing the
                    Gwageo; crucial was societal recognition within local
                    communities, which distinguished Yangban families from
                    non-Yangban ones. The status was fluid, allowing families to
                    transition between Yangban and commoner status.
                  </p>
                </li>
              </ul>
            </div>
          </GridNormal>

          <h2 className="text-2xl font-bold">Gwageo and Bureaucracy</h2>
          <GridHighlight>
            <Gwageo />
            <GridNormal>
              <h2 className="text-2xl font-bold mb-4">
                The Challenging Path to Yangban Status
              </h2>

              <p className="text-lg mb-4 leading-loose">
                Becoming a <b>Yangban</b> was an arduous process, primarily
                achieved through the <b>Gwageo</b> (과거) examination system.
                This system was designed to select the most qualified candidates
                for government service, but it was notoriously difficult and
                time-consuming.
              </p>

              <h3 className="text-xl font-bold mb-2">
                Key Points of the Gwageo System:
              </h3>

              <ul className="list-disc ml-5 space-y-2 mb-4 leading-loose">
                <li className="text-lg">
                  <b>Three Exam Categories:</b>
                  <ul className="list-disc ml-10">
                    <li className="text-lg">
                      <b>Mungwa</b> (문과; 文科) – Civil service
                    </li>
                    <li className="text-lg">
                      <b>Mugwa</b> (무과; 武科) – Military service
                    </li>
                    <li className="text-lg">
                      <b>Japgwa</b> (잡과; 雜科) – Technical specialties
                    </li>
                  </ul>
                </li>
                <li className="text-lg">
                  <b>Mungwa:</b> The most prestigious and competitive category,
                  with 14,638 recorded successful candidates throughout Joseon
                  history.
                </li>
                <li className="text-lg">
                  <b>Alternative Path:</b> The <b>Eumseo</b> (음서; 蔭敍) system
                  allowed children of high-ranking officials to enter government
                  service, but with limited advancement opportunities.
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-2">
                Mungwa Examination Process:
              </h3>

              <ol className="list-decimal ml-5 space-y-2 mb-4">
                <li className="text-lg">
                  <b>Sogwa</b> (소과; 小科): Lower level exam
                  <ul className="list-disc ml-10">
                    <li className="text-lg">
                      Allowed admission to <b>Seongkyunkwan</b> (성균관;
                      成均館), the royal university
                    </li>
                  </ul>
                </li>
                <li className="text-lg">
                  <b>Daegwa</b> (대과; 大科): Higher level exam
                  <ul className="list-disc ml-10">
                    <li className="text-lg">
                      Three-stage process selecting 240 candidates:
                      <ul>
                        <li>50 Seongkyunkwan graduates</li>
                        <li>150 provincial exam passers</li>
                        <li>40 candidates from Seoul exams</li>
                      </ul>
                    </li>
                    <li className="text-lg">
                      Final stage: <b>Jeonsi</b> (전시; 殿試) - Only 33
                      candidates chosen for government roles
                    </li>
                  </ul>
                </li>
              </ol>

              <h3 className="text-xl font-bold mb-2">
                Candidate Selection by Region:
              </h3>

              <table className="table-auto border-collapse border border-gray-500 mb-4">
                <thead>
                  <tr>
                    <th className="border border-gray-500 px-4 py-2">Region</th>
                    <th className="border border-gray-500 px-4 py-2">
                      Sogwa First Exam
                    </th>
                    <th className="border border-gray-500 px-4 py-2">
                      Daegwa First Exam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2">Seoul</td>
                    <td className="border border-gray-500 px-4 py-2">200</td>
                    <td className="border border-gray-500 px-4 py-2">40</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2">
                      Gyeonggi
                    </td>
                    <td className="border border-gray-500 px-4 py-2">60</td>
                    <td className="border border-gray-500 px-4 py-2">20</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2">
                      Gangwon
                    </td>
                    <td className="border border-gray-500 px-4 py-2">45</td>
                    <td className="border border-gray-500 px-4 py-2">15</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2">
                      Chungcheong
                    </td>
                    <td className="border border-gray-500 px-4 py-2">90</td>
                    <td className="border border-gray-500 px-4 py-2">10</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2">Jeolla</td>
                    <td className="border border-gray-500 px-4 py-2">90</td>
                    <td className="border border-gray-500 px-4 py-2">25</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2">
                      Gyeongsang
                    </td>
                    <td className="border border-gray-500 px-4 py-2">100</td>
                    <td className="border border-gray-500 px-4 py-2">30</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2">
                      Hwanghae
                    </td>
                    <td className="border border-gray-500 px-4 py-2">35</td>
                    <td className="border border-gray-500 px-4 py-2">25</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2">
                      Pyeongan
                    </td>
                    <td className="border border-gray-500 px-4 py-2">45</td>
                    <td className="border border-gray-500 px-4 py-2">15</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2">
                      Hamgyeong
                    </td>
                    <td className="border border-gray-500 px-4 py-2">35</td>
                    <td className="border border-gray-500 px-4 py-2">10</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="text-xl font-bold mb-2">Exam Progression:</h3>

              <div className="flex space-x-8 mb-4">
                <div>
                  <h4 className="font-bold">Sogwa Path:</h4>
                  <ol className="list-decimal ml-5">
                    <li className="text-lg">Sogwa First Exam</li>
                    <li className="text-lg">
                      Sogwa Second Exam (100 candidates)
                    </li>
                    <li className="text-lg">
                      Seongkyunkwan Admission (100 candidates)
                    </li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-bold">Daegwa Path:</h4>
                  <ol className="list-decimal ml-5">
                    <li className="text-lg">Seongkyunkwan Study</li>
                    <li className="text-lg">
                      Daegwa First Exam (50 candidates)
                    </li>
                    <li className="text-lg">
                      Daegwa Second Exam (33 candidates)
                    </li>
                    <li className="text-lg">
                      Daegwa Final Exam (33 candidates)
                    </li>
                  </ol>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">
                Gwageo Examination Stages:
              </h3>

              <table className="table-auto border-collapse border border-gray-500">
                <thead>
                  <tr>
                    <th className="border border-gray-500 px-4 py-2">Stage</th>
                    <th className="border border-gray-500 px-4 py-2">Sogwa</th>
                    <th className="border border-gray-500 px-4 py-2">Daegwa</th>
                    <th className="border border-gray-500 px-4 py-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2">First</td>
                    <td className="border border-gray-500 px-4 py-2">
                      Chosi (초시, 初試)
                    </td>
                    <td className="border border-gray-500 px-4 py-2">Chosi</td>
                    <td className="border border-gray-500 px-4 py-2">
                      240 candidates selected
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2">Second</td>
                    <td className="border border-gray-500 px-4 py-2">
                      Boksi (복시, 覆試)
                    </td>
                    <td className="border border-gray-500 px-4 py-2">Boksi</td>
                    <td className="border border-gray-500 px-4 py-2">
                      33 candidates selected
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 px-4 py-2">Final</td>
                    <td className="border border-gray-500 px-4 py-2">-</td>
                    <td className="border border-gray-500 px-4 py-2">
                      Jeonsi (전시, 殿試)
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      Candidates ranked
                    </td>
                  </tr>
                </tbody>
              </table>
            </GridNormal>
          </GridHighlight>
          <GridHighlight>
            <div style={{ height: "20vh" }}></div>
            <h2 className="text-2xl font-bold">Joseon Bureaucracy</h2>
            <Bureaucracy />

            <h3 className="text-4xl font-bold text-center">
              Click on the red circles to see the details!
            </h3>
            <GridNormal>
              <h3 className="text-2xl font-bold mb-4">
                Joseon's Complex Government Structure: A Visual Guide
              </h3>
              <p className="text-lg mb-4">
                This diagram illustrates the complex structure of Joseon's
                government:
              </p>
              <ul className="list-disc ml-5 space-y-2 mb-4">
                <li className="text-lg">
                  Circles represent government offices
                </li>
                <li className="text-lg">
                  Leaf nodes show official positions and ranks
                </li>
                <li className="text-lg">
                  Circle size indicates rank importance
                </li>
                <li className="text-lg">
                  Hierarchy displays relationships between offices
                </li>
                <li className="text-lg">
                  Includes both central and provincial positions
                </li>
              </ul>
              <p className="text-lg mb-4">
                This structure was fundamental to the Yangban class system.
                Cross-reference with the official grade table below for a
                complete understanding of Joseon's governmental power dynamics.
              </p>
              <h2 className="text-2xl font-bold">Official grade table</h2>
              <table>
                <tbody>
                  <tr>
                    <th>Korean</th>
                    <th>English</th>
                    <th>Numeric Value</th>
                  </tr>
                  <tr>
                    <td>정일품</td>
                    <td>1st Rank</td>
                    <td>18</td>
                  </tr>
                  <tr>
                    <td>종일품</td>
                    <td>Junior 1st Rank</td>
                    <td>17</td>
                  </tr>
                  <tr>
                    <td>정이품</td>
                    <td>2nd Rank</td>
                    <td>16</td>
                  </tr>
                  <tr>
                    <td>종이품</td>
                    <td>Junior 2nd Rank</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>정삼품</td>
                    <td>3rd Rank</td>
                    <td>14</td>
                  </tr>
                  <tr>
                    <td>종삼품</td>
                    <td>Junior 3rd Rank</td>
                    <td>13</td>
                  </tr>
                  <tr>
                    <td>정사품</td>
                    <td>4th Rank</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>종사품</td>
                    <td>Junior 4th Rank</td>
                    <td>11</td>
                  </tr>
                  <tr>
                    <td>정오품</td>
                    <td>5th Rank</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>종오품</td>
                    <td>Junior 5th Rank</td>
                    <td>9</td>
                  </tr>
                  <tr>
                    <td>정육품</td>
                    <td>6th Rank</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td>종육품</td>
                    <td>Junior 6th Rank</td>
                    <td>7</td>
                  </tr>
                  <tr>
                    <td>정칠품</td>
                    <td>7th Rank</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td>종칠품</td>
                    <td>Junior 7th Rank</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>정팔품</td>
                    <td>8th Rank</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>종팔품</td>
                    <td>Junior 8th Rank</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>정구품</td>
                    <td>9th Rank</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>종구품</td>
                    <td>Junior 9th Rank</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </table>
            </GridNormal>
          </GridHighlight>
        </GridContainer>
      </section>
    </>
  );
}
