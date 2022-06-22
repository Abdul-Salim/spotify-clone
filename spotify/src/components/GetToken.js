import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import spotifyApi from "../spotify";
import CircularProgress from "@mui/material/CircularProgress";
import { tokenState } from "../recoil/atoms/userAtom";

const GetToken = () => {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenState);

  const [loading, setLoading] = useState(false);
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    setLoading(true);
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}/login`, {
    //     code,
    //   })
    //   .then((res) => {
    //     localStorage.setItem("refreshToken", res?.data?.refreshToken);
    //     localStorage.setItem("accessToken", res?.data?.accessToken);
    //     const expires = new Date().getTime() + res?.data?.expiresIn * 1000;
    //     localStorage.setItem("expiresIn", expires);
    //     spotifyApi.setAccessToken(res?.data?.accessToken);
    //     spotifyApi.setRefreshToken(res?.data?.refreshToken);
    //     setToken(res?.data?.accessToken);
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     navigate("/auth");
    //   });
    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        console.log(data);
        localStorage.setItem("refreshToken", data.body.refresh_token);
        localStorage.setItem("accessToken", data.body.access_token);
        const expires = new Date().getTime() + data.body.expires_in * 1000;
        localStorage.setItem("expiresIn", expires);
        spotifyApi.setAccessToken(data.body.access_token);
        spotifyApi.setRefreshToken(data.body.refresh_token);
        setToken(data.body.access_token);
        navigate("/");
      })
      .catch((err) => {
        navigate("/auth");
      });
  }, [code]);

  // useEffect(() => {
  //   if (accessToken) {
  //     console.log("upto this is ok");
  //     dispatch({
  //       type: "SET_TOKEN",
  //       accessToken: accessToken,
  //     });
  //     navigate("/home");
  //   }
  // }, [accessToken, dispatch, history]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      Logging you in {loading && <CircularProgress />}
    </div>
  );
};

export default GetToken;
