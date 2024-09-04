import { useRef, useEffect } from "react";
import * as d3 from "d3";
import bangmok from "./bangmok.json";

export default function Bangmok() {
  const ref = useRef();
  useEffect(() => {
    const data = bangmok;
    const div = d3.select(ref.current);
    div
      .style("display", "flex")
      .attr("width", window.innerWidth)
      .style("flex-direction", "column")
      .style("justify-content", "center")
      .style("align-items", "center");

    const chartWidth = window.innerWidth;
    const chartHeight = window.innerHeight / 5;

    let groupedData = data.reduce((grouped, item) => {
      let century =
        item.year <= 1400 ? 1400 : Math.floor(item.year / 100) * 100;
      if (!grouped[century]) {
        grouped[century] = [];
      }
      grouped[century].push(item);
      return grouped;
    }, {});
    let nestedArray = Object.entries(groupedData).map(([century, items]) => {
      return { century: parseInt(century), data: items };
    });

    nestedArray.forEach((data, i) => {
      const smallData = data["data"];
      const MarginLeft = 100;
      const MarginRight = 100;
      const MarginTop = 30;
      const MarginBottom = 30;
      const svg = div
        .append("svg")
        .attr("class", "century")
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .attr("viewBox", [
          -MarginLeft,
          MarginTop,
          window.innerWidth + MarginLeft + MarginRight,
          chartHeight + MarginTop + MarginBottom,
        ]);

      const x = d3
        .scaleLinear()
        .domain(d3.extent(smallData, (d) => d.year))
        .range([0, chartWidth]);

      svg
        .append("g")
        .call(d3.axisBottom(x).ticks(25).tickFormat(d3.format("d")))
        .attr("transform", `translate(${0}, ${chartHeight + MarginTop})`)
        .style("font-size", "20px")
        .style("font-family", "inherit")
        .style(":after", "{content:''}");

      const y = d3.scaleLinear().domain([0, 135]).range([chartHeight, 0]);

      svg
        .append("g")
        .call(d3.axisLeft(y))
        .attr("transform", `translate(${0}, ${MarginTop})`)
        .style("font-size", "15px")
        .style("font-family", "inherit");

      svg
        .selectAll("bangmokline")
        .append("g")
        .data(smallData)
        .join("rect")
        .attr("x", (d) => x(d.year))
        .attr("y", (d) => y(d.count))
        .attr("width", 12)
        .attr("height", (d) => chartHeight - y(d.count))
        .attr("fill", "#15a0bf")
        .attr("stroke-width", 1)
        .attr("transform", `translate(${0}, ${MarginTop})`);
    });
  }, []);
  return <div ref={ref} />;
}
