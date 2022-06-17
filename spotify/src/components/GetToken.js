import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDataLayerValue } from "../context/DataLayer";
import spotifyApi from "../spotify";
import CircularProgress from "@mui/material/CircularProgress";

const GetToken = () => {
  const history = useHistory();
  const [, dispatch] = useDataLayerValue();
  const [loading, setLoading] = useState(false);
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      axios
        .post("http://localhost:3001/login", {
          code,
        })
        .then((res) => {
          localStorage.setItem("refreshToken", res?.data?.refreshToken);
          localStorage.setItem("accessToken", res?.data?.accessToken);
          const expires = new Date().getTime() + res?.data?.expiresIn * 1000;
          localStorage.setItem("expiresIn", expires);
          // setAccessToken(res.data.accessToken);
          dispatch({
            type: "SET_TOKEN",
            accessToken: res.data.accessToken,
          });
          spotifyApi.setAccessToken(res?.data?.accessToken);
          setLoading(false);
          history.push("/home");
        })
        .catch(() => {
          setLoading(false);
          window.location = "/";
        });
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [code, dispatch, history]);

  // useEffect(() => {
  //   if (accessToken) {
  //     console.log("upto this is ok");
  //     dispatch({
  //       type: "SET_TOKEN",
  //       accessToken: accessToken,
  //     });
  //     history.push("/home");
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
