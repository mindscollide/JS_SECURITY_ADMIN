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
  let defaultOpenKey = localStorage.getItem("defaultOpenKey ");
  let defaultSelectedKey = localStorage.getItem("defaultSelectedKey");

  console.log("defaultOpenKey", defaultOpenKey);
  console.log("defaultSelectedKey", defaultSelectedKey);

  const navigateToBankUsers = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "3");
    navigate("/Js/Admin/bankUser");
  };
  //Create User Page Name is Pending User Requests
  const navigateToPendingRequest = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "4");
    navigate("/Js/Admin/pendingRequest");
  };

  const navigateToAllUsers = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "5");
    navigate("/Js/Admin/allUser");
  };

  const navigateToCustomer = () => {
    localStorage.setItem("defaultOpenKey ", "sub2");
    localStorage.setItem("defaultSelectedKey", "6");
    navigate("/Js/Admin/addCustomer");
  };

  const navigateToUserList = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "7");
    navigate("/Js/Admin/userList");
  };

  const navigateToReport = () => {
    localStorage.setItem("defaultOpenKey ", "sub3");
    localStorage.setItem("defaultSelectedKey", "8");
    navigate("/Js/Admin/userReport");
  };

  const navigateToNatureOfBusiness = () => {
    localStorage.setItem("defaultOpenKey ", "sub4");
    localStorage.setItem("defaultSelectedKey", "9");
    navigate("/Js/Admin/natureofBusiness");
  };

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
                  defaultOpenKeys={[defaultOpenKey]}
                  defaultSelectedKeys={[defaultSelectedKey]}
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
                      onClick={navigateToBankUsers}
                    >
                      Add a Bank User
                    </Menu.Item>

                    <Menu.Item
                      className="menu-items-sidebar"
                      key="4"
                      onClick={navigateToPendingRequest}
                    >
                      Pending user requests
                    </Menu.Item>
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="5"
                      onClick={navigateToAllUsers}
                    >
                      All User
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    icon={<i className="icon-user menu-icons"></i>}
                    title="Customer Management"
                    className="submenu-sidebar-icons"
                  >
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="6"
                      onClick={navigateToCustomer}
                    >
                      Add a Customer
                    </Menu.Item>
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="7"
                      onClick={navigateToUserList}
                    >
                      Users List
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    icon={<i className="icon-user menu-icons"></i>}
                    title="Report"
                    className="submenu-sidebar-icons"
                  >
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="8"
                      onClick={navigateToReport}
                    >
                      User Report
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub4"
                    icon={<i className="icon-user menu-icons"></i>}
                    title="SetUp"
                    className="submenu-sidebar-icons"
                  >
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="9"
                      onClick={navigateToNatureOfBusiness}
                    >
                      Nature Of Business
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
