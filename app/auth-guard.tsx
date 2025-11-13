"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
 
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  useEffect(() => {
    if (
      pathname !== "/signin" &&
      (status === "unauthenticated" || (!session && status !== "loading"))
    ) {
      signOut({ callbackUrl: "/signin" }); // Redirect to your login page
    }
  }, [session, status]);

  return <>{pathname == '/signin' ? <> </> : <Header />}{children}</>;
};
 
export default AuthGuard;