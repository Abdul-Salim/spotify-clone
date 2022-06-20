import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import spotifyApi from "../spotify";
import SongRow from "../components/SongRow";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import "../styles/PlayPlaylist.css";
import { getPlaylist } from "../services/spotifyFunctions";
import PlayIcon from "./PlayIcon";
import { playerState } from "../recoil/atoms/playerStateAtom";
import { headerState } from "../recoil/atoms/headerStateAtom";
import { activePlaylist } from "../recoil/atoms/activePlaylistAtom";

const PlaylistPlayer = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const ref = useRef();

  const [show, setShow] = useState();
  const [playerStateVal, setPlayerState] = useRecoilState(playerState);
  const [active, setActivePlaylist] = useRecoilState(activePlaylist);
  const [headerStateVal, setHeaderState] = useRecoilState(headerState);
  const accessToken = localStorage.getItem("accessToken");
  console.log(active);
  const playPlaylist = () => {
    const urls = active?.tracks.items.map((item) => item.track.uri);
    let availableDevices;
    spotifyApi.getMyDevices().then(
      function (data) {
        availableDevices = data.body.devices[0];
        spotifyApi.transferMyPlayback([availableDevices]).then(
          function () {
            console.log("Transfering playback to " + availableDevices);
          },
          function (err) {
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

  const changeNavbarColor = () => {
    if (ref.current.scrollTop >= 80) {
      setHeaderState({ ...headerStateVal, isBlack: true });
    } else {
      setHeaderState({ ...headerStateVal, isBlack: false });
    }
  };

  useEffect(() => {
    if (pathname.split("/")[1] === "playlist") {
      getPlaylist({ id: id })
        .then((res) => {
          console.log(res);
          setActivePlaylist(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (pathname.split("/")[1] === "artist") {
      spotifyApi.getArtistAlbums(id).then(
        function (data) {
          console.log("Artist albums", data.body);
        },
        function (err) {
          console.error(err);
        }
      );
    }
  }, [id]);

  return (
    <div className="play-playlist" ref={ref} onScroll={changeNavbarColor}>
      <div
        className="body__info"
        style={{
          background: `linear-gradient(#${active?.primary_color}, #121212 )`,
        }}
      >
        <div className="d-flex">
          <div>
            <img
              className=""
              height={192}
              width={192}
              src={active?.images ? active?.images[0]?.url : ""}
            />
          </div>
          <div className="body__infoText ms-2 mt-5">
            <strong>PLAYLISTS</strong>
            <h2>{active?.name}</h2>
            <p>{active?.description}</p>
            <small>
              <Link to="/">{active?.owner?.display_name}</Link>{" "}
              <span className="dot">•</span>
              <span className="p-2">
                {active?.tracks?.items?.length} Songs,{" "}
              </span>
              <span className="p-2">{active?.tracks?.items?.length} Songs</span>
            </small>
          </div>
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
          </thead>
          <tbody>
            {active?.tracks?.items?.map((item, index) => (
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
