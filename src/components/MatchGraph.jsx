import React from "react";
import '../Styles/MatchGraph.css';
const MatchGraph = () => {
  const bars = Array.from({ length: 18 }, (_, i) => i < 12);

  return (
    <div className="match-graph-container">
      <div className="bars-container">
        {bars.map((isMatched, index) => (
          <div
            key={index}
            className={`bar ${isMatched ? "matched" : "not-matched"}`}
          ></div>
        ))}
      </div>
      <div className="legend">
        <div className="legend-item">
          <span className="dot matched-dot"></span> Matched
        </div>
        <div className="legend-item">
          <span className="dot not-matched-dot"></span> Not match
        </div>
      </div>
    </div>
  );
};

export default MatchGraph;
