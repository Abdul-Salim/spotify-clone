import React, { useEffect } from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import axios from "axios";

import authRoutes from "../../routes/auth";
import { useDataLayerValue } from "../../context/DataLayer";
import spotifyApi from "../../spotify";

const renderComponents = (
  <Switch>
    {authRoutes.map((prop) => {
      if (prop.redirect) {
        return <Redirect from={prop.from} to={prop.to} key={prop.key} />;
      }
      return (
        <Route path={prop.path} component={prop.component} key={prop.key} />
      );
    })}
  </Switch>
);

function AuthLayout() {
  const history = useHistory();
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
      history.push("/home");
    } else {
      if (refreshToken) {
        if (new Date().getTime() >= expiresIn) {
          axios
            .post("http://localhost:3001/refresh", {
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
              history.push("/home");
            })
            .catch(() => {
              window.location = "/";
            });
        }
      }
    }
  }, [accessToken, dispatch, expiresIn, history, refreshToken]);
  return <>{renderComponents}</>;
}

export default AuthLayout;
