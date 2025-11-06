import React, { useState } from 'react';
import { Button, Input, Card } from '../shared-elements';
import { Lock } from '@mui/icons-material';

const ForgotPassword = ({ onBackToLogin }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSuccess('Password reset successfully!');
            setTimeout(() => {
                onBackToLogin();
                setPassword('');
                setConfirmPassword('');
            }, 2000);
        } catch (err) {
            setError('Password reset failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e8f9ff] p-10">
            <div className="flex flex-col items-center justify-center">


                <h3 className="text-center text-[20px] font-semibold mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Please Create New Password
                </h3>
                <Card style={{ fontFamily: 'Roboto, sans-serif' }} className='card-large'>
                    <form onSubmit={handleSubmit} className='pt-2'>
                        <div className="mb-4">
                            <div className='mb-1 w-500 text-sm'>
                                Enter New password
                            </div>
                            <Input
                                type="password"
                                placeholder="Enter New password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                showPasswordToggle={true}
                            />
                            <div className="text-xs text-gray-500 -mt-2">
                                min 8 characters & include 1 special character (@,#,$,%,…)
                            </div>
                        </div>
                        <div className="mb-8">
                            <div className='mb-1 w-500 text-sm'>Re-Enter password</div>
                            <Input
                                type="password"
                                placeholder="Re-Enter password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                showPasswordToggle={true}
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
                        <Button
                            type="submit"
                            variant="primary"
                            size="medium"
                            fullWidth
                        >
                            RESET PASSWORD
                        </Button>


                    </form>
                </Card>
            </div>

        </div>
    );
};

export default ForgotPassword;
