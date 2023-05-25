import React, { useState, useEffect, Fragment } from "react";
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
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Users from "../../../assets/images/Assignees-Icon.png";
import Broadcast from "../../../assets/images/6.png";
import "./Sidebar.css";

const Sidebar = () => {
  const { SubMenu } = Menu;
  const { Sider } = Layout;
  const navigate = useNavigate();

  const navigateToCreateUser = () => {
    navigate("/Js/Admin/createUser");
  };

  const navigateToEdit = () => {
    navigate("/Js/Admin/editUser");
  };

  const navigateToBankUser = () => {
    navigate("/Js/Admin/bankUser");
  };

  const navigateToCustomer = () => {
    navigate("/Js/Admin/addCustomer");
  };

  const navigateToReport = () => {
    navigate("/Js/Admin/userReport");
  };

  // when user refresh the page it's goes to the specific route
  useEffect(() => {
    navigate("/Js/Admin/editUser");
  }, []);

  return (
    <Fragment>
      <Row className="sidebar-row">
        <Col sm={4} className="js-sidebar">
          <Layout>
            <Sider
              width={250}
              style={{
                background: "#000000",
              }}
            >
              <span className="SecurityMenu">
                <Menu
                  theme="light"
                  defaultOpenKeys={["sub1"]}
                  defaultSelectedKeys={["3"]}
                  mode="inline"
                  className="Menu-sidebar-class"
                >
                  <SubMenu
                    key="sub1"
                    icon={<i className="icon-user menu-icons"></i>}
                    title="User Management"
                    className="submenu-sidebar-icons"
                  >
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="3"
                      onClick={navigateToEdit}
                    >
                      Edit User
                    </Menu.Item>
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="4"
                      onClick={navigateToCreateUser}
                    >
                      Create User
                    </Menu.Item>
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="5"
                      onClick={navigateToBankUser}
                    >
                      Add a Bank User
                    </Menu.Item>
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="6"
                      onClick={navigateToCustomer}
                    >
                      Add a Customer
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    icon={<i className="icon-user menu-icons"></i>}
                    title="Report"
                    className="submenu-sidebar-icons"
                  >
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="5"
                      onClick={navigateToReport}
                    >
                      User Report
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </span>
            </Sider>
          </Layout>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Sidebar;
