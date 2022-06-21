import { useRoutes } from "react-router-dom";
import GetToken from "../components/GetToken";
import AuthLayout from "../components/layouts/auth";
import PortalLayout from "../components/layouts/portal";

const BaseRoutes = () => {
  let baseRoutes = useRoutes([
    {
      path: "auth/*",
      element: <AuthLayout />,
    },
    {
      path: "redirect/*",
      element: <GetToken />,
    },
    {
      path: "/*",
      element: <PortalLayout />,
    },
  ]);
  return baseRoutes;
};
export default BaseRoutes;
