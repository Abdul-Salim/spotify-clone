import { Navigate, useRoutes } from "react-router-dom";

import Player from "../components/Player";
import Search from "../components/Search";
import PlaylistPlayer from "../components/PlaylistPlayer";
import SearchAll from "../components/SearchAll";
import Library from "../components/Library";

const PortalRoutes = () => {
  const portalRoutes = useRoutes([
    {
      path: "home",
      element: <Player />,
    },
    {
      path: "create-playlist",
      element: <Player />,
    },
    {
      path: "search",
      element: <Search />,
    },
    {
      path: "playlist/:id",
      element: <PlaylistPlayer />,
    },
    {
      path: "artist/:id",
      element: <PlaylistPlayer />,
    },
    {
      path: "search/:path/:search",
      element: <SearchAll />,
    },
    {
      path: "library",
      element: <Library />,
    },
    {
      path: "/",
      element: <Player />,
    },
  ]);
  return portalRoutes;
};

export default PortalRoutes;
