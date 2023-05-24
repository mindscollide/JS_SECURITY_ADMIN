import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  let RoleID = localStorage.getItem("roleID");
  const currentUser = JSON.parse(RoleID) === 5 ? true : false;
  const token = JSON.parse(localStorage.getItem("token"));
  return currentUser && token ? <Outlet /> : <Navigate to="*" />;
};
export default PrivateRoutes;
