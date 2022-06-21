import React from "react";

const PauseIcon = ({ playPlaylist, item }) => {
  return (
    <div
      className="cursor-pointer"
      style={{
        backgroundColor: "#1DB954",
        borderRadius: "500px",
        fontSize: "inherit",
        inlineSize: "56px",
        blockSize: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => playPlaylist(e, item)}
    >
      <span aria-hidden="true" class="IconWrapper__Wrapper-sc-1hf1hjl-0 dZGDpi">
        <svg
          role="img"
          height="28"
          width="28"
          viewBox="0 0 24 24"
          class="Svg-sc-1bi12j5-0 jgfuCe"
        >
          <path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path>
        </svg>
      </span>
    </div>
  );
};

export default PauseIcon;
