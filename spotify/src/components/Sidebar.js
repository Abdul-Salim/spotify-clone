import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import "../styles/Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import LibraryMusicSharpIcon from "@mui/icons-material/LibraryMusicSharp";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Link, NavLink } from "react-router-dom";
import spotifyApi from "../spotify";
import { playlistState } from "../recoil/atoms/playlistStateAtom";
import SpotifyWhiteLogo from "../assets/images/spotify-logo-white.png";

function Sidebar() {
  const accessToken = localStorage.getItem("accessToken");
  const [playList, setPlayLists] = useRecoilState(playlistState);

  useEffect(() => {
    if (accessToken) {
      spotifyApi?.setAccessToken(accessToken);
      spotifyApi
        ?.getUserPlaylists()
        .then((res) => {
          setPlayLists({ ...playList, playlist: res?.body });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [accessToken]);

  return (
    <div className="sidebar">
      <NavLink to="/" activeClassName="active-link">
        <img src={SpotifyWhiteLogo} alt="" className="sidebar__logo" />
      </NavLink>

      <NavLink to="/" activeClassName="active-link">
        <SidebarOption title="Home" Icon={HomeOutlinedIcon} />
      </NavLink>
      <NavLink to="/search" activeClassName="active-link">
        <SidebarOption title="Search" Icon={SearchSharpIcon} />
      </NavLink>
      <NavLink to="/library" activeClassName="active-link">
        <SidebarOption title="Your Library" Icon={LibraryMusicSharpIcon} />
      </NavLink>
      <br />
      <NavLink to="/create-playlist" activeClassName="active-link">
        <SidebarOption title="Create Playlist" Icon={AddBoxRoundedIcon} />
      </NavLink>
      <NavLink to="/liked" activeClassName="active-link">
        <SidebarOption title="Liked Songs" Icon={FavoriteIcon} />
      </NavLink>
      <hr className="line" />
      <div className="playlists">
        {/* <strong className="sidebar__title">PLAYLISTS</strong> */}
        {playList?.playlist?.items?.map((playlist) => (
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
