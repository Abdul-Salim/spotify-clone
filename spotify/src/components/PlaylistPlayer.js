import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import spotifyApi from "../spotify";
import { useDataLayerValue } from "../context/DataLayer";
import SongRow from "../components/SongRow";

import PlayCircleFilledWhiteSharpIcon from "@mui/icons-material/PlayCircleFilledWhiteSharp";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import "../styles/PlayPlaylist.css";
import { getPlaylist } from "../services/spotifyFunctions";
import PlayIcon from "./PlayIcon";

const PlaylistPlayer = () => {
  const { id } = useParams();
  const [show, setShow] = useState();

  const [{ accessToken, playing, playlist }, dispatch] = useDataLayerValue();

  const playPlaylist = () => {
    console.log(playlist);
    const urls = playlist.tracks.items.map((item) => item.track.uri);
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
    // dispatch({
    //   type: "SET_PLAYING_TRACK",
    //   playingTrack: playlist,
    // });
  };
  const playSong = (track) => {
    if (!playing) {
      dispatch({
        type: "SET_PLAYING_TRACK",
        playingTrack: track,
      });
    } else {
      dispatch({
        type: "SET_PLAY",
        isPlaying: false,
      });
    }
  };

  useEffect(() => {
    getPlaylist({ id: id })
      .then((res) => {
        console.log("hi", res);
        dispatch({
          type: "SET_PLAYLIST",
          playlist: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, id]);

  return (
    <div className="play-playlist">
      <div
        className="body__info"
        style={{
          background: `linear-gradient(#${playlist?.primary_color}, #121212 )`,
        }}
      >
        <img src={playlist?.images[0].url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLISTS</strong>
          <h2>{playlist?.name}</h2>
          <p>{playlist?.description}</p>
          <small>
            <Link to="/">{playlist?.owner?.display_name}</Link>{" "}
            <span className="dot">•</span>
            <span className="p-2">
              {playlist?.tracks?.items?.length} Songs,{" "}
            </span>
            <span className="p-2">{playlist?.tracks?.items?.length} Songs</span>
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
          {/* <FavoriteBorderOutlinedIcon fontSize="large" /> */}
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
            {console.log(playlist)}
            {playlist?.tracks.items.map((item, index) => (
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
