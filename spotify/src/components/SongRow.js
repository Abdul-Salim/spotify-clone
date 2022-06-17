import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import "../styles/SongRow.css";
import { useDataLayerValue } from "../context/DataLayer";

function SongRow({ track, playSong, index, show, date }) {
  const [{ playingTrack, playing }] = useDataLayerValue();
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <>
      <td className="song-number">
        {show === track?.id ? (
          playingTrack === track && playing === true ? (
            <PauseIcon />
          ) : (
            <PlayArrowIcon className="song-play" />
          )
        ) : (
          index + 1
        )}
      </td>
      <td className="song-title">
        <img
          className="songRow__album"
          src={track?.album?.images[0].url}
          alt=""
        />
        <span className="songRow__info">
          <h1>{track?.name}</h1>
          <p>{track?.artists?.map((artist) => artist?.name).join(", ")} - </p>
        </span>
      </td>
      <td className="song-album">{track?.album?.name}</td>
      <td className="song-date">
        {new Date(date).toISOString().split("T")[0]}
      </td>
      <td className="song-time">
        {millisToMinutesAndSeconds(track?.duration_ms)}
      </td>
    </>
  );
}

export default SongRow;
