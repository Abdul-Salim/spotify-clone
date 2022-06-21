import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { playerState } from "../recoil/atoms/playerStateAtom";
import spotifyAPI from "../spotify";
import SongRow from "./SongRow";
import TrackSearchResult from "./TrackSearchResult";

const ListAlbumSongs = () => {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const [playerStateVal, setPlayerState] = useRecoilState(playerState);
  const [albumDetails, setAlbumDetails] = useState();
  const [show, setShow] = useState();

  function chooseTrack(track) {
    if (playerStateVal.playingTrack === track) {
      if (!playerStateVal?.playing) {
        setPlayerState({
          ...playerStateVal,
          playingTrack: track,
          playing: true,
        });
      } else {
        setPlayerState({ ...playerStateVal, playing: false });
      }
    } else {
      setPlayerState({ ...playerStateVal, playing: true, playingTrack: track });
    }
  }

  const playSong = (track) => {
    if (playerStateVal.playingTrack === track) {
      if (!playerStateVal?.playing) {
        setPlayerState({
          ...playerStateVal,
          playingTrack: track,
          playing: true,
        });
      } else {
        setPlayerState({ ...playerStateVal, playing: false });
      }
    } else {
      setPlayerState({ ...playerStateVal, playing: true, playingTrack: track });
    }
  };

  useEffect(() => {
    spotifyAPI
      .getAlbum(id)
      .then(function (data) {
        console.log(data);
        setAlbumDetails(data?.body);
        return data.body.tracks.items?.map(function (t) {
          return t.id;
        });
      })
      .then(function (trackIds) {
        return spotifyAPI.getTracks(trackIds);
      })
      .then(function (data) {
        console.log(data.body);
        setTracks(data?.body?.tracks);
        // spotifyAPI.play({
        //   context_uri: `spotify:album:${id}`,
        // });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="w-100 px-2 mb-5 pb-5">
      <div className="p-5 mt-5">
        <h6 className="text-white">{albumDetails?.name}</h6>
      </div>
      <div className="d-flex flex-column w-100 mb-5 search">
        {tracks?.map((track, index) => (
          <div
            onClick={() => playSong(track)}
            className="cursor-pointer"
            onMouseEnter={() => setShow(track?.id)}
            onMouseLeave={() => setShow()}
          >
            <SongRow
              playSong={() => playSong(track)}
              track={track}
              index={index}
              key={track?.id}
              show={show}
              date={track?.album?.release_date}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbumSongs;
