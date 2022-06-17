import { Navigate, useRoutes } from "react-router-dom";

import Player from "../components/Player";
import Search from "../components/Search";
import PlaylistPlayer from "../components/PlaylistPlayer";
import SearchAll from "../components/SearchAll";


const PortalRoutes = () => {
  const portalRoutes = useRoutes([
    {
      path: "/library",
      element: <Player />,
    },
    {
      path: "/home",
      element: <Player />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/playlist/:id",
      element: <PlaylistPlayer />,
    },
    {
      path: "/artist/:id",
      element: <PlaylistPlayer />,
    },
    {
      path: "/search/:path/:search",
      element: <SearchAll />,
    },
    {
      path: "/",
      element: <Navigate to= "/auth" />,
    },
  ]);
  return portalRoutes;
};

export default PortalRoutes;