import React from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */
const { Option } = Select;
const Questions = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form
      wrapperCol={16}
      layout="vertical"
      labelAlign="left"
      name="point_de_vente"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={"Label"}
        label="label"
        rules={[
          {
            required: true,
            message: "Tapez le nom de poit de vente !",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="region"
        rules={[
          {
            required: true,
            message: "Sélectionner votre region !",
          },
        ]}
      >
        <Select name="region" placeholder={"Sélectionner"}>
          <Option value={"Nabeul"}>Nabeul</Option>
          <Option value={"Zagoune"}>Zagoune</Option>
          <Option value={"Tunis"}>Tunis</Option>
          <Option value={"Ariana"}>Ariana</Option>
          <Option value={"Ben Arous"}>Ben Arous</Option>
          <Option value={"Bizerte"}>Bizerte</Option>
          <Option value={"Manouba"}>Manouba</Option>
          <Option value={"Sousse"}>Sousse</Option>
          <Option value={"Mounastir"}>Mounastir</Option>
          <Option value={"Jendouba"}>Jendouba</Option>
          <Option value={"Seliana"}>Seliana</Option>
          <Option value={"Beja"}>Beja</Option>
          <Option value={"Le Kef"}>Le Kef</Option>
          <Option value={"Ben Arous"}>Ben Arous</Option>
          <Option value={"Tatouine"}>Tatouine</Option>
          <Option value={"Gbeli"}>Gbeli</Option>
          <Option value={"Kairouane"}>Kairouane</Option>
          <Option value={"Gafsa"}>Gafsa</Option>
          <Option value={"Tozeur"}>Tozeur</Option>
          <Option value={"Mednine"}>Mednine</Option>
          <Option value={"Sfax"}>Sfax</Option>
          <Option value={"Mahdia"}>Mahdia</Option>
          <Option value={"Sidi Bouzid"}>Sidi Bouzid</Option>
          <Option value={"Gabes"}>Gabes</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={["user", "age"]}
        label="Age"
        rules={[{ type: "number", min: 0, max: 99 }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={["user", "website"]} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={["user", "introduction"]} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Questions;
