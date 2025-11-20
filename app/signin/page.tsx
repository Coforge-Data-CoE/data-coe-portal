"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const nextAuthBasePath = process.env.NEXT_PUBLIC_NEXTAUTH_BASE_PATH || "/datacosmos/api/auth";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/datacosmos";

export default function AuthPage() {
  const { data: session, status } = useSession();
  // Redirect if already signed in
  useEffect(() => {
    if (session && status === "authenticated") {
      window.location.href = `${basePath}/datacosmos`;
    }
  }, [session, status, basePath]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <img src={`${basePath}/bg-11.jpg`} alt="Background" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-[#0c1b48]/70" />
      </div>
      <div className="bg-[#5a52e74a] rounded-xl shadow-lg p-8 text-center relative z-10" style={{   boxShadow: "0px 1px 14px 0px #080d50bd;"}}>
        <h1 className="text-3xl text-white mb-6">Welcome to</h1>

        <div className="mb-8 flex justify-center">
          <img src={`${basePath}/logos/galaxies/coforge-cosmos_white.svg`} alt="Coforge Data Cosmos Logo" width={240} height={48} className="md:w-[400px] w-[180px]" />
        </div>
        {status === "loading" ? (
          <p className="text-gray-200">Loading...</p>
        ) : session ? (
          <>
            <p className="text-lg text-gray-200 mb-6">Signed in as <span className="font-semibold text-white">{session.user?.email}</span></p>
            <button
              className="px-6 py-2 rounded bg-[#f15840] text-white font-semibold shadow hover:bg-[#d94c2f] transition"
              onClick={() => signOut({ callbackUrl: `${basePath}/signin` })}
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            className="cursor-pointer px-6 py-2 my-4 rounded bg-[#1C165D] text-white font-semibold shadow hover:bg-[#070d4f] transition"
            onClick={async () => {
              try {
                await signIn("azure-ad", { callbackUrl: `${basePath}/datacosmos` }, { basePath: nextAuthBasePath });
              } catch (err) {
                console.error("signIn error:", err);
              }
            }}
          >
            <img src={`${basePath}/logos/azure.svg`} alt="Azure Logo" width={20} height={20} className="inline-block mr-2 mb-1" />
            Sign in with Azure AD
          </button>
        )}
      </div>
    </div>
  );
}
