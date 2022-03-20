import React from "react";
import { Form, Input, InputNumber, Button, Select, message } from "antd";
import axios from "../../../services/axios";

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
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
    values.nbr_visite = 0;
    try {
      const { data } = await axios.post('/pt_de_vente/create.php', values);
      data && message.success('utilisateur Ajouter avec success');
      form.resetFields();
    } catch (error) {
      message.error('verfier vos données');
      console.error(error)
    }
  };

  return (
    <Form
      ref={form}
      wrapperCol={16}
      layout="vertical"
      labelAlign="left"
      name="point_de_vente"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={"nom"}
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
        name={"type"}
        label="Age"
        rules={[{ required: true, message: "Choisir le type" }]}
      >
        <Select placeholder="Type de service  "   >
          <Option value="Café" >Café</Option>
          <Option value="Patteserie" >Patteserie</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Ajouter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Questions;
