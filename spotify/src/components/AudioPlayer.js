import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
// import { getAccessToken } from "../helpers/api";
import { useDataLayerValue } from "../context/DataLayer";

import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

export default function AudioPlayer({ trackUri }) {
  const [play, setPlay] = useState(false);
  // const [accessToken, setAccessToken] = useState();
  const [{ playlist, playingTrack, playing }, dispatch] = useDataLayerValue();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (playing === false) {
      setPlay(false);
    }
  }, [playing]);

  const playNext = () => {
    let nextTrack;
    playlist?.tracks.items.forEach((item, index) => {
      if (item?.track?.id === playingTrack?.id) {
        if (index < playlist.tracks.items.length - 1) {
          nextTrack = playlist.tracks.items[index + 1].track;
        }
      }
    });
    dispatch({
      type: "SET_PLAYING_TRACK",
      playingTrack: nextTrack,
    });
  };

  const playPrevious = () => {
    let previousTrack;
    playlist?.tracks.items.forEach((item, index) => {
      if (item?.track.id === playingTrack.id) {
        if (index > 0) {
          previousTrack = playlist?.tracks.items[index - 1].track;
        }
      }
    });
    dispatch({
      type: "SET_PLAYING_TRACK",
      playingTrack: previousTrack,
    });
  };

  useEffect(() => {
    if (trackUri) {
      setPlay(true);
      dispatch({ type: "SET_PLAY", isPlaying: true });
    }
  }, [dispatch, trackUri]);

  if (!accessToken) return null;
  return (
    <>
      {/* <span className="previous" onClick={() => playPrevious()}>
        <SkipPreviousIcon sx={{ color: "#fff" }} />
      </span> */}
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        syncExternalDevice
        callback={(state) => {
          if (!state.isPlaying) {
            setPlay(false);
            dispatch({ type: "SET_PLAY", isPlaying: false });
          } else {
            dispatch({ type: "SET_PLAY", isPlaying: true });
          }
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
        styles={{
          bgColor: "#282828",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#B3B3B3",
          sliderTrackColor: "#535353",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
          sliderHandleColor: "#B3B3B3",
        }}
      />
      {/* <span className="next" onClick={() => playNext()}>
        <SkipNextIcon sx={{ color: "#fff" }} />
      </span> */}
    </>
  );
}
