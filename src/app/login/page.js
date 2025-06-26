"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const { status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) router.push("/dashboard");
    else toast.error("Login failed. Invalid email and password.");
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-center mt-20 text-lg">Checking session...</div>;
  }

  if (status === "authenticated") return null;

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="shadow-lg py-14 px-16 space-y-10 max-w-lg mx-auto bg-white text-blackrounded-lg"
      >
        <h1 className="text-center text-3xl font-bold text-black">Login</h1>
        <div className="font-semibold space-y-6">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-gray-300 p-2 shadow-2xl rounded-xl placeholder-gray-400 font-light focus:outline-none focus:ring-0 focus:border-blue-400"
          />

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-300 p-2 shadow-2xl rounded-xl placeholder-gray-400 font-light focus:outline-none focus:ring-0 focus:border-blue-400"
          />
        </div>
        <button className="w-full  bg-blue-600 px-6 py-2 rounded text-lg font-semibold hover:bg-blue-300 hover:cursor-pointer shadow-2xl text-white">
          Log in
        </button>
        <Link href="/signup" className="hover:text-gray-800 text-black">
          Create a new account. <span className="underline">SignUp</span>
        </Link>
      </form>
    </div>
  );
}
