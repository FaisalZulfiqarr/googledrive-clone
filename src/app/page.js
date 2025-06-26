"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-center bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="flex justify-center items-center flex-col bg-white h-80 p-5">
        <h1 className="text-4xl font-bold mb-4 text-gray-600">
          Welcome to DriveVault
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Secure file storage. Access anywhere.
        </p>
        <div className="flex gap-4">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => router.push("/login")}
          >
            Log In
          </button>
          <button
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
}
