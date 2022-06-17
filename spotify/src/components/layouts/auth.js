import React, { useEffect } from "react";
import { Route, Redirect, useNavigate,  } from "react-router-dom";
import axios from "axios";

import { useDataLayerValue } from "../../context/DataLayer";
import spotifyApi from "../../spotify";
import AuthRoutes from "../../routes/auth";

function AuthLayout() {
  const navigate = useNavigate();
  const [{}, dispatch] = useDataLayerValue();
  const accessToken = localStorage.getItem("accessToken");
  const expiresIn = localStorage.getItem("expiresIn");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    // if (isNaN(expiresIn) || accessToken === "undefined" || !refreshToken)
    //   return;
    if (
      new Date().getTime() <= expiresIn &&
      accessToken &&
      accessToken !== "undefined"
    ) {
      spotifyApi.setAccessToken(accessToken);
      dispatch({
        type: "SET_TOKEN",
        accessToken: accessToken,
      });
      navigate("/home");
    } else {
      if (refreshToken) {
        if (new Date().getTime() >= expiresIn) {
          axios
            .post("http://localhost:4000/refresh", {
              refreshToken,
            })
            .then((res) => {
              console.log(res);
              localStorage.setItem("accessToken", res?.data?.accessToken);
              const expires =
                new Date().getTime() + res?.data?.expiresIn * 1000;

              localStorage.setItem("expiresIn", expires);
              dispatch({
                type: "SET_TOKEN",
                accessToken: res?.data?.accessToken,
              });
              spotifyApi.setAccessToken(accessToken);
              navigate("/home");
            })
            .catch(() => {
              window.location = "/";
            });
        }
      }
    }
  }, [accessToken, dispatch, expiresIn, refreshToken]);
  return <><AuthRoutes /></>;
}

export default AuthLayout;
