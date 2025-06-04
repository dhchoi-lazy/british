import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import Lifespan from "./lifespan.json";

export default function AverageLifespanBar() {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    svg.attr("viewBox", [0, 0, width, height]);

    const data = d3.rollups(
      Lifespan,
      (v) => d3.mean(v, (d) => +d.lifespan),
      (d) => d.status
    );

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d[0]))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[1])])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-family", "IM Fell English");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-family", "IM Fell English");

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d[1]))
      .attr("fill", "#6b7280");

    svg
      .selectAll("text.bar")
      .data(data)
      .join("text")
      .attr("class", "bar")
      .attr("text-anchor", "middle")
      .attr("x", (d) => x(d[0]) + x.bandwidth() / 2)
      .attr("y", (d) => y(d[1]) - 5)
      .text((d) => d[1].toFixed(1))
      .style("font-size", "12px")
      .style("font-family", "IM Fell English");
  }, []);

  return <svg ref={ref} style={{ width: "100%", height: 300 }} />;
}
