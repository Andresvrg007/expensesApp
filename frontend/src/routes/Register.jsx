import { useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/Alert';
import { API_ENDPOINTS } from '../config/api';

export const Register=()=>{    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(null);
    let navigate = useNavigate();
    const { verifyAuth } = useAuth();    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert(null);
        try {
            const res = await fetch(API_ENDPOINTS.REGISTER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    username: username.toLowerCase(),
                    password
                })
            });
            if (!res.ok) {
                const data = await res.json();
                setAlert({
                    type: 'error',
                    message: data.message || "Registration failed. Please try again."
                });
                return;
            }
            
            setAlert({
                type: 'success',
                message: "Account created successfully! Redirecting to login..."
            });
            
            setEmail("");
            setUsername("");
            setPassword("");
            await verifyAuth(); // Verificar autenticación después del registro
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                navigate("/");
            }, 2000);
            
        } catch (err) {
            setAlert({
                type: 'error',
                message: "Connection error. Please check your internet connection."
            });
        }
    };    return(
        <>
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                    autoClose={alert.type === 'error'}
                    duration={alert.type === 'success' ? 2000 : 4000}
                />
            )}
            
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                                Create an account
                            </h2>
                            </div>
            
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    autoComplete="username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
            
                                <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                    </label>
                                    <div className="text-sm">
                                </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                                </div>
            
                                <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Register
                                </button>
                                </div>
                            </form>                            <p className="mt-10 text-center text-sm/6 text-gray-500">
                                You have an account{' '}
                                <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500"> Sign In</Link>
                            </p>
                            </div>
            </div>   
        </>
    )
}