import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { playerState } from "../../recoil/atoms/playerStateAtom";
const useSongInfo = () => {
  const [songInfo, setSongInfo] = useState();
  const [playerStateVal, setPlayerState] = useRecoilState(playerState);

  useEffect(() => {
    console.log(playerStateVal?.playingTrack);
    const fetchSongInfo = () => {};
  }, []);
  return songInfo;
};

export default useSongInfo;
