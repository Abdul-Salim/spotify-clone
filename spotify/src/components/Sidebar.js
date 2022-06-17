import React, { useEffect } from "react";
import "../styles/Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import LibraryMusicSharpIcon from "@mui/icons-material/LibraryMusicSharp";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useDataLayerValue } from "../context/DataLayer";
import { Link, NavLink } from "react-router-dom";
import spotifyApi from "../spotify";
function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      spotifyApi?.setAccessToken(accessToken);
      spotifyApi
        ?.getUserPlaylists()
        .then((res) => {
          dispatch({
            type: "SET_PLAYLISTS",
            playlists: res?.body,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [accessToken, dispatch]);

  return (
    <div className="sidebar">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
        className="sidebar__logo"
      />
      <NavLink to="/home" activeClassName="active-link">
        <SidebarOption title="Home" Icon={HomeOutlinedIcon} />
      </NavLink>
      <NavLink to="/search" activeClassName="active-link">
        <SidebarOption title="Search" Icon={SearchSharpIcon} />
      </NavLink>
      <NavLink to="/library" activeClassName="active-link">
        <SidebarOption title="Your Library" Icon={LibraryMusicSharpIcon} />
      </NavLink>
      <br />
      <NavLink to="/playlist/create" activeClassName="active-link">
        <SidebarOption title="Create Playlist" Icon={AddBoxRoundedIcon} />
      </NavLink>
      <NavLink to="/liked" activeClassName="active-link">
        <SidebarOption title="Liked Songs" Icon={FavoriteIcon} />
      </NavLink>
      <hr className="line" />
      <div className="playlists">
        {/* <strong className="sidebar__title">PLAYLISTS</strong> */}
        {playlists?.items?.map((playlist) => (
          <SidebarOption
            key={playlist.id}
            title={playlist.name}
            playlist={playlist}
            id={playlist.id}
          />
          // console.log(playlist.name);
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
