import React, { useState, useEffect } from "react";
import { Row, Col, Nav, Container, Navbar, NavDropdown } from "react-bootstrap";
import Chat from "../../../assets/images/Comment-Icon.png";
import {
  Gear,
  ChatLeft,
  People,
  Search,
  ArrowsAngleExpand,
  X,
  ChatDots,
  Send,
  Paperclip,
} from "react-bootstrap-icons";
import JohnCater from "../../../assets/images/profile3.png";
import { Button, TextField } from "../../../components/elements";
import Users from "../../../assets/images/Assignees-Icon.png";
import Broadcast from "../../../assets/images/6.png";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  //for chat open after click sidebar chat icon
  const [openChat, setOpenChat] = useState(false);

  //for chat open logged in user
  const [openLogIn, setOpenLogIn] = useState(false);

  //for open invite user panel state
  const [openInvite, setOpenInvite] = useState(false);

  //for another chat box open
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Row className={styles["sidebar-row"]}>
        <Col sm={4} className={styles["js-sidebar"]}>
          <Nav disabled={true} className={styles["new_sidebar"]}>
            <>
              {/* ChatIcon */}
              <Nav.Link disabled={false}>
                <span className={styles["sidebar-icons-color"]}>
                  <i className="icon-settings" size={30}></i>
                </span>

                <label className={styles["sidebar-text"]}>Setup</label>
              </Nav.Link>

              {/* Logged In User */}
              <Nav.Link disabled={false}>
                <span className={styles["sidebar-icons-color"]}>
                  <i className="icon-user" size={30}></i>
                </span>
                <label className={styles["sidebar-text"]}>Reports</label>
              </Nav.Link>
            </>
          </Nav>
        </Col>
        {/* <Col sm={11} className={""}></Col> */}
      </Row>
    </>
  );
};

export default Sidebar;
