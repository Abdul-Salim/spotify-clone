import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";

import spotifyApi from "../../spotify";
import AuthRoutes from "../../routes/auth";
import { tokenState } from "../../recoil/atoms/userAtom";

function AuthLayout() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenState);

  const accessToken = localStorage.getItem("accessToken");
  const expiresIn = localStorage.getItem("expiresIn");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (
      new Date().getTime() <= expiresIn &&
      accessToken &&
      accessToken !== "undefined" &&
      refreshToken
    ) {
      spotifyApi.setAccessToken(accessToken);
      setToken(accessToken);
      navigate("/");
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
              setToken(res?.data?.accessToken);
              spotifyApi.setAccessToken(accessToken);
              navigate("/home");
            })
            .catch(() => {
              window.location = "/";
            });
        }
      } else {
        navigate("/auth");
      }
    }
  }, [accessToken, expiresIn, refreshToken]);
  return (
    <>
      <AuthRoutes />
    </>
  );
}

export default AuthLayout;
