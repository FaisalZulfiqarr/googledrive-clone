"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function Signup() {
  const { status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) router.push("/login");
    else toast.error("Signup failed");
  };

  if (status === "loading") {
    return <div className="text-center mt-20 text-lg">Checking session...</div>;
  }

  if (status === "authenticated") return null;

  return (
    <div
      className="w-full h-screen flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="shadow-lg py-14 px-16 space-y-10 max-w-lg mx-auto bg-white rounded-lg"
      >
        <h1 className="text-center text-3xl font-bold text-black">Signup</h1>
        <div className="font-semibold space-y-6">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full border border-gray-300 p-2 shadow-2xl rounded-xl placeholder-gray-400 font-light focus:outline-none focus:ring-0 focus:border-blue-400"
          />
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
        <button className="w-full  text-white bg-blue-600 px-6 py-2 rounded text-lg font-semibold hover:bg-blue-300 hover:cursor-pointer">
          Sign up
        </button>
        <Link href="/login" className="hover:text-gray-800 text-black">
          Already have an account. <span className="underline ">Login</span>
        </Link>
      </form>
    </div>
  );
}
