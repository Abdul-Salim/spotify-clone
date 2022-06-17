import React, { useEffect, useState } from "react";

import Body from "./Body";
import { useDataLayerValue } from "../context/DataLayer";

import "../styles/Player.css";
import { useNavigate } from "react-router-dom";
import spotifyApi from "../spotify";
import { getTokenFromUrl } from "../spotify";
import useSpotifyFunctions from "../hooks/useSpotifyFunctions";

function Player() {
  const [, dispatch] = useDataLayerValue();
  const [getUserPlaylists] = useSpotifyFunctions();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // const code = getTokenFromUrl();
  // useEffect(() => {
  //   if (accessToken) {
  //     const x = getUserPlaylists();
  //     console.log(x);
  //   }
  // }, []);

  return (
    <div className="player">
      <Body spotify={spotifyApi} />
    </div>
  );
}

export default Player;
