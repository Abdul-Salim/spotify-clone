import React, { useState } from "react";

const Pause = ({ onClick }) => {
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
        <path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path>
      </svg>
    </div>
  );
};

export default Pause;
