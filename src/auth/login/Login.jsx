import React, { useState } from 'react';
import { Button, Card, Input, Checkbox, Header } from '../../shared-elements';
import {
    School,
    Business,
    Person,
    MenuBook,
    Calculate,
    Search,
    Email,
    Lock
} from '@mui/icons-material';
import './Login.css';
import loginImage from '../../assets/img/loginPage.png';
import loginPage_logo from '../../assets/img/loginPage_logo.png';
import mapmyclasses from '../../assets/img/MMC_Logo_colored.png';
import ForgotPassword from '../ForgotPassword';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: 'standardadmin@mapsystems.in',
        password: '*********************',
        rememberMe: false
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleCheckboxChange = (e) => {
        setFormData(prev => ({
            ...prev,
            rememberMe: e.target.checked
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = 'Username is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log('Login data:', formData);
            // Handle login logic here
        }
    };

    const navigate = useNavigate();

    return (
        <>
            {showForgotPassword ? (
                <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />
            ) : (
                <div className='h-screen bg-[#EDF8F9] overflow-hidden'>
                    {/* Header */}  
                    {/* <Header logoLeft={mapmyclasses} logoAlt="mapmyclasses" /> */}
                    <div className="h-14 bg-white shadow flex items-center px-10">
                        <img src={mapmyclasses} alt="mapmyclasses" className="h-9" />
                        {/* if you want something on the right too */}
                        <div className="ml-auto flex items-center gap-4">
                            {/* Add right-side content here if needed */}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex items-center justify-center bg-[#e8f9ff] py-6 px-10">
                        <div className="flex w-full max-w-6xl justify-between items-center gap-10">
                            {/* Left Illustration */}
                            <div className="hidden md:flex w-1/2 bg-[#e8f9ff] items-center justify-center p-4">
                                <div className='flex flex-col items-center justify-center'>
                                    <img src={loginPage_logo} alt="Logo" className="w-full h-20 mb-4 max-h-20 object-contain" />
                                    <img
                                        src={loginImage}
                                        alt="Illustration"
                                        className="w-full max-h-[400px] object-contain"
                                    />
                                </div>
                            </div>

                            {/* Right Form */}
                            <div className="w-full md:w-2/5 flex flex-col justify-center p-6">
                                <h2 className="text-2xl font-semibold text-center mb-6">Welcome</h2>

                                <Card style={{ fontFamily: 'Roboto, sans-serif' }} className='card-large'>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <h3 className="text-lg font-medium !font-bold">Login</h3>

                                        {/* Username */}
                                        <div style={{ color: '#000000', fontSize: '15px', fontWeight: '500', marginBottom: '-8px' }} className='pt-4'>User Name</div>
                                        <Input
                                            type="email"
                                            name="username"
                                            placeholder="User name"
                                            value={formData.username}
                                            onChange={handleInputChange('username')}
                                        />

                                        {/* Password with toggle */}
                                        <div style={{ color: '#000000', fontSize: '15px', fontWeight: '500', marginBottom: '-8px' }}>Password</div>
                                        <div className="relative">
                                            <Input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={handleInputChange('password')}
                                                showPasswordToggle={true}
                                            />
                                        </div>

                                        {/* Remember Me */}
                                        <Checkbox
                                            label="Remember me"
                                            checked={formData.rememberMe}
                                            onChange={handleCheckboxChange}
                                            className="flex items-center space-x-2 pb-2"
                                        />

                                        {/* Error Message */}
                                        {Object.keys(errors).length > 0 && (
                                            <div className="text-red-500 text-sm">
                                                {Object.values(errors).map((error, index) => (
                                                    <p key={index}>{error}</p>
                                                ))}
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            variant="gradient"
                                            size="large"
                                            onClick={() => navigate('/dashboard')}
                                        // className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
                                        >
                                            LOGIN
                                        </Button>

                                        <a
                                            className="flex justify-center text-sm text-blue-500 hover:underline pt-2 cursor-pointer"
                                            onClick={() => setShowForgotPassword(true)}
                                        >
                                            Forgot Password?
                                        </a>
                                    </form>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;


