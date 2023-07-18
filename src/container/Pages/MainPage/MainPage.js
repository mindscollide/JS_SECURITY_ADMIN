import React, { Fragment, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/layout/Header/Header";
import allUser from "../../Usermanagement/AllUser/AllUsers";
import PendingUserRequest from "../../Usermanagement/PendingRequest/PendingUserRequest";
import Userreport from "../../../container/Reports/Userreport";

import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import { Row, Col } from "react-bootstrap";

const MainPage = () => {
  return (
    <Fragment>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Row>
            <Col
              sm={12}
              md={12}
              lg={12}
              style={{
                width: "100%",
              }}
              className="d-flex gap-4"
            >
              <Sidebar />
              <Outlet />
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default MainPage;
