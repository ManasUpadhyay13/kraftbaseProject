import React from 'react';
import '../styles/navbar.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../utils/logout';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='navbar'>
            <p className="logo">
                KraftFlow
            </p>
            <Button
                type='primary'
                danger
                onClick={() => handleLogout(navigate)}
            >
                Logout
            </Button>
        </div>
    );
};

export default Navbar;
