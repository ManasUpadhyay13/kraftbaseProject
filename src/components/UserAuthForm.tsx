// src/components/UserAuthForm.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { handleLogIn, handleSignUp } from '../utils/handleUseAuth';
import '../styles/userAuth.css'
import { isValidEmail } from '../utils/checkValidEmail';
import { errorMessage } from '../utils/toastMessage';
import { UserAuthFormProps } from '../types/userAuthFormTypes';


const UserAuthForm: React.FC<UserAuthFormProps> = ({
    heading,
    subHeading,
    type,
    message,
    welcomeMessage,
    messageUrl,
    redirectText,
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
            if (!isValidEmail(values.email)) {
                errorMessage("Email is not valid")
                return
            }
            let result = handleSignUp(values);
            if (result) {
                navigate("/")
            }
        }
    };

    return (
        <div className="auth-container">
            {
                (type === 'login') && (
                    <div className="authImage">
                        <img src="https://demos.themeselection.com/sneat-mui-react-nextjs-admin-template/demo-1/images/pages/boy-with-rocket-light.png" alt="login image"
                        />
                    </div>
                )
            }
            {
                (type === 'signup') && (
                    <div className="authImage">
                        <img src="https://demos.themeselection.com/sneat-mui-react-nextjs-admin-template/demo-1/images/pages/girl-with-laptop-light.png" alt="signup image"
                        />
                    </div>
                )
            }
            <div className="form-container">
                <h2 style={{ textAlign: 'center', color: "black", fontSize: "2rem" }}>{heading}</h2>
                {welcomeMessage && <p>{welcomeMessage}</p>}
                {subHeading && <p style={{ textAlign: 'center', fontSize: "13px" }}>{subHeading}</p>}
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
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: "13px"
                    }}
                    onClick={() => navigate(messageUrl)}>
                    {message}
                    <span
                        style={{
                            cursor: "pointer",
                            color: "blue"
                        }}
                    >
                        {redirectText}
                    </span>
                </a>
            </div>
        </div>
    );
};

export default UserAuthForm;
