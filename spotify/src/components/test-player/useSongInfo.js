import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { playerState } from "../../recoil/atoms/playerStateAtom";
import spotifyAPI from "../../spotify";
const useSongInfo = () => {
  const [songInfo, setSongInfo] = useState();
  const [playerStateVal, setPlayerState] = useRecoilState(playerState);

  useEffect(() => {
    console.log(playerStateVal?.playingTrack);
    const fetchSongInfo = async () => {
      const trackInfo = await fetch(
        `https://api.spotify.com/v1/tracks/${playerStateVal?.playingTrack?.id}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
          },
        }
      ).then((res) => res.json());
      setSongInfo(trackInfo);
    };
    fetchSongInfo();
  }, []);
  return songInfo;
};

export default useSongInfo;
