import React from 'react'
import { Form, Input, InputNumber, Button, Checkbox, message } from 'antd';
import axios from '../../../services/axios';

const UserConfiguartion = ({ getUsersList }) => {
    const [form] = Form.useForm()
    const onFinish = async (values) => {
        console.log('Success:', values);

        const newUser = JSON.stringify({
            username: values.username,
            login: values.login,
            password: values.password,

        })
        try {
            const { data } = await axios.post('user/create.php', newUser);
            data && message.success('utilisateur Ajouter avec success');
            form.resetFields();
            getUsersList()
        } catch (error) {
            message.error('verfier vos données');
            console.error(error)
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            form={form}
            wrapperCol={16}
            layout="vertical"
            labelAlign='left'
            name="basic"

            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Tpaez votre username!' }]}
            >
                <Input placeholder='Username' />
            </Form.Item>

            <Form.Item
                label="Login"
                name="login"
                rules={[{ required: true, message: 'Tpaez votre login!' }]}
            >
                <Input placeholder='Login' />
            </Form.Item>

            <Form.Item
                label="Mot de passe"
                name="password"
                rules={[{ required: true, message: 'Tpaez votre mot de passe!' }]}
            >
                <Input.Password placeholder='Mot de passe' />
            </Form.Item>
            <Form.Item
                label="Confirmer mot de passe"
                name="confirmPpassword"
                rules={[{ required: true, message: 'Confirmer votre mot de passe!' }]}
            >
                <Input.Password placeholder='Retapez votre mot de passe' />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Ajouter nouveau compte
                </Button>
            </Form.Item>
        </Form >
    )
}
export default UserConfiguartion