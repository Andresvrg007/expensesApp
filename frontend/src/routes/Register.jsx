import { useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export const Register=()=>{
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [showModal, setShowModal] = useState(false);
    let navigate = useNavigate();
    const { verifyAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        try {
            const res = await fetch("http://localhost:5000/api/register", {
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
                setSuccess(data.message || "Error al registrar");
                return;
            }
            setSuccess("¡Registro exitoso!");
            setEmail("");
            setUsername("");
            setPassword("");
            await verifyAuth(); // Verificar autenticación después del registro
            setShowModal(true);
        } catch (err) {
            setSuccess("Error de conexión con el servidor");
        }
    };

    return(
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            
                            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                                Create an account
                            </h2>
                            </div>
            
                            {success && (
                                <div className={`mt-4 px-4 py-3 rounded relative text-center border  ${success.includes('exitoso') ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`} role="alert">
                                    {success}
                                </div>
                            )}
            
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
                            </form>
            
                            <p className="mt-10 text-center text-sm/6 text-gray-500">
                                You have an account{' '}
                                <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500"> Sign In</Link>
                            </p>
                            </div>
            </div>   
            
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Overlay con desenfoque y color suave */}
                    <div className="absolute inset-0 bg-indigo-100 bg-opacity-60 backdrop-blur-sm transition-opacity"></div>
                    <div className="relative bg-white rounded-xl shadow-2xl border border-indigo-200 px-8 py-8 w-full max-w-xs flex flex-col items-center">
                        <svg className="w-12 h-12 text-indigo-500 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#e0e7ff"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" stroke="#6366f1" strokeWidth="2"/>
                        </svg>
                        <h3 className="text-xl font-bold text-indigo-700 mb-2">¡Registro exitoso!</h3>
                        <p className="mb-6 text-gray-600">Tu cuenta ha sido creada correctamente.</p>
                        <button
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                            onClick={() => {
                                setShowModal(false);
                                navigate("/");
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}