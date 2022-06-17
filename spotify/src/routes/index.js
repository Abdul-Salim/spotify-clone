import AuthLayout from "../components/layouts/auth";
import PortalLayout from "../components/layouts/portal";

const baseRoutes = [
  {
    path: "/auth",
    component: AuthLayout,
    key: "authLayout",
  },
  {
    path: "/",
    component: PortalLayout,
    key: "portalLayout",
  },
];

export default baseRoutes;
