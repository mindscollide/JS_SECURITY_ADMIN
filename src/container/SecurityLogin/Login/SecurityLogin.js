import React, { Fragment, useEffect, useState, useRef } from "react";
import { Container, Col, Row, InputGroup, Form } from "react-bootstrap";
import { Button, TextField, Loader } from "../../../components/elements";
import jsLogo from "../../../assets/images/js-logo.png";
import { logIn } from "../../../store/actions/Auth_Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SecurityLogin.css";
const SecurityLogin = () => {
  const { auth } = useSelector((state) => state);
  console.log(auth, "authReducerauthReducerauthReducer");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  const UserName = useRef(null);
  const Password = useRef(null);

  //state for login credentials
  const [securityCredentials, setSecurityCredentials] = useState({
    UserName: "",
    Password: "",
    fakePassword: "",
  });
  console.log("loginCredentialsloginCredentials", securityCredentials);

  // Enter key handler
  const enterKeyHandler = (event, nextInput) => {
    if (event.key === "Enter") {
      nextInput.current.focus();
    }
  };

  // credentials for email and password
  const setCredentialHandler = (e) => {
    if (e.target.name === "Password") {
      let numChars = e.target.value;
      let showText = "";
      for (let i = 0; i < numChars.length; i++) {
        showText += "•";
      }
      setSecurityCredentials({
        ...securityCredentials,
        [e.target.name]: e.target.value,
        ["fakePassword"]: showText,
      });
    } else {
      setSecurityCredentials({
        ...securityCredentials,
        [e.target.name]: e.target.value,
      });
    }
  };

  // handler for submit login
  const loginValidateHandler = (e) => {
    e.preventDefault();
    if (
      securityCredentials.UserName !== "" &&
      securityCredentials.Password !== ""
    ) {
      dispatch(logIn(securityCredentials, navigate));
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Please Fill All Credentials Fields",
      });
    }
  };

  return (
    <Fragment>
      <Col sm={12} lg={12} md={12} className="sign-in">
        <Col lg={12} md={12} sm={12} className="js-logo-image">
          <img src={jsLogo} width="150px" />
        </Col>
        <Container>
          <Row className="">
            <Col sm={12} md={12} lg={12} className="login-container">
              <Row>
                <Col sm={5} md={5} lg={5} className="center-div flex-column">
                  <Form onSubmit={loginValidateHandler}>
                    <Row>
                      <Col sm={12} md={12} lg={12}>
                        <span className="Heading-js">JS Login Portal</span>
                      </Col>
                      <Col sm={12} md={12} lg={12} className="mt-3">
                        <InputGroup className="mb-3">
                          <InputGroup.Text
                            id="basic-addon1"
                            className="Icon-Field-class"
                          >
                            <i className="icon-user"></i>
                          </InputGroup.Text>
                          <Form.Control
                            ref={UserName}
                            onKeyDown={(event) =>
                              enterKeyHandler(event, Password)
                            }
                            name="UserName"
                            autoComplete="off"
                            value={securityCredentials.UserName}
                            onChange={setCredentialHandler}
                            className="form-comtrol-textfield"
                            placeholder="Email ID"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                      </Col>
                      <Col sm={12} md={12} lg={12} className="mb-3">
                        <InputGroup>
                          <InputGroup.Text
                            id="basic-addon1"
                            className="Icon-Field-class"
                          >
                            <i className="icon-lock"></i>
                          </InputGroup.Text>
                          <Form.Control
                            ref={Password}
                            name="Password"
                            autoComplete="off"
                            onChange={setCredentialHandler}
                            className="form-comtrol-textfield-password"
                            placeholder="Password"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                      </Col>
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className="signIn-Signup-btn-col"
                      >
                        <Button text="Login" className="login-btn" />
                        <Button text="Signup" className="signup-btn" />
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>

      {auth.Loading ? <Loader /> : null}
    </Fragment>
  );
};

export default SecurityLogin;
