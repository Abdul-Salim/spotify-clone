import React, { useState } from "react";
import { Link } from "react-router-dom";
import spotifyAPI from "../spotify";
import PlayIcon from "./PlayIcon";

const Albums = ({ album, playPlaylist }) => {
  const [show, setShow] = useState(false);
  const call = () => {
    spotifyAPI
      .getAlbum(album?.id)
      .then(function (data) {
        console.log(data);
        return data.body.tracks.items?.map(function (t) {
          return t.id;
        });
      })
      .then(function (trackIds) {
        return spotifyAPI.getTracks(trackIds);
      })
      .then(function (data) {
        console.log(data.body);
        spotifyAPI.play({
          context_uri: album?.uri,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div>
      <Link to={`/albums/${album.uri.split(":")[2]}`} className="search-link">
        <div
          className="artist-card"
          // onClick={() => call()}
          onMouseOver={() => {
            setShow(album.id);
          }}
          onMouseLeave={() => {
            setShow();
          }}
        >
          <div className="card-inner">
            <img
              src={album.albumUrl || album?.images[0]?.url}
              alt="artist"
              className="playlist-image"
            />
            {show === album.id && (
              <PlayIcon
                width="40"
                height="40"
                playPlaylist={() => playPlaylist(album)}
              />
            )}{" "}
          </div>
          <div className="card-outer">
            <p className="dark m-0 mt-1">
              {(album.title?.length > 15
                ? album.title?.substring(0, 15) + "..."
                : album.title) ||
                (album.name?.length > 15
                  ? album.name?.substring(0, 15) + "..."
                  : album.name)}
            </p>
            <p className="light m-0">
              By{" "}
              {album?.artist || album?.artists?.map((artist) => artist?.name)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Albums;
