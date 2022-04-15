import React from "react";
import { Col, Row, Typography, Form, Input, Button, Checkbox, message } from "antd";
import axios from "../../services/axios"
import * as classes from "./Connexion.module.css";
const { useForm } = Form;

const Connexion = () => {
  const [form] = useForm();
  const onFinish = async (values) => {
    console.log(values)
    try {
      const { data } = await axios.get('/user/connexion.php?login=' + values.login + "&password=" + values.password);
      console.log()
      if (data.itemCount === 1) {
        localStorage.setItem('grmdConnect', true)
      }
      else {
        form.resetFields()
        message.error("Login ou mot de passe incorrect")
      }
      window.location.reload()
    } catch (error) {
      form.resetFields()
      message.error("Login ou mot de passe incorrect")

    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row className={classes.container} align={"center"}>
      <Col span={16} style={{ height: "200px" }}>
        <Typography.Title level={2}>Bienvenue à Gourmandise </Typography.Title>
        <Typography.Title level={3} type={"secondary"}>
          Identifiez-vous
        </Typography.Title>
      </Col>
      <Col
        className={classes.card}
        xs={{ span: 20 }}
        md={{ span: 8 }}
        align="center"
      >
        <Form

          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Login"
            name="login"
            rules={[{ required: true, message: "Please input your login!" }]}
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
