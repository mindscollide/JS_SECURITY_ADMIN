import { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Dropdown } from "react-bootstrap";
import { Button, Modal } from "../../../components/elements";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../../store/actions/Auth_Actions";
import { getNewUserRequestsCount } from "../../../store/actions/Security_Admin";
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
  const { securitReducer } = useSelector((state) => state);
  const roleID = parseInt(localStorage.getItem("roleID"));

  const [countState, setCountState] = useState(0);
  console.log(securitReducer.NewUserCountData, "securitReducersecuritReducer");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let defaultOpenKey = localStorage.getItem("defaultOpenKey ");
  let defaultSelectedKey = localStorage.getItem("defaultSelectedKey");

  console.log("defaultOpenKey", defaultOpenKey);
  console.log("defaultSelectedKey", defaultSelectedKey);

  // For Api hit on refresh page
  useEffect(() => {
    dispatch(getNewUserRequestsCount(navigate, roleID));
  }, []);

  useEffect(() => {
    if (
      securitReducer.NewUserCountData !== undefined &&
      securitReducer.NewUserCountData !== null
    ) {
      setCountState(securitReducer.NewUserCountData);
    }
  }, [securitReducer.NewUserCountData]);

  // navigate to pending Request page
  const navigateToCreatePage = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "4");
    navigate("/JS/Admin/pendingRequest");
  };

  return (
    <>
      <Container fluid>
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
                    <i
                      className="icon-bell icon-bell-color"
                      onClick={navigateToCreatePage}
                    >
                      {" "}
                    </i>
                    <span className="notification-badge">{countState}</span>
                  </span>
                </Nav.Link>
                <Nav.Link>
                  <span className="d-inline-block logout icn-wrapper">
                    <i
                      className="icon-logout icon-bell-color"
                      onClick={() => dispatch(signOut(navigate))}
                    ></i>
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
                {/* <Dropdown.Item>
                  <Nav.Link>
                    <i className="icon-logout me-1"></i>
                    <label
                      className="dropdown-select-labels"
                      
                    >
                      Logout
                    </label>
                  </Nav.Link>
                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Navbar>
      </Container>
    </>
  );
};

export default Header;
