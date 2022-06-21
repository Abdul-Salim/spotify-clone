import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import spotifyApi from "../spotify";
import { useDataLayerValue } from "../context/DataLayer";

const useSpotifyFucntions = () => {
  const navigate = useNavigate();
  const [, dispatch] = useDataLayerValue();

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const expiresIn = localStorage.getItem("expiresIn");
  if (refreshToken === null || !refreshToken) {
    console.log("fjfjfjfj");
    navigate("/auth");
  } else if (
    new Date().getTime() >= expiresIn ||
    isNaN(expiresIn) ||
    accessToken === "undefined"
  ) {
    console.log(expiresIn, accessToken, refreshToken);
    axios
      .post(`${process.env.REACT_APP_API_URL}/refresh`, {
        refreshToken,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res?.data?.accessToken);
        const expires = new Date().getTime() + res?.data?.expiresIn * 1000;
        localStorage.setItem("expiresIn", expires);
        spotifyApi.setAccessToken(res?.data?.accessToken);
        dispatch({
          type: "SET_TOKEN",
          accessToken: res.data.accessToken,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getUserPlaylists = () => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi
        .getUserPlaylists()
        .then((response) => {
          dispatch({
            type: "SET_PLAYLISTS",
            playlists: response?.body,
          });
          return response.body;
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return [getUserPlaylists];
};

export default useSpotifyFucntions;
