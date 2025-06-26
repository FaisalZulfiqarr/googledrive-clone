"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="hover:cursor-pointer px-4 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-700 font-semibold"
    >
      Logout
    </button>
  );
}
