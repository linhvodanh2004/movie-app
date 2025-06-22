import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // TODO: Handle login logic here
        console.log({ email, password });
    };

    return (

        <div className="relative h-screen w-full">
            <img
                src="./movies-background.jpg"
                alt="Background"
                className="absolute top-0 left-0 w-screen h-screen object-cover bg-black opacity-75"
            />
            <div className="absolute top-0 left-0 w-full object-cover" />

            <div className="flex h-screen items-center justify-center z-10">
                <div className="w-full max-w-md  bg-black opacity-80 p-10 rounded-md text-white">
                    <a href="/" className="text-3xl font-bold mb-6 text-left">Home</a>
                    <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold transition-colors"
                        >
                            Sign In
                        </button>

                        <div className="flex items-center justify-between text-sm text-gray-400">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="accent-red-600" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="hover:underline">
                                Need help?
                            </a>
                        </div>
                    </form>

                    <div className="text-sm mt-6 text-gray-400 text-center">
                        New to Netflix?{" "}
                        <a href="#" className="text-white hover:underline">
                            Sign up now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
