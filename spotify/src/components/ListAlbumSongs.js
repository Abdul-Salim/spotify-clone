import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { headerState } from "../recoil/atoms/headerStateAtom";
import { playerState } from "../recoil/atoms/playerStateAtom";
import spotifyAPI from "../spotify";
import SongRow from "./SongRow";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ListAlbumSongs = () => {
  const { id } = useParams();
  const ref = useRef();
  const [tracks, setTracks] = useState([]);
  const [playerStateVal, setPlayerState] = useRecoilState(playerState);
  const [headerStateVal, setHeaderState] = useRecoilState(headerState);

  const [albumDetails, setAlbumDetails] = useState();
  const [show, setShow] = useState();

  const playSong = (track) => {
    console.log(track);
    if (playerStateVal.playingTrack === track) {
      if (!playerStateVal?.playing) {
        setPlayerState({
          ...playerStateVal,
          playingTrack: track,
          playing: true,
        });
        spotifyAPI.play();
      } else {
        spotifyAPI.pause();
        setPlayerState({ ...playerStateVal, playing: false });
      }
    } else {
      spotifyAPI.play({
        uris: [track?.uri],
      });
      setPlayerState({ ...playerStateVal, playing: true, playingTrack: track });
    }
  };

  const changeNavbarColor = () => {
    if (ref.current.scrollTop >= 80) {
      setHeaderState({ ...headerStateVal, isBlack: true });
    } else {
      setHeaderState({ ...headerStateVal, isBlack: false });
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
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="play-playlist" ref={ref} onScroll={changeNavbarColor}>
      <div
        className="body__info"
        style={
          {
            // background: `linear-gradient(#${active?.primary_color}, #121212 )`,
          }
        }
      >
        <div className="d-flex">
          <div>
            {/* <img
              className=""
              height={192}
              width={192}
              src={active?.images ? active?.images[0]?.url : ""}
            /> */}
          </div>
          <div className="body__infoText ms-2 mt-5">
            <strong>PLAYLISTS</strong>
            {/* <h2>{active?.name}</h2>
            <p>{active?.description}</p>
            <small>
              <Link to="/">{active?.owner?.display_name}</Link>{" "}
              <span className="dot">•</span>
              <span className="p-2">
                {active?.tracks?.items?.length} Songs,{" "}
              </span>
              <span className="p-2">{active?.tracks?.items?.length} Songs</span>
            </small> */}
          </div>
        </div>
      </div>
      <div className="body__songs">
        {/* <div className="body__icons">
          <PlayIcon
            width="56"
            height="56"
            playPlaylist={() => playPlaylist()}
          />
          <MoreHorizOutlinedIcon className="more" />
        </div> */}
        <table className="songs">
          <thead>
            <tr className="songs-head">
              <th className="song-number">#</th>
              <th className="song-title">TITLE</th>
              <th className="song-album">ALBUM</th>
              <th className="song-date">DATE ADDED</th>
              <th className="song-time">
                <AccessTimeIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {tracks?.map((track, index) => (
              <tr
                className="songRow"
                onClick={() => playSong(track)}
                onMouseEnter={() => setShow(track?.id)}
                onMouseLeave={() => setShow()}
              >
                <SongRow
                  track={track}
                  index={index}
                  key={track?.id}
                  show={show}
                  date={track?.album?.release_date}
                />
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="w-100 px-2 mb-5 pb-5">
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
    </div> */}
      </div>
    </div>
  );
};

export default ListAlbumSongs;
