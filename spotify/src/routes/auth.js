import { Navigate, useRoutes } from "react-router-dom";
import Login from "../components/Login";
import GetToken from "../components/GetToken";

const AuthRoutes = () => {
  let authRoutes = useRoutes([
    // {
    //   path: "get-token",
    //   element: <GetToken />,
    // },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "",
      element: <Navigate to="../login" />,
    },
  ]);
  return authRoutes;
};

export default AuthRoutes;
