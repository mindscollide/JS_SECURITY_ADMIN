import {
    Route,
    createRoutesFromElements,
    createHashRouter,
  } from "react-router-dom";

import Edituser from "../container/Usermanagement/EditUser/Edituser";
import Createuser from "../container/Usermanagement/CreateUser/Createuser";
import Userreport from "../container/Reports/Userreport";

import MainPage from "../container/Pages/MainPage/MainPage";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<MainPage />}>
        <Route path="" element={<Edituser />} />
        <Route path="editUser" element={<Edituser />} />
        <Route path="createUser" element={<Createuser />} />
        <Route path="userReport" element={<Userreport />} />
      </Route>
    </>
  )
);
