import React, { useRef, useCallback, useState, useEffect } from "react";
import { GridHighlight } from "../Layout";
import { ForceGraph3D } from "react-force-graph";

// This component provides a 3D graph visualization without relying on AFRAME directly
const Graph3D = ({ data, title }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - 50,
    height: 500,
  });
  const [isReady, setIsReady] = useState(false);
  const graphRef = useRef();

  // Colors for different node groups
  const colorByGroup = {
    1: "#336699",
    2: "#FFFFFF",
    3: "#FFCC33",
    4: "#CC3333",
  };

  // Calculate node degrees for sizing
  const calculateDegrees = useCallback(() => {
    const degrees = {};
    if (data && data.links) {
      data.links.forEach((link) => {
        degrees[link.source] = (degrees[link.source] || 0) + 1;
        degrees[link.target] = (degrees[link.target] || 0) + 1;
      });
    }
    return degrees;
  }, [data]);

  const degrees = calculateDegrees();

  // Handle node click for camera movement
  const handleClick = useCallback(
    (node) => {
      if (!graphRef.current) return;

      // Aim at node from outside it
      const distance = 400;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      graphRef.current.cameraPosition(
        node.x || node.y || node.z
          ? {
              x: node.x * distRatio,
              y: node.y * distRatio,
              z: node.z * distRatio,
            }
          : { x: 0, y: 0, z: distance }, // special case if node is in (0,0,0)
        node, // lookAt ({ x, y, z })
        3000, // ms transition duration
      );
    },
    [graphRef],
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth - 50,
        height: 500,
      });
    };

    window.addEventListener("resize", handleResize);

    // Set a timeout to ensure all dependencies are loaded
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Fallback rendering while loading
  if (!isReady || !data) {
    return (
      <div
        style={{
          width: dimensions.width,
          height: dimensions.height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FDF5E6",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          <h3 style={{ textAlign: "center" }}>Loading 3D Graph...</h3>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                border: "5px solid #f3f3f3",
                borderTop: "5px solid #3498db",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></div>
          </div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <>
      {title && <h2>{title}</h2>}
      <GridHighlight
        style={{
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        <ForceGraph3D
          ref={graphRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={data}
          nodeLabel="id"
          showNavInfo={false}
          nodeResolution={10}
          nodeColor={(node) => colorByGroup[node.group] || "#999999"}
          nodeVal={(node) => degrees[node.id] || 1}
          linkWidth={(edge) => edge.value || 1}
          nodeThreeObjectExtend={true}
          onNodeClick={handleClick}
          backgroundColor="#FDF5E6"
        />
      </GridHighlight>
    </>
  );
};

export default Graph3D;
