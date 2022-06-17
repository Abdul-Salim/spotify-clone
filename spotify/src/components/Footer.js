import React, { useEffect, useState } from "react";

import AudioPlayer from "./AudioPlayer";
import { useDataLayerValue } from "../context/DataLayer";
import getAccessToken from "../hooks/useAuth";

import "../styles/Footer.css";

function Footer({ spotify }) {
  const [{ playingTrack }] = useDataLayerValue();

  const accessToken = localStorage.getItem("accessToken");

  // const [accessToken, setAccessToken] = useState();
  // useEffect(() => {
  //   const token = getAccessToken();
  //   setAccessToken(token);
  // }, []);
  return (
    <div className="footer">
      {accessToken && (
        <AudioPlayer accessToken={accessToken} trackUri={playingTrack?.uri} />
      )}
    </div>
  );
}

export default Footer;
