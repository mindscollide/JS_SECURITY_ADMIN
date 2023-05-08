import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

import Edituser from "../container/Usermanagement/EditUser/Edituser";
import Createuser from "../container/Usermanagement/CreateUser/Createuser";
import Userreport from "../container/Reports/Userreport";
import SecurityLogin from "../container/SecurityLogin/Login/SecurityLogin";
import MainPage from "../container/Pages/MainPage/MainPage";
import PrivateRoutes from "./PrivateRoute";
export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<SecurityLogin />} />
      <Route element={<PrivateRoutes />}>
        <Route exact path="/JS/Admin/" element={<MainPage />}>
          <Route path="Home" element={<Edituser />} />
          <Route path="editUser" element={<Edituser />} />
          <Route path="" element={<Edituser />} />
          <Route path="createUser" element={<Createuser />} />
          <Route path="userReport" element={<Userreport />} />
        </Route>
      </Route>
    </>
  )
);
