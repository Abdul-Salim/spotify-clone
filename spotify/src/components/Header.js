import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LaunchIcon from "@mui/icons-material/Launch";

import { useDataLayerValue } from "../context/DataLayer";
import "../styles/Header.css";
import spotifyApi from "../spotify";
import { getMe } from "../services/spotifyFunctions";
import { useHistory } from "react-router-dom";
const Header = () => {
  const [{ user, isBlack, search }, dispatch] = useDataLayerValue();
  const [isOpen, setIsOpen] = useState(false);
  const [show, handleShow] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    if (accessToken) {
      getMe()
        ?.then((res) => {
          console.log(res);
          dispatch({
            type: "SET_USER",
            user: res?.data,
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [dispatch, accessToken]);

  return (
    <div
      className={`header ${isBlack && "grey"}`}
      style={{
        justifyContent: "space-between",
        // window.location?.pathname === "/search"
        //   ? "space-between"
        //   : "flex-end",
        backgroundColor: !window.location?.pathname === "/search" && "#040404",
      }}
    >
      <div style={{ marginLeft: "50px", display: "flex" }}>
        <span className="back-icon" onClick={() => goBack()}>
          <ArrowBackIosIcon />
        </span>
        <span className="front-icon" onClick={() => history.goForward()}>
          <ArrowForwardIosIcon />
        </span>
      </div>
      {window.location?.pathname === "/search" && (
        <div className="header__left">
          {/* <div>
            <ArrowBackIosIcon />
            <ArrowForwardIosIcon />
          </div> */}
          <SearchSharpIcon />
          <input
            type="text"
            placeholder="Search for Artist, Songs "
            value={search}
            onChange={(e) => {
              dispatch({ type: "SET_SEARCH", search: e.target.value });
              // setSearch(e.target.value);
            }}
          />
        </div>
      )}
      <div className="profile" onClick={() => setIsOpen(!isOpen)}>
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
        {isOpen ? <KeyboardArrowUpSharpIcon /> : <KeyboardArrowDownSharpIcon />}
      </div>
      {isOpen ? (
        <div className="profile-menu">
          <div className="menu-item">
            <p>Account</p>
            <span>
              <LaunchIcon fontSize="small" />
            </span>
          </div>
          <div className="menu-item">
            <p>Profile</p>
          </div>
          <div className="menu-item">
            <p>Log out</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
