import { Button, Col, Form, Input, Row, message } from "antd";
import React, { useEffect } from "react";
import "../resources/authentication.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = (values) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/users/register", values)
      .then((result) => {
        dispatch({ type: "hideLoading" });
        message.success("Registration Successfull");
        navigate("/login");
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Something Went Wrong");
      });
  };

  useEffect(() => {
    if(localStorage.getItem('user-auth')){
        navigate('/home');
    }
  }, [])

  return (
    <div className="authentication">
      <Row>
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinishHandler}>
            <h1>
              <b>POS</b>
            </h1>
            <hr />
            <h4>Register</h4>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="User ID"
              name="userId"
              rules={[{ required: true, message: "Please input your User ID" }]}
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
              <Link to="/login">Already Registered ? Click Here to Login</Link>
              <Button htmlType="submit" type="primary">
                REGISTER
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
