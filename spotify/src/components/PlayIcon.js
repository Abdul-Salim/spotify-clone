import React from "react";

const PlayIcon = ({ height, width, item, playPlaylist }) => {
  const x = Number(width) / 2;
  const y = Number(height) / 2;
  return (
    <div
      className="spotify-play"
      style={{ height: `${height}px`, width: `${width}px` }}
      onClick={(e) => playPlaylist(e, item)}
    >
      <svg
        height={y}
        role="img"
        width={x}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <polygon
          points="21.57 12 5.98 3 5.98 21 21.57 12"
          fill="#ffffff"
        ></polygon>
      </svg>
    </div>
  );
};

export default PlayIcon;
