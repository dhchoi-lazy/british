import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

// Important events in Joseon Dynasty history
const timelineEvents = [
  {
    year: 1392,
    event: "Founding of Joseon",
    description: "King Taejo establishes the Joseon Dynasty",
    category: "politics",
  },
  {
    year: 1443,
    event: "Hangul created",
    description: "King Sejong introduces the Korean alphabet",
    category: "culture",
  },
  {
    year: 1592,
    event: "Imjin War",
    description: "Japanese invasion of Korea",
    category: "war",
  },
  {
    year: 1636,
    event: "Qing invasion",
    description: "Manchu invasion of Korea",
    category: "war",
  },
  {
    year: 1644,
    event: "Fall of Ming",
    description: "End of Ming Dynasty in China",
    category: "foreign",
  },
  {
    year: 1762,
    event: "Reign of King Yeongjo",
    description: "Period of political stability and cultural advancement",
    category: "politics",
  },
  {
    year: 1785,
    event: "Practical Learning",
    description: "Rise of Silhak (Practical Learning) movement",
    category: "culture",
  },
  {
    year: 1801,
    event: "Catholic Persecution",
    description: "First major persecution of Catholics",
    category: "religion",
  },
  {
    year: 1866,
    event: "General Sherman Incident",
    description: "American merchant ship incident",
    category: "foreign",
  },
  {
    year: 1876,
    event: "Treaty of Ganghwa",
    description: "Opening of Korea to Japan and the West",
    category: "foreign",
  },
  {
    year: 1894,
    event: "Gabo Reform",
    description: "Major political reform aimed at modernization",
    category: "politics",
  },
  {
    year: 1897,
    event: "Korean Empire",
    description: "King Gojong declares Korean Empire",
    category: "politics",
  },
  {
    year: 1910,
    event: "Japanese Annexation",
    description:
      "End of Joseon/Korean Empire, beginning of Japanese colonial rule",
    category: "foreign",
  },
];

// Category colors for visual distinction
const categoryColors = {
  politics: "#4e79a7",
  culture: "#59a14f",
  war: "#e15759",
  religion: "#9c755f",
  foreign: "#f28e2b",
};

export default function DynastyTimeline() {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.85,
    height: 400,
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth * 0.85,
        height: 400,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous rendering
    d3.select(svgRef.current).selectAll("*").remove();

    const { width, height } = dimensions;
    const margin = { top: 60, right: 50, bottom: 80, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    // Create scales
    const xScale = d3.scaleLinear().domain([1390, 1910]).range([0, innerWidth]);

    // Create title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text("Joseon Dynasty Timeline (1392-1910)");

    // Create main group for the timeline
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create axis
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d")).ticks(10);

    // Add axis to the visualization
    g.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .style("font-size", "12px");

    // Add axis label
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 40)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Year");

    // Add horizontal timeline line
    g.append("line")
      .attr("x1", 0)
      .attr("y1", innerHeight / 2)
      .attr("x2", innerWidth)
      .attr("y2", innerHeight / 2)
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    // Create a group for each event
    const events = g
      .selectAll(".event")
      .data(timelineEvents)
      .enter()
      .append("g")
      .attr("class", "event")
      .attr(
        "transform",
        (d) => `translate(${xScale(d.year)}, ${innerHeight / 2})`,
      )
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        setSelectedEvent(d);
      })
      .on("mouseover", function (event, d) {
        d3.select(this)
          .select("circle")
          .transition()
          .duration(200)
          .attr("r", 10);

        // Show tooltip
        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style("visibility", "visible")
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 10}px`).html(`
            <div style="font-weight: bold; color: ${categoryColors[d.category]}">${d.year}: ${d.event}</div>
            <div>${d.description}</div>
          `);
      })
      .on("mousemove", function (event) {
        d3.select(tooltipRef.current)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 10}px`);
      })
      .on("mouseout", function () {
        d3.select(this)
          .select("circle")
          .transition()
          .duration(200)
          .attr("r", 8);
        d3.select(tooltipRef.current).style("visibility", "hidden");
      });

    // Add circles for each event
    events
      .append("circle")
      .attr("r", 8)
      .attr("fill", (d) => categoryColors[d.category])
      .attr("stroke", "#333")
      .attr("stroke-width", 1)
      .style("opacity", 0)
      .transition()
      .duration(500)
      .delay((d, i) => i * 100)
      .style("opacity", 1);

    // Add event year labels above the timeline
    events
      .filter((d, i) => i % 2 === 0) // Only show labels for every other event to avoid crowding
      .append("text")
      .attr("y", -30)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", (d) => categoryColors[d.category])
      .style("font-weight", "bold")
      .text((d) => d.year)
      .style("opacity", 0)
      .transition()
      .duration(500)
      .delay((d, i) => i * 100 + 500)
      .style("opacity", 1);

    // Add event labels below the timeline
    events
      .append("text")
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("fill", "#333")
      .text((d) => d.event)
      .style("opacity", 0)
      .transition()
      .duration(500)
      .delay((d, i) => i * 100 + 500)
      .style("opacity", 1);

    // Add connecting lines
    events
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", (d) => (d.year % 2 === 0 ? 20 : -20))
      .attr("stroke", (d) => categoryColors[d.category])
      .attr("stroke-width", 1)
      .style("opacity", 0)
      .transition()
      .duration(500)
      .delay((d, i) => i * 100)
      .style("opacity", 1);

    // Create legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height - 30})`);

    const categories = Object.keys(categoryColors);

    categories.forEach((category, i) => {
      const legendItem = legend
        .append("g")
        .attr(
          "transform",
          `translate(${i * (innerWidth / categories.length)}, 0)`,
        );

      legendItem
        .append("circle")
        .attr("r", 6)
        .attr("fill", categoryColors[category]);

      legendItem
        .append("text")
        .attr("x", 10)
        .attr("y", 4)
        .style("font-size", "12px")
        .text(category.charAt(0).toUpperCase() + category.slice(1));
    });
  }, [dimensions, selectedEvent]);

  return (
    <div
      className="dynasty-timeline"
      style={{ position: "relative", marginTop: "40px", marginBottom: "40px" }}
    >
      <svg ref={svgRef}></svg>

      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          pointerEvents: "none",
          fontSize: "14px",
          maxWidth: "250px",
          zIndex: 1000,
        }}
      ></div>

      {selectedEvent && (
        <div
          className="event-details"
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderLeft: `4px solid ${categoryColors[selectedEvent.category]}`,
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              color: categoryColors[selectedEvent.category],
              marginTop: 0,
            }}
          >
            {selectedEvent.year}: {selectedEvent.event}
          </h3>
          <p>{selectedEvent.description}</p>
          <p
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              color: categoryColors[selectedEvent.category],
            }}
          >
            Category: {selectedEvent.category}
          </p>
          <button
            onClick={() => setSelectedEvent(null)}
            style={{
              background: "transparent",
              border: "1px solid #999",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
