import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import spotifyApi from "../spotify";
import SongRow from "../components/SongRow";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import "../styles/PlayPlaylist.css";
import { getPlaylist } from "../services/spotifyFunctions";
import PlayIcon from "./PlayIcon";
import { playerState } from "../recoil/atoms/playerStateAtom";
import { playlistState } from "../recoil/atoms/playlistStateAtom";
import { headerState } from "../recoil/atoms/headerStateAtom";

const PlaylistPlayer = () => {
  const { id } = useParams();
  const ref = useRef();

  const [show, setShow] = useState();

  const [playerStateVal, setPlayerState] = useRecoilState(playerState);
  const [playList, setPlayListState] = useRecoilState(playlistState);
  const [headerStateVal, setHeaderState] = useRecoilState(headerState);

  const playPlaylist = () => {
    const urls = playList.activePlaylist.tracks.items.map(
      (item) => item.track.uri
    );
    let availableDevices;
    spotifyApi.getMyDevices().then(
      function (data) {
        availableDevices = data.body.devices[0];
        spotifyApi.transferMyPlayback([availableDevices]).then(
          function () {
            console.log("Transfering playback to " + availableDevices);
          },
          function (err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log("Something went wrong!", err);
          }
        );
        console.log(availableDevices);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
    spotifyApi.play({
      uris: urls,
    });
  };

  const playSong = (track) => {
    if (!playerStateVal?.playing) {
      setPlayerState({ ...playerStateVal, playingTrack: track });
    } else {
      setPlayerState({ ...playerStateVal, playing: false });
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
    getPlaylist({ id: id })
      .then((res) => {
        console.log("hi", res);
        setPlayListState({ ...playList, activePlaylist: res?.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="play-playlist" ref={ref} onScroll={changeNavbarColor}>
      <div
        className="body__info"
        style={{
          background: `linear-gradient(#${playList?.activePlaylist?.primary_color}, #121212 )`,
        }}
      >
        {/* <img src={playList?.activePlaylist?.images[0]?.url} alt="" /> */}
        <div className="body__infoText">
          <strong>PLAYLISTS</strong>
          <h2>{playList?.activePlaylist?.name}</h2>
          <p>{playList?.activePlaylist?.description}</p>
          <small>
            <Link to="/">{playList?.activePlaylist?.owner?.display_name}</Link>{" "}
            <span className="dot">•</span>
            <span className="p-2">
              {playList?.activePlaylist?.tracks?.items?.length} Songs,{" "}
            </span>
            <span className="p-2">
              {playList?.activePlaylist?.tracks?.items?.length} Songs
            </span>
          </small>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          <PlayIcon
            width="56"
            height="56"
            playPlaylist={() => playPlaylist()}
          />
          <MoreHorizOutlinedIcon className="more" />
        </div>
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

            {/* <th>DATE ADDED</th> */}
          </thead>
          <tbody>
            {playList?.activePlaylist?.tracks?.items?.map((item, index) => (
              <tr
                className="songRow"
                onClick={() => playSong(item.track)}
                onMouseEnter={() => setShow(item?.track?.id)}
                onMouseLeave={() => setShow()}
              >
                <SongRow
                  playSong={() => playSong(item.track)}
                  track={item.track}
                  index={index}
                  key={item?.id}
                  show={show}
                  date={item.added_at}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaylistPlayer;
