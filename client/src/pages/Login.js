import { Button, Col, Form, Input, Row, message } from "antd";
import React, { useEffect } from "react";
import "../resources/authentication.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = (values) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/users/login", values)
      .then((result) => {
        dispatch({ type: "hideLoading" });
        message.success("Login Successfull");
        //localStorage.setItem('user-auth', true);
        //localStorage.setItem('session', result.data.session);
        //console.log(result);
        //localStorage.setItem('userId', result.data._id);

        const tokenExpirationDate = new Date(
          new Date().getTime() + 1000 * 60 * 60
        );

        localStorage.setItem("userData", JSON.stringify({
          userId: result.data.user._id,
          token: result.data.token,
          expiration: tokenExpirationDate.toISOString(),
        }));

        navigate("/home");
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Something Went Wrong");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("user-auth")) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="authentication">
      <Row>
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinishHandler}>
            <h1>
              <b>POS</b>
            </h1>
            <hr />
            <h4>Login</h4>
            <Form.Item
              label="User ID"
              name="userId"
              rules={[{ required: true, message: "Please input your userId" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">
                Not Yet Registered ? Click Here to Register
              </Link>
              <Button htmlType="submit" type="primary">
                LOGIN
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
