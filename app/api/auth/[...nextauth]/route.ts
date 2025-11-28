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
import User from "@/app/models/user";
import { connectToDB } from "@/app/lib/mongodb";
import AzureADProvider from "next-auth/providers/azure-ad";
import Activity from "@/app/models/activity";
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
          name: (profile as any).name,
        });
        // Save user to MongoDB
        await connectToDB();
        const email =
          (profile as any).email || (profile as any).preferred_username;
        const name = (profile as any).name;
        const oid = (profile as any).oid;
        let image = undefined;
        if ((account as any)?.access_token) {
          try {
            const photoRes = await fetch(
              "https://graph.microsoft.com/v1.0/me/photo/$value",
              {
                headers: {
                  Authorization: `Bearer ${(account as any).access_token}`,
                },
              }
            );
            if (photoRes.ok) {
              const arrayBuf = await photoRes.arrayBuffer();
              const base64 = Buffer.from(arrayBuf).toString("base64");
              image = `data:image/jpeg;base64,${base64}`;
            }
          } catch {}
        }
        // Upsert user
        // Upsert user and get Mongo _id
        const user = await User.findOneAndUpdate(
          { email },
          { $set: { email, name, oid, image } },
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
            runValidators: true,
          }
        );

        token.email = email;
        token.name = name;
        token.oid = oid;
        if (image) token.image = image;

        // Log activity with user._id (not Azure oid)
        await Activity.create({
          userId: user._id,
          email: email,
          type: "login",
          meta: { provider: account.provider, oid },
          createdAt: new Date(),
        });
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
