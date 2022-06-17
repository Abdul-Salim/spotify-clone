// import { useDataLayerValue } from "../context/DataLayer";
// import { Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import { useEffect } from "react";

// function PrivateRoute({ children, accessToken }) {
//   return accessToken ? children : <Navigate to="/" />;
// }
// export default PrivateRoute;
import React from "react";
import { Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const PrivateRoute = ({
  component: Component,
  redirectTo,
  isAuth,
  path,
  spotify,
  ...props
}) => {
  if (!isAuth) {
    return <Navigate to={redirectTo} />;
  }
  return <Route path={path} element={<Component />} />;
};

export default PrivateRoute;
