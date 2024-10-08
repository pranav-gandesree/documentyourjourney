// import { NextAuthOptions } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import prisma from '@/prisma/prisma';

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//       profile: (profile) => {
//         return {
//           id: profile.sub,
//           name: profile.name.trim().replace(/\s+/g, ''), // Remove spaces from name
//           email: profile.email,
//           image: profile.picture,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: 'jwt', // Using JWT session strategy
//   },
//   callbacks: {
//     async jwt({ token, user }:any ) {
//       if (user) {
//         token.uid = user.id;         // Store user id
//         token.email = user.email;   // Store email
//         token.name = user.name;     // Store name
//         token.image = user.image;   // Store profile picture
//       }
//       return token;
//     },
    
//     async session({ session, token }:any ) {
//       if (session.user) {
//         session.user.id = token.id;         // Attach user id to session
//         session.user.email = token.email;   // Attach email to session
//         session.user.name = token.name;     // Attach name to session
//         session.user.image = token.image;   // Attach profile picture to session
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/signin', // Custom sign-in page
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };








import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from "@/prisma/prisma";
import type { Adapter } from "next-auth/adapters";
import { SessionStrategy } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  pages: {
    signIn: "/auth",
  },
  session: { strategy: "jwt" as SessionStrategy },
  callbacks: {
    async jwt({ token }: any) {
      return token;
    },
    async session({ session, token }: any) {
      const user = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.sub;
      }
      return session;
    },
  },
};