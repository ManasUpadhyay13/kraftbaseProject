import React from 'react';
import UserAuthForm from '../components/UserAuthForm';

const Login: React.FC = () => {
  

  return (
    < UserAuthForm
      heading="KraftFlow"
      subHeading='Login into your KraftFlow account'
      type="login"
      message="Don't have an account? Sign up"
      messageUrl="/signup"
      buttonText="Login"
    />
  );
};

export default Login;
