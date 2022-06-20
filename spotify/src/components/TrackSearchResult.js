import React, { useState } from "react";
import { useRecoilState } from "recoil";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import { playerState } from "../recoil/atoms/playerStateAtom";

export default function TrackSearchResult({ track, chooseTrack, index }) {
  const [show, setShow] = useState();
  const [playerStateVal, setPlayerState] = useRecoilState(playerState);
  function handlePlay() {
    console.log(track);
    chooseTrack(track);
  }

  const showPlayorPause = (id) => {
    if (show === id) {
      if (playerStateVal?.playingTrack?.id === id) {
        if (playerStateVal?.playing) return <PauseIcon />;
        else
          return (
            <PlayArrowIcon sx={{ padding: 0, margin: 0, fontSize: "12px" }} />
          );
      } else {
        return <PlayArrowIcon />;
      }
    } else {
      return "";
    }

    // spotifyApi.getMyCurrentPlaybackState().then(
    //   function (data) {
    //     // Output items
    //     if (data.body && data.body.is_playing) {
    //       console.log(
    //         "User is currently playing something!",
    //         data.body.item.id,
    //         id
    //       );
    //     } else {
    //       console.log("User is not playing anything, or doing so in private.");
    //     }
    //   },
    //   function (err) {
    //     console.log("Something went wrong!", err);
    //   }
    // );
    // if(id === show) {
    //   if()
    // }
  };
  return (
    <div
      className="songRow"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
      onMouseEnter={() => setShow(track?.id)}
      onMouseLeave={() => setShow()}
    >
      <p className="mx">
        {show === track?.id ? (
          playerStateVal?.playingTrack === track &&
          playerStateVal?.playing === true ? (
            <PauseIcon />
          ) : (
            <PlayArrowIcon className="song-play" />
          )
        ) : (
          index + 1
        )}
      </p>
      <img
        src={track?.albumUrl}
        // style={{ height: "64px", width: "64px" }}
        className="songRow__album"
        alt="album"
      />
      <div className="songRow__info">
        <div>{track?.title}</div>
        <div className="text-muted">{track?.artist}</div>
      </div>
    </div>
  );
}
