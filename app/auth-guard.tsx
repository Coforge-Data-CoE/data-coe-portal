"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
 
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/datacosmos";
  useEffect(() => {
    if (
      pathname !== "/signin" &&
      (status === "unauthenticated" || (!session && status !== "loading"))
    ) {
      console.log("[AuthGuard] Redirecting due to unauthenticated status", { status, session });
      signOut({ callbackUrl: `${basePath}/signin` }); // Redirect to your login page
    }
  }, [session, status]);

  return <>{pathname == '/signin' ? <> </> : <Header />}{children}</>;
};
 
export default AuthGuard;