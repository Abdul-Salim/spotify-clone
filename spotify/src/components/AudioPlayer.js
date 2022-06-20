import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useRecoilState } from "recoil";

import { playerState } from "../recoil/atoms/playerStateAtom";

export default function AudioPlayer({ trackUri }) {
  const [play, setPlay] = useState(false);
  // const [accessToken, setAccessToken] = useState();
  const [playerStateVal, setPlayerState] = useRecoilState(playerState);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (playerStateVal.playing === false) {
      setPlay(false);
    }
  }, [playerStateVal.playing]);

  useEffect(() => {
    if (trackUri) {
      setPlay(true);
      setPlayerState({ ...playerStateVal, playing: true });
    }
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        syncExternalDevice
        callback={(state) => {
          if (!state.isPlaying) {
            setPlay(false);
            setPlayerState({ ...playerStateVal, playing: false });
          } else {
            setPlayerState({ ...playerStateVal, playing: false });
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
