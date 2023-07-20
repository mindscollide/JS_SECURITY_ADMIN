import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Nav, Container, Navbar, NavDropdown } from "react-bootstrap";
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

  let defaultKeySidebar = localStorage.getItem("defaultSelectedKey");

  return (
    <Row>
      <Col lg={12} md={12} sm={12}>
        <Layout>
          <Sider width={250}>
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
                title="Bank Management"
                className="submenu-sidebar-icons"
              >
                <Menu.Item
                  className={
                    defaultKeySidebar !== "3"
                      ? "menu-items-sidebar noDefault"
                      : "menu-items-sidebar"
                  }
                  key="3"
                  onClick={navigateToBankUsers}
                >
                  Add a Bank User
                </Menu.Item>

                <Menu.Item
                  className={
                    defaultKeySidebar === "4"
                      ? "ant-menu-item ant-menu-item-selected ant-menu-item-only-child menu-items-sidebar"
                      : "menu-items-sidebar"
                  }
                  key="4"
                  onClick={navigateToPendingRequest}
                >
                  Pending user requests
                </Menu.Item>
                <Menu.Item
                  className={
                    defaultKeySidebar !== "5"
                      ? "menu-items-sidebar noDefault"
                      : "menu-items-sidebar"
                  }
                  key="5"
                  onClick={navigateToAllUsers}
                >
                  Bank User List
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                icon={<i className="icon-user menu-icons"></i>}
                title="Customer Management"
                className="submenu-sidebar-icons"
              >
                <Menu.Item
                  className={
                    defaultKeySidebar !== "6"
                      ? "menu-items-sidebar noDefault"
                      : "menu-items-sidebar"
                  }
                  key="6"
                  onClick={navigateToCustomer}
                >
                  Add a Customer
                </Menu.Item>
                <Menu.Item
                  className={
                    defaultKeySidebar !== "7"
                      ? "menu-items-sidebar noDefault"
                      : "menu-items-sidebar"
                  }
                  key="7"
                  onClick={navigateToUserList}
                >
                  Customer Users List
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<i className="icon-user menu-icons"></i>}
                title="Report"
                className="submenu-sidebar-icons"
              >
                <Menu.Item
                  className={
                    defaultKeySidebar !== "8"
                      ? "menu-items-sidebar noDefault"
                      : "menu-items-sidebar"
                  }
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
                  className={
                    defaultKeySidebar !== "9"
                      ? "menu-items-sidebar noDefault"
                      : "menu-items-sidebar"
                  }
                  key="9"
                  onClick={navigateToNatureOfBusiness}
                >
                  Nature Of Business
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        </Layout>
      </Col>
    </Row>
  );
};

export default Sidebar;
