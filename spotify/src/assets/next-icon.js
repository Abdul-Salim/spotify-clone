import React, { useState } from "react";

const Next = ({ onClick }) => {
  const [fill, setFill] = useState(false);

  return (
    <div className="mx-1" onClick={onClick}>
      <svg
        role="img"
        height="16"
        width="16"
        viewBox="0 0 16 16"
        // className="cursor-pointer"
        fill={fill ? "#fff" : "#bababa"}
        onMouseOver={() => setFill(true)}
        onMouseLeave={() => setFill(false)}
      >
        <path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"></path>
      </svg>
    </div>
  );
};

export default Next;
