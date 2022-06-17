import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlayCircleFilledWhiteSharpIcon from "@mui/icons-material/PlayCircleFilledWhiteSharp";
import PlayIcon from "./PlayIcon";

const Albums = ({ album, playPlaylist }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Link to={`/playlist/${album.uri.split(":")[2]}`} className="search-link">
        <div
          className="artist-card"
          onClick={() => playPlaylist(album)}
          onMouseOver={() => {
            setShow(album.id);
          }}
          onMouseLeave={() => {
            setShow();
          }}
        >
          <div className="card-inner">
            <img src={album.albumUrl} alt="artist" className="playlist-image" />
            {show === album.id && (
              <PlayIcon
                width="40"
                height="40"
                playPlaylist={() => playPlaylist(album)}
              />
            )}{" "}
          </div>
          <div className="card-outer">
            <p className="dark">{album.title}</p>
            <p className="light">By {album?.artist}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Albums;
