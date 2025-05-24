import { useAuth } from '../context/AuthContext';

export const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Welcome back, <span className="text-indigo-600">{user?.username}</span>
                    </h1>
                </div>
                <button
                    onClick={logout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}; 