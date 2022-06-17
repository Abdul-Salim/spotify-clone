import Player from "../components/Player";
import Search from "../components/Search";
import Login from "../components/Login";
import PlaylistPlayer from "../components/PlaylistPlayer";
import SearchAll from "../components/SearchAll";

const portalRoutes = [
  {
    path: "/library",
    component: Player,
    exact: true,
    key: "home",
  },
  {
    path: "/home",
    component: Player,
    exact: true,
    key: "home",
  },
  {
    path: "/search",
    exact: true,
    component: Search,
    key: "search",
  },
  {
    path: "/playlist/:id",
    component: PlaylistPlayer,
    key: "search",
  },
  {
    path: "/artist/:id",
    component: PlaylistPlayer,
    key: "search",
  },
  {
    path: "/search/:path/:search",
    exact: true,
    component: SearchAll,
  },
  {
    redirect: true,
    path: "/",
    to: "/auth",
    navbarName: "Redirect",
    key: "redirect",
  },
];

export default portalRoutes;
