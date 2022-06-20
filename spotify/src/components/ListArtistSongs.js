import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { playerState } from "../recoil/atoms/playerStateAtom";
import spotifyAPI from "../spotify";
import Albums from "./Albums";
import SongRow from "./SongRow";
import TrackSearchResult from "./TrackSearchResult";

const ListArtistSongs = () => {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playerStateVal, setPlayerState] = useRecoilState(playerState);

  function chooseTrack(track) {
    if (
      playerStateVal?.playingTrack === track &&
      playerStateVal?.playing === true
    ) {
      setPlayerState({ ...playerStateVal, playingTrack: null, playing: false });
    } else {
      setPlayerState({ ...playerStateVal, playingTrack: track });
    }
    // setSearch("");
    // setLyrics("");
  }
  useEffect(() => {
    spotifyAPI.getArtistAlbums(id).then(
      function (data) {
        console.log("Artist albums", data.body);
        setAlbums(data?.body?.items);
      },
      function (err) {
        console.error(err);
      }
    );
  }, [id]);

  return (
    <div className="d-flex flex-wrap">
      {/* {tracks?.map((track, index) => (
        <TrackSearchResult
          track={track}
          key={track?.uri}
          index={index}
          chooseTrack={() => chooseTrack(track)}
          // seeall={() => seeall(songs)}
        />
      ))} */}
      {albums?.map((album) => (
        <Albums album={album} />
      ))}
    </div>
  );
};

export default ListArtistSongs;
