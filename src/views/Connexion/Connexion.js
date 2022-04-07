import React from "react";
import { Col, Row, Typography, Form, Input, Button, Checkbox } from "antd";

import * as classes from "./Connexion.module.css";

const Connexion = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row className={classes.container} align={"center"}>
      <Col span={20} style={{ height: "200px" }}>
        <Typography.Title level={2}>Bienvenue à Gourmandise </Typography.Title>
        <Typography.Title level={3} type={"secondary"}>
          Identifiez-vous
        </Typography.Title>
      </Col>
      <Col
        className={classes.card}
        xs={{ span: 20 }}
        md={{ span: 12 }}
        align="center"
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button block type="ghost" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default Connexion;
