// import NextAuth from "next-auth";
// import AzureADProvider from "next-auth/providers/azure-ad";

// export const authOptions = {
//   providers: [
//     AzureADProvider({
//       clientId: process.env.AZURE_AD_CLIENT_ID as string,
//       clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
//       tenantId: process.env.AZURE_AD_TENANT_ID as string,
//     }),
//   ],
// //   session: {
// //     strategy: "jwt",
// //   },
// //   pages: {
// //     signIn: "/signin",
// //   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// import { getDb } from "@/app/config/mysql_db_config";
import NextAuth, { AuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
// import { getDb } from ";
 
export const authOptions: AuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      // authorization: {
      //   params: {
      //     // Add GroupMember.Read.All to be able to list group memberships + photo
      //     scope:
      //       "openid profile email offline_access User.Read GroupMember.Read.All",
      //   },
      // },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        console.log("[NextAuth] Login success:", {
          email: (profile as any).email || (profile as any).preferred_username,
          name: (profile as any).name
        });
      }
      // On initial sign-in populate identity basics
      if (account && profile) {
        token.email = (profile as any).email || (profile as any).preferred_username;
        token.name = (profile as any).name;
        token.oid = (profile as any).oid;
        if ((account as any)?.access_token) {
          try {
            const photoRes = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
              headers: { Authorization: `Bearer ${(account as any).access_token}` },
            });
            if (photoRes.ok) {
              const arrayBuf = await photoRes.arrayBuffer();
              const base64 = Buffer.from(arrayBuf).toString("base64");
              token.image = `data:image/jpeg;base64,${base64}`;
            }
          } catch {}
        }
      }
      // Always refresh role/team info from DB if we have an email
      if (token.email) {
        try {
          // const db = getDb();
          //   const [rows] = await db.execute(
          //     "SELECT id, employee_code, team_name, role, supervisor_code, supervisor_name FROM employees WHERE email=? LIMIT 1",
          //     [token.email]
          //   );
          //   const existing = (rows as any[])[0];
          //   if (existing) {
          //     token.employeeId = existing.id;
          //     token.employeeCode = existing.employee_code;
          //     token.teamName = existing.team_name;
          //     token.role = existing.role;
          //     token.supervisor_code = existing.supervisor_code;
          //     token.supervisor_name = existing.supervisor_name;
          //     if (!existing.azure_oid && token.oid) {
          //       await db.execute("UPDATE employees SET azure_oid=? WHERE id=?", [token.oid, existing.id]);
          //     }
          //   }
        } catch {}
      }
      return token;
    },
    async session({ session, token }) {
      // session.user.role = token.role;
      // session.user.employeeId = token.employeeId;
      // session.user.oid = token.oid;
      // session.user.employeeCode = typeof token.employeeCode === "string" ? token.employeeCode : undefined;
      // session.user.teamId = typeof token.teamId === "number" ? token.teamId : undefined;
      // session.user.teamName = typeof token.teamName === "string" ? token.teamName : undefined;
      // console.log("[NextAuth] Session callback:", {
      //   email: token.email,
      //   name: token.name,
      //   oid: token.oid,
      //   role: token.role,
      // });
      return session;
    },
  },
};
 
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
