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
    <div className="search">
      <div style={{ marginTop: "80px" }}>
        <div className="search-results">
          <div className="result-head">
            <h2 className="head">Artist</h2>
          </div>
          <div className="search-result-artist">
            {albums?.map((album) => (
              <Albums album={album} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListArtistSongs;
