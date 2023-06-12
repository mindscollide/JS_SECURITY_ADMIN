import React, { Fragment, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/layout/Header/Header";

import allUser from "../../Usermanagement/AllUser/AllUsers";
import PendingUserRequest from "../../Usermanagement/PendingRequest/PendingUserRequest";
import Userreport from "../../../container/Reports/Userreport";

import Sidebar from "../../../components/layout/Sidebar/Sidebar";

const MainPage = () => {
  const location = useLocation();

  return (
    <Fragment>
      <Header />
      <Sidebar />
      <Outlet />
    </Fragment>
  );
};

export default MainPage;
