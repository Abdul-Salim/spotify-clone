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
import SpotifyWhiteLogo from "../assets/images/spotify-logo-white.png";
import { allPlaylists } from "../recoil/atoms/playlistStateAtom";

function Sidebar() {
  const accessToken = localStorage.getItem("accessToken");
  const [playList, setPlayLists] = useRecoilState(allPlaylists);

  // useEffect(() => {
  //   if (accessToken) {
  //     spotifyApi?.setAccessToken(accessToken);
  //     spotifyApi
  //       ?.getUserPlaylists()
  //       .then((res) => {
  //         setPlayLists({ ...playList, playlist: res?.body });
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   }
  // }, [accessToken]);

  return (
    <div className="sidebar">
      <NavLink to="/">
        <img src={SpotifyWhiteLogo} alt="" className="sidebar__logo" />
      </NavLink>

      <NavLink to="/">
        <SidebarOption title="Home" Icon={HomeOutlinedIcon} />
      </NavLink>
      <NavLink to="/search">
        <SidebarOption title="Search" Icon={SearchSharpIcon} />
      </NavLink>
      <NavLink to="/library">
        <SidebarOption title="Your Library" Icon={LibraryMusicSharpIcon} />
      </NavLink>
      <br />
      <NavLink to="/create-playlist">
        <SidebarOption title="Create Playlist" Icon={AddBoxRoundedIcon} />
      </NavLink>
      <NavLink to="/liked">
        <SidebarOption title="Liked Songs" Icon={FavoriteIcon} />
      </NavLink>
      <hr className="line" />
      <div className="playlists">
        {/* <strong className="sidebar__title">PLAYLISTS</strong> */}
        {playList?.items?.map((playlist) => (
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
