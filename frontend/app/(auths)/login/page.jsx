'use client'
import { useContext, useState } from 'react';
import { AuthContext } from "../../../utils/auth";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { toast } from 'sonner';
const LoginPage = () => {
    const [credentials, setCredentials]  = useState({username: '', password: ''});
    const router = useRouter();

    const { login, errors } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(credentials, router);
            toast.success(response.message);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error registering user:', error.message);
        }      
    };

    const renderError = (field) => {
        if (errors?.[field]) {  // Use optional chaining
            const message = Array.isArray(errors[field]) ? errors[field] : [errors[field]];
            return message.map((msg, index) => <p key={`${field}-${msg}`} className='error text-red-600'>{msg}</p>);
        }
        return null;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Login Page</h1>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {errors?.general && <p className='error text-red-600'>{errors.general}</p>}
                    <div>
                    {renderError('username')}
                        <input
                            type="username"
                            placeholder="username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        {renderError('password')}
                        <input
                            type="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="underline underline-offset-4">
                        Sign up
                    </Link>
                    </div>
            </div>
        </div>
    );
    
}

export default LoginPage
