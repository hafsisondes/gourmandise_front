import React from 'react'
import { Form, Input, InputNumber, Button, Select, message } from 'antd';
import axios from '../../../services/axios';



/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const { Option } = Select;

const Questions = () => {
    const [form] = Form.useForm()
    const onFinish = async (values) => {
        console.log(values);
        values.reponse = "reponse";
        values.id_question = new Date();
        try {
            const { data } = await axios.post('/question/create_qts.php', values);
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
            name="questions"
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <Form.Item
                name={"label"}
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
                name="type"
                rules={[
                    {
                        required: true,
                        message: "Sélectionner le type !",
                    },
                ]}
            >
                <Select name="type" placeholder={"Choisir catégorie de question"}>
                    <Option value={"Services"}>Services</Option>
                    <Option value={"Local"}>Local</Option>
                    <Option value={"Serveurs"}>Serveurs</Option>
                    <Option value={"Prix"}>Prix</Option>
                    <Option value={"Autre"}>Autre</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name={"type_reponse"}
                label="Age"
                rules={[{ required: true, message: "Choisir le type de réponse" }]}
            >
                <Select placeholder="Type de réponse"   >
                    <Option value="single" >Seul reponse</Option>
                    <Option value="multi" >Multi choix</Option>
                </Select>
            </Form.Item>
            {/* <Form.Item
                name={"reponse"}
                label="Age"
                rules={[{ required: true, message: "Tapez les réponses" }]}
            >
               
                
            </Form.Item> */}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Ajouter
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Questions
