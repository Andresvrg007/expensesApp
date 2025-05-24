import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS } from '../config/api';


export const Forgotpassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [email,setEmail]=useState("");
    const [success, setSuccess] = useState("");
    const [showModal, setShowModal] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(""); // Limpiar mensajes previos
        try {
            const response = await fetch(API_ENDPOINTS.PASSWORD, {
                method: 'POST',
                body: JSON.stringify({ newPassword, oldPassword, email }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const res = await response.json();

            if (!response.ok) {
                // Si hay error, mostrar el mensaje del backend
                setSuccess(res.error || "Error updating password");
                setShowModal(false);
                return;
            }

            // Si todo bien, mostrar mensaje de éxito y modal
            setSuccess(res.message || "Password updated successfully!");
            setOldPassword("");
            setNewPassword("");
            setShowModal(true);

            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                setShowModal(false);
                navigate("/");
            }, 2000);

        } catch (error) {
            setSuccess("Server connection error");
            setShowModal(false);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Forgot Password
                    </h2>
                </div>

                {success && !showModal && (
                    <div
                        className={`mt-4 px-4 py-3 rounded relative text-center border ${
                            success.includes("successfully")
                                ? "bg-green-100 border-green-400 text-green-700"
                                : "bg-red-100 border-red-400 text-red-700"
                        }`}
                        role="alert"
                    >
                        {success}
                    </div>
                )}

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                            <label
                                htmlFor="Email"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="current-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="oldPassword"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Old Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="oldPassword"
                                    name="oldPassword"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="newPassword"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Remembered your password?{" "}
                        <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-indigo-100 bg-opacity-60 backdrop-blur-sm transition-opacity"></div>
                    <div className="relative bg-white rounded-xl shadow-2xl border border-indigo-200 px-8 py-8 w-full max-w-xs flex flex-col items-center">
                        <svg
                            className="w-12 h-12 text-indigo-500 mb-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#e0e7ff" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" stroke="#6366f1" strokeWidth="2" />
                        </svg>
                        <h3 className="text-xl font-bold text-indigo-700 mb-2">¡Contraseña actualizada!</h3>
                        <p className="mb-6 text-gray-600">Tu contraseña ha sido actualizada correctamente.</p>
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
    );
};
