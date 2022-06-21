import React, { useState } from "react";

const Play = ({ onClick }) => {
  const [fill, setFill] = useState(false);

  return (
    <div
      className="mx-1"
      style={{
        backgroundColor: fill ? "#fff" : "#bababa",
        borderRadius: "50%",
        height: "32px",
        width: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseOver={() => setFill(true)}
      onMouseLeave={() => setFill(false)}
      onClick={onClick}
    >
      <svg role="img" height="16" width="16" viewBox="0 0 16 16" fill="black">
        <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
      </svg>
    </div>
  );
};

export default Play;