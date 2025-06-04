import React, { useState, useEffect } from "react";

// This component ensures aframe is properly loaded before rendering any aframe-dependent components
const AFrameProvider = ({ children }) => {
  const [isAframeReady, setIsAframeReady] = useState(false);

  useEffect(() => {
    // Check if AFRAME is already defined
    if (typeof AFRAME !== "undefined") {
      setIsAframeReady(true);
      return;
    }

    // Dynamically import aframe
    const loadAframe = async () => {
      try {
        // Import aframe
        await import("aframe");

        // Add a small delay to ensure everything is properly initialized
        setTimeout(() => {
          setIsAframeReady(true);
        }, 500);
      } catch (error) {
        console.error("Failed to load AFRAME:", error);
      }
    };

    loadAframe();

    // Cleanup
    return () => {
      // Any cleanup if needed
    };
  }, []);

  // Render a loading state while aframe is loading
  if (!isAframeReady) {
    return (
      <div
        style={{
          width: "100%",
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          <h3 style={{ textAlign: "center" }}>Loading 3D Visualization...</h3>
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

  // Render children once aframe is ready
  return <>{children}</>;
};

export default AFrameProvider;
