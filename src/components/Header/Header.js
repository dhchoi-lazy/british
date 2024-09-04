import { ReactComponent as HeaderColor } from "./header-color.svg";

const Header = () => {
  return (
    <div
      id="header"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeaderColor
        id="header-background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1
          id="title"
          style={{
            margin: "0 0 20px",
            fontSize: "1.8em",
          }}
        >
          <span style={{ backgroundColor: "#ebe4f5" }}>
            Visual Chronicles: Reimagining the Annals of Joseon Dynasty
          </span>
        </h1>
        <h2
          id="author"
          style={{
            margin: "0 0 10px",
          }}
        >
          {" "}
          <span style={{ backgroundColor: "#ebe4f5" }}>Donghyeok Choi</span>
        </h2>
        <h3
          id="affiliation"
          style={{
            margin: "0",
            fontStyle: "italic",
          }}
        >
          {" "}
          <span style={{ backgroundColor: "#ebe4f5" }}>2024</span>
        </h3>
      </div>
    </div>
  );
};

export default Header;
