// src/components/UserAuthForm.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { handleLogIn, handleSignUp } from '../utils/handleUseAuth';

interface UserAuthFormProps {
    heading: string;
    subHeading?: string;
    type: 'login' | 'signup';
    message: string;
    messageUrl: string;
    buttonText: string;
}

const UserAuthForm: React.FC<UserAuthFormProps> = ({
    heading,
    subHeading,
    type,
    message,
    messageUrl,
    buttonText,
}) => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        if (type === 'login') {
            let result = handleLogIn(values);
            if (result) {
                navigate("/")
            }
        } else {
            let result = handleSignUp(values);
            if (result) {
                navigate("/")
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="form-container">
                <h2 style={{ textAlign: 'center' }}>{heading}</h2>
                {subHeading && <p style={{ textAlign: 'center' }}>{subHeading}</p>}
                <Form
                    className='input-container'
                    name={type}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{ width: '100%' }}
                >
                    {type === 'signup' && (
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please input your Name!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Name" />
                        </Form.Item>
                    )}
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            {buttonText}
                        </Button>
                    </Form.Item>
                </Form>
                <a
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={() => navigate(messageUrl)}>{message}</a>
            </div>
        </div>
    );
};

export default UserAuthForm;
