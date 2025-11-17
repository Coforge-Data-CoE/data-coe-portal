"use client";
import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  const nextAuthBasePath = process.env.NEXT_PUBLIC_NEXTAUTH_BASE_PATH || "/datacosmos/api/auth";
  return <SessionProvider basePath={nextAuthBasePath}>{children}</SessionProvider>;
}
