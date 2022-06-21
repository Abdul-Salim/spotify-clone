import React from "react";
import { useRecoilValue } from "recoil";

import AudioPlayer from "./AudioPlayer";

import "../styles/Footer.css";
import { playerState } from "../recoil/atoms/playerStateAtom";
import SpotifyPlayer from "./test-player/Player";

function Footer() {
  const { playingTrack } = useRecoilValue(playerState);
  const accessToken = localStorage.getItem("accessToken");

  return (
    accessToken && (
      // <AudioPlayer accessToken={accessToken} trackUri={playingTrack?.uri} />
      <SpotifyPlayer />
    )
  );
}

export default Footer;
