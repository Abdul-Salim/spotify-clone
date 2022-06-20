import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";

import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LaunchIcon from "@mui/icons-material/Launch";

import "../styles/Header.css";
import { getMe } from "../services/spotifyFunctions";
import { useNavigate } from "react-router-dom";
import { userState } from "../recoil/atoms/userAtom";
import { headerState } from "../recoil/atoms/headerStateAtom";
import CrossIcon from "../assets/images/cross-icon";

const Header = () => {
  const [headerStateVal, setHeaderState] = useRecoilState(headerState);
  const [user, setUser] = useRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const setSearch = (e) => {
    setHeaderState({ ...headerStateVal, search: e?.target?.value });
  };

  const debouncedOnChange = useCallback(
    debounce((e) => setSearch(e), 600),
    []
  );

  const onChange = (e) => {
    setSearchValue(e.target.value);
    debouncedOnChange(e);
  };

  useEffect(() => {
    if (accessToken) {
      getMe()
        ?.then((res) => {
          console.log(res);
          setUser(res?.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [accessToken]);

  return (
    <div
      className={`header ${headerStateVal?.isBlack && "grey"}`}
      style={{
        justifyContent: "space-between",
        backgroundColor: !window.location?.pathname === "/search" && "#040404",
      }}
    >
      <div className="header__left">
        <div style={{ marginLeft: "0", display: "flex" }}>
          <span className="back-icon cursor-pointer" onClick={() => goBack()}>
            <ArrowBackIosIcon />
          </span>
          <span
            className="front-icon cursor-pointer"
            onClick={() => navigate(1)}
          >
            <ArrowForwardIosIcon />
          </span>
        </div>
        {window.location?.pathname === "/search" && (
          <div className="position-relative">
            <svg
              role="img"
              height="24"
              width="24"
              class="Svg-sc-1bi12j5-0 jgfuCe mOLTJ2mxkzHJj6Y9_na_"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search for Artist, Songs "
              value={searchValue}
              onChange={onChange}
            />
            {searchValue?.length > 0 ? (
              <CrossIcon className="cross" onClick={() => setSearchValue("")} />
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <div className="profile" onClick={() => setIsOpen(!isOpen)}>
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h6 className="m-0 ms-2">{user?.display_name}</h6>
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
