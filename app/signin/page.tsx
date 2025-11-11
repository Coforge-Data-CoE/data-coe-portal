"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthPage() {
  const { data: session, status } = useSession();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="bg-slate-800/60 rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Authentication</h1>
        {status === "loading" ? (
          <p className="text-gray-200">Loading...</p>
        ) : session ? (
          <>
            <p className="text-lg text-gray-200 mb-6">Signed in as <span className="font-semibold text-white">{session.user?.email}</span></p>
            <button
              className="px-6 py-2 rounded bg-[#f15840] text-white font-semibold shadow hover:bg-[#d94c2f] transition"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            className="px-6 py-2 rounded bg-[#1C165D] text-white font-semibold shadow hover:bg-[#0D3168] transition"
            onClick={() => signIn("azure-ad")}
          >
            Sign in with Azure AD
          </button>
        )}
      </div>
    </div>
  );
}
