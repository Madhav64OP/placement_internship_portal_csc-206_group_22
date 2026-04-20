import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../store/userSlice';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', credentials);
            
            if (response.data.success) {
                const loggedInUser = response.data.data;
                
                dispatch(setUser(loggedInUser));

                switch(loggedInUser.role) {
                    case 'PIC':
                        navigate('/pic-admin');
                        break;
                    case 'Associate':
                        navigate('/associate-scan');
                        break;
                    case 'Student':
                        navigate('/');
                        break;
                    default:
                        navigate('/');
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to connect to server');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-extrabold text-[#0055a4] text-center mb-8 italic">IITR PIP</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm font-semibold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Institute Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none bg-gray-50 transition-all font-medium"
                            placeholder="user@iitr.ac.in"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Password</label>
                        <input 
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none bg-gray-50 transition-all font-medium"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className={`w-full text-white font-bold py-4 rounded-xl transform transition-all shadow-lg 
                            ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-[#0055a4] hover:bg-blue-800 active:scale-95 shadow-blue-200'}`}
                    >
                        {isLoading ? 'Authenticating...' : 'Secure Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;