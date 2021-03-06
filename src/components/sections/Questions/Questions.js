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
const { TextArea } = Input
const Questions = ({ getQuestionList }) => {
    const [form] = Form.useForm()

    const onFinish = async (values) => {
        console.log(values);

        if (values.type_reponse === 'taux') {
            values.reponse = '1#2#3#4#5';
        }
        try {
            const { data } = await axios.post('/question/create_qts.php', values);
            data && message.success('Question Ajouter avec success');

            form.resetFields();
            getQuestionList()
        } catch (error) {
            message.error('verfier vos données');
            console.error(error)
        }
    };


    return (
        <Form
            form={form}
            wrapperCol={16}
            layout="vertical"
            labelAlign="left"
            name="questions"
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <Form.Item
                name={"label"}
                label="Texte de question"
                rules={[
                    {
                        required: true,
                        message: "Tapez le question !",
                    },
                ]}
            >
                <TextArea />
            </Form.Item>
            <Form.Item
                name="type"
                label="Catégorie"
                rules={[
                    {
                        required: true,
                        message: "Sélectionner le type !",
                    },
                ]}
            >
                <Select name="type" placeholder={"Choisir catégorie de question"}>
                    <Option value={"services"}>Services</Option>
                    <Option value={"local"}>Local</Option>
                    <Option value={"serveurs"}>Serveurs</Option>
                    <Option value={"prix"}>Prix</Option>
                    <Option value={"personnel"}>Personnel</Option>
                    <Option value={"autre"}>Autre</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name={"type_reponse"}
                label="Type de reponse"
                rules={[{ required: true, message: "Choisir le type de réponse" }]}
            >
                <Select placeholder="Type de réponse"   >
                    <Option value="single" >Seul reponse</Option>
                    <Option value="multi" >Multi choix</Option>
                    <Option value="taux" >Taux</Option>
                </Select>
            </Form.Item>
            <Form.Item
                help="Séparez les réponses par #"
                name={"reponse"}
                label="Réponses"
                rules={[{ required: true, message: "Tapez les réponses" }]}
            >
                <TextArea />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Ajouter
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Questions
