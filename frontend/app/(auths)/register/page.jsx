"use client";
import { useContext, useState } from 'react';
import { AuthContext } from "../../../utils/auth";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { toast } from 'sonner';
const RegisterPage = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user', // Default role
        farm_location: '',
        occupation_name: ''
    });
    const [isFarmer, setIsFarmer] = useState(false); // State to manage farmer opt-in
    const { register, errors } = useContext(AuthContext);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFarmer && (!credentials.farm_location || !credentials.occupation_name)) {
            toast.error('Farm Location and Occupation Name are required for farmers.');
            return;
        }

        try {
            const response = await register(credentials, router);
            toast.success(response.message);
        } catch (error) {
            toast.error('Error:', error);
            alert('Error registering user:');
        }      
    };

    const handleCheckboxChange = () => {
        setIsFarmer(!isFarmer);
        setCredentials({ ...credentials, role: !isFarmer ? 'farmer' : 'user' });
    };

    const renderError = (field) => {
        if (errors?.[field]) {
            const message = Array.isArray(errors[field]) ? errors[field] : [errors[field]];
            return message.map((msg) => <p key={`${field}-${msg}`} className='error text-red-600'>{msg}</p>);
        }
        return null;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Register Page</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        {renderError('username')}
                        <input
                            type="text"
                            placeholder="Username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        {renderError('email')}
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
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
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="isFarmer"
                            checked={isFarmer}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="isFarmer" className="text-gray-700">
                            Do you want to register as a farmer?
                        </label>
                    </div>
                    {isFarmer && (
                        <>
                            <div>
                                {renderError('farm_location')}
                                <input
                                    type="text"
                                    placeholder="Farm Location"
                                    value={credentials.farm_location}
                                    onChange={(e) => setCredentials({ ...credentials, farm_location: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                {renderError('occupation_name')}
                                <input
                                    type="text"
                                    placeholder="Occupation Name"
                                    value={credentials.occupation_name}
                                    onChange={(e) => setCredentials({ ...credentials, occupation_name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div className="pt-2 items-top flex space-x-2">
                        <input
                            type="checkbox"
                            id="terms1"
                            required
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="terms1"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Accept terms and conditions
                            </label>
                            <p className="text-sm text-muted-foreground">
                                You agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4">
                        Log In
                    </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
