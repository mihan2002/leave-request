import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/authService";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signup(username, password);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="username" className="mb-1 font-semibold">
            Username
          </label>
          <input
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password" className="mb-1 font-semibold">
            Password
          </label>
          <input
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
