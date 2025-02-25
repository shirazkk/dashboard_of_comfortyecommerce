"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send email and password to the backend API for verification
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Authentication successful
        localStorage.setItem("isLoggedIn", "true");
        router.push("/admin/dashboard");
      } else {
        // Invalid credentials
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred while logging in.");
      console.log(error)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="w-[25%]  flex flex-col gap-4 p-6 bg-gray-800 rounded-2xl transition-transform transform hover:scale-105 border border-gray-700 shadow-lg"
      >
        <h2 className="text-center text-white text-xl font-semibold mb-4">
          Admin Login
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-700 shadow-inner">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-gray-300"
            value={email}
          />
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-700 shadow-inner">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-gray-300"
            value={password}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-gray-600 text-white transition hover:bg-black w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
