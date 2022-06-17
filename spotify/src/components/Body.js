import React, { useEffect, useState } from "react";
// import axios from "axios";

// import PlayCircleIcon from "@material-ui/icons/PlayCircleFilled";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// import PlayCircleRoundedIcon from "@material-ui/icons/PlayCircleRounded";

// import SongRow from "./SongRow";
import { useDataLayerValue } from "../context/DataLayer";

import "../styles/Body.css";
import spotifyApi from "../spotify";
import PlayIcon from "./PlayIcon";

const Body = () => {
  const [{ discover_weekly, accessToken }] = useDataLayerValue();
  const [usersTopArtists, setusersTopArtists] = useState([]);

  // const playPlaylist = (id) => {
  //   dispatch({
  //     type: "SET_PLAYING_TRACK",
  //     playingTrack: id,
  //   });
  // };
  // const playSong = (track) => {
  //   dispatch({
  //     type: "SET_PLAYING_TRACK",
  //     playingTrack: track,
  //   });
  // };
  // const chooseTrack = (track) => {
  //   dispatch({
  //     type: "SET_PLAYING_TRACK",
  //     playingTrack: track,
  //   });
  // };

  // useEffect(() => {
  //   if (!accessToken) return;
  //   spotifyApi.setAccessToken(accessToken);
  //   spotifyApi
  //     ?.getMyTopArtists()
  //     .then((data) => {
  //       let topTracks = data.body.items;
  //       setusersTopArtists(topTracks);
  //     })
  //     .catch((err) => {
  //       console.log("Something went wrong!", err);
  //     });
  // }, [accessToken]);

  return (
    <div className="body">
      <div className="body__info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLISTS</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      {usersTopArtists?.map((item) => (
        <div className="">{/* <img src={item.} */}</div>
      ))}
      <PlayIcon height="56" width="56" />
      {/* <div className="body__songs">
        <div className="body__icons">
          <PlayCircleIcon
            className="body__shuffle"
            onClick={() => playPlaylist(playlists?.items[1])}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>
        {discover_weekly?.tracks.items.map((item) => (
          <SongRow playSong={() => playSong(item.track)} track={item.track} />
        ))}
      </div> */}
    </div>
  );
};

export default Body;
