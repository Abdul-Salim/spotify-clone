import React from "react";

import Body from "./Body";
import "../styles/Player.css";
import spotifyApi from "../spotify";

function Player() {
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
