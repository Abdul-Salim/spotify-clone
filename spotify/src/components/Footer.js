import React from "react";
import { useRecoilValue } from "recoil";

import AudioPlayer from "./AudioPlayer";

import "../styles/Footer.css";
import { playerState } from "../recoil/atoms/playerStateAtom";

function Footer() {
  const { playingTrack } = useRecoilValue(playerState);
  const accessToken = localStorage.getItem("accessToken");

  return (
    <div className="footer">
      {accessToken && (
        <AudioPlayer accessToken={accessToken} trackUri={playingTrack?.uri} />
      )}
    </div>
  );
}

export default Footer;
