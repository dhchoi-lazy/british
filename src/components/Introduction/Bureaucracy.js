import React, { useRef, useLayoutEffect } from "react";
import bureaycracy from "./bureaucracy.json";
import * as d3 from "d3";

export default function Bureaucracy() {
  const ref = useRef();

  useLayoutEffect(() => {
    const data = bureaycracy;
    const svg = d3.select(ref.current);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const radius = Math.min(width, height) / 2;
    const duration = 1000;

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "width: 100%; height: 100%; font: 16px sans-serif;");

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2}) scale(0.95)`);

    const tree = d3
      .tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

    let root = d3.hierarchy(data);
    root = tree(root);

    // Initial collapse
    root.children.forEach(collapse);
    update();

    function collapse(node) {
      if (node.depth === 1) {
        node.children?.forEach((child) => {
          if (!child.children) return;
          child._children = child.children;
          child._children.forEach(collapse);
          child.children = null;
        });
      } else if (node.depth > 1) {
        if (node.children) {
          node._children = node.children;
          node._children.forEach(collapse);
          node.children = null;
        }
      }
    }

    function clickNode(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update();
    }

    function update() {
      g.selectAll("*").remove();

      root = tree(root);

      const linkGroup = g
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);
      const nodeGroup = g.append("g");
      const labelsGroup = g
        .append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3);

      linkGroup
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr(
          "d",
          d3
            .linkRadial()
            .angle((d) => d.x)
            .radius((d) => d.y)
        )
        .transition()
        .duration(duration)
        .attr("opacity", 1);

      const nodes = nodeGroup
        .selectAll("circle")
        .data(root.descendants())
        .join("circle")
        .attr("r", (d) => (d.data.value ? d.data.value : 20))
        .attr("fill", (d) => (d.children ? "#AFB9B8" : "#BF3415"))
        .attr(
          "transform",
          (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
        )
        .on("click", (event, d) => clickNode(d))
        .on("mouseover", function (event, d) {
          d3.select(this).attr("fill", "#FFD700");
          tooltip
            .style("opacity", 1)
            .html(`Click to ${d.children ? "collapse" : "expand"}`)
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 10 + "px");
        })
        .on("mouseout", function (event, d) {
          d3.select(this).attr("fill", d.children ? "#AFB9B8" : "#BF3415");
          tooltip.style("opacity", 0);
        })
        .style("cursor", "pointer");

      nodes
        .transition()
        .duration(duration)
        .attr(
          "transform",
          (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
        );

      labelsGroup
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .style("paint-order", "fill stroke")
        .attr("dy", "0.31em")
        .attr("x", (d) => (d.x < Math.PI ? (!d.children ? 6 : -6) : 0))
        .attr("text-anchor", (d) =>
          d.x < Math.PI ? (!d.children ? "start" : "end") : "middle"
        )
        .text((d) => d.data.name)
        .attr("transform", (d, i) => {
          if (i === 0) {
            return `rotate(0) translate(${d.y},0) rotate(0)`;
          } else {
            return `rotate(${(d.x * 180) / Math.PI - 90}) translate(${
              d.y
            },0) rotate(${d.x >= Math.PI ? 180 : 0})`;
          }
        })
        .on("click", (event, d) => clickNode(d))
        .transition()
        .duration(duration)
        .attr("transform", (d, i) => {
          if (i === 0) {
            return `rotate(0) translate(${d.y},0) rotate(0)`;
          } else {
            return `rotate(${(d.x * 180) / Math.PI - 90}) translate(${
              d.y
            },0) rotate(${d.x >= Math.PI ? 180 : 0})`;
          }
        });
    }

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("pointer-events", "none");

    // Add persistent instruction message in upper left corner
    const instructionGroup = svg
      .append("g")
      .attr("class", "instruction")
      .attr("transform", "translate(-100, 10)"); // Position at upper left with 10px margin

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      svg
        .attr("width", newWidth)
        .attr("height", newHeight)
        .attr("viewBox", [0, 0, newWidth, newHeight]);
      g.attr(
        "transform",
        `translate(${newWidth / 2},${newHeight / 2}) scale(0.95)`
      );
      instructionGroup.attr("transform", `translate(${newWidth / 2}, 30)`);
      update();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <svg ref={ref} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
