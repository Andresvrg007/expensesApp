import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/Alert';

export const Login=()=>{    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [alert, setAlert] = useState(null)
    const navigate=useNavigate();
    const { verifyAuth } = useAuth();    const handleSubmit= async(e)=>{
        e.preventDefault()
        setAlert(null) // Limpiar alert al intentar login nuevamente
        try {
            const response=await fetch(API_ENDPOINTS.LOGIN,{
                method:'POST',
                credentials: 'include', // Importante para manejar cookies
                body:JSON.stringify({email,password}),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            
            // Verificar si la respuesta es JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.error('Login response is not JSON:', response.status, response.statusText);
                throw new Error('Server error: Invalid response format');
            }
            
            const data = await response.json();
            
            if(!response.ok){
                throw new Error(data.message || 'Login failed. Please check your credentials.')
            } 
            
            // Verificar si la cookie se estableció
            const cookies = document.cookie;
            
            // Verificar autenticación después del login exitoso
            await verifyAuth();
            
            setEmail("");
            setPassword("")
            navigate("/dashboard")        } catch (error) {
            setAlert({
                type: 'error',
                message: error.message
            });
            console.log(error)
        }
    }

    return (
        <>
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
                </div>                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6"  onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                        autoComplete="email"
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
                        <Link to="/password" className="font-semibold text-indigo-600 hover:text-indigo-500"> Forgot password?</Link>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    </div>

                    <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Do not have an account{' '}
                    <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500"> Create one</Link>
                </p>
                </div>
            </div>    
        </>
    )
}