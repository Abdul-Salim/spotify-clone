import Login from "../components/Login";
import GetToken from "../components/GetToken";

const authRoutes = [
  {
    path: "/auth/get-token",
    component: GetToken,
    key: "get-token",
  },
  {
    path: "/auth/login",
    component: Login,
    key: "login",
  },
  {
    redirect: true,
    path: "/auth",
    to: "/auth/login",
    key: "redirect",
  },
];

export default authRoutes;
