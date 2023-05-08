import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  let RoleID = localStorage.getItem("roleID");
  const currentUser = RoleID === "2" ? true : false;
  const token = JSON.parse(localStorage.getItem("token"));
  return currentUser && token ? <Outlet /> : <Navigate to="*" />;
};
export default PrivateRoutes;
