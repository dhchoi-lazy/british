import React from "react";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header/Header";
import Introduction from "./components/Introduction/Introduction";
import Data from "./components/Data/Data";
import Method from "./components/Method/Method";

import Footer from "./components/Footer/Footer";

import "./App.css";
import "reveal.js/dist/reveal.css";

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <meta charSet="utf-8" />
        <title>Korean Cultural Centre UK</title>
        <meta property="og:type" content="article" />
        <meta name="description" content="Korean Cultural Centre UK" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </HelmetProvider>
      <Header />
      <Introduction />

      <Data />
      <Method />

      <Footer />
    </div>
  );
}

export default App;
