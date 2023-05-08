import { useState } from "react";
import { Container, Row, Col, Nav, Dropdown } from "react-bootstrap";
import { Button, Modal } from "../../../components/elements";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../../store/actions/Auth_Actions";
import { Checkbox, Switch } from "antd";
import {
  ListUl,
  Gear,
  QuestionCircle,
  BoxArrowRight,
} from "react-bootstrap-icons";
import "./Header.css";
import JohnCater from "../../../assets/images/profile3.png";
import JsLogo from "../../../assets/images/js-logo.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Container fluid className="container-header">
        <Navbar collapseOnSelect expand="lg">
          <Container fluid>
            <Navbar.Brand>
              <img src={JsLogo} width={220} height={50} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="nav-rfq-calculator ms-auto">
                <Nav.Link>
                  <span className="d-inline-block notification icn-wrapper">
                    <i className="icon-bell icon-bell-color"></i>
                    <span className="notification-badge">25</span>
                  </span>
                </Nav.Link>
                <Nav.Link>
                  <span className="d-inline-block logout icn-wrapper">
                    <i className="icon-logout icon-bell-color"></i>
                  </span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>

            <Dropdown className="profilebtn-dropdown">
              <Dropdown.Toggle className="dropdown-toggle">
                <p className="user-name">Owais Wajid</p>
                <img src={JohnCater} className="image-john" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown_menu">
                <Dropdown.Item>
                  <Nav.Link>
                    <i className="icon-settings me-1"></i>
                    <label className="dropdown-select-labels">Setting</label>
                  </Nav.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className="icon-help-circle me-1"></i>
                  <label className="dropdown-select-labels">
                    Help & Support
                  </label>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Nav.Link>
                    <i className="icon-logout me-1"></i>
                    <label
                      className="dropdown-select-labels"
                      onClick={() => dispatch(signOut(navigate))}
                    >
                      Logout
                    </label>
                  </Nav.Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Navbar>
      </Container>
    </>
  );
};

export default Header;
