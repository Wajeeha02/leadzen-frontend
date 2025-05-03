"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgImage from "../../assets/images/image.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // adjust path if needed

const Signup: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      setMessage("User registered successfully!");
      localStorage.setItem("token", token);
      router.push("/home");
    } catch (error: any) {
      setMessage(error.message || "Signup failed");
    }
  };

  return (
    <div
      className="relative max-w-full h-screen bg-cover bg-no-repeat bg-bluedark"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="flex items-center justify-center h-full text-white">
        <div className="bg-opacity-75 bg-bluedark p-10 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
          {message && <p className="text-center text-red-500">{message}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-lightblue text-bluedark focus:outline-none focus:ring-2 focus:ring-lightblue"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-lightblue text-bluedark focus:outline-none focus:ring-2 focus:ring-lightblue"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-4 flex items-center text-bluedark"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-bluedark text-white rounded-lg hover:bg-white hover:text-bluedark transition"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account?
            <a href="/login" className="text-lightblue font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
