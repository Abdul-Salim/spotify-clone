import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { playerState } from "../../recoil/atoms/playerStateAtom";
import spotifyAPI from "../../spotify";

const Player = () => {
  const [playerStateVal, setPlayerState] = useRecoilState(playerState);

  const [volume, setVolume] = useState(50);

  const fetchCurrentSong = () => {
    spotifyAPI.getMyCurrentPlayingTrack().then((data) => {
      setPlayerState({ ...playerStateVal, playingTrack: data?.body?.item });
    });

    spotifyAPI.getMyCurrentPlaybackState().then((data) => {
      setPlayerState({ ...playerStateVal, playing: data?.body?.is_playing });
    });
  };

  useEffect(() => {
    if (!playerStateVal?.playingTrack) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [playerStateVal, spotifyAPI]);
  return (
    <div>
      <div>
        <img src={playerStateVal?.playingTrack?.images[2]?.url} alt="" />
      </div>
    </div>
  );
};

export default Player;
