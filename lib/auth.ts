import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.name.trim().replace(/\s+/g, ''), // Remove spaces from name
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Using JWT session strategy
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;         // Store user id
        token.email = user.email;   // Store email
        token.name = user.name;     // Store name
        token.image = user.image;   // Store profile picture
      }
      return token;
    },
    
    async session({ session, token }:any ) {
      if (session.user) {
        session.user.id = token.id;         // Attach user id to session
        session.user.email = token.email;   // Attach email to session
        session.user.name = token.name;     // Attach name to session
        session.user.image = token.image;   // Attach profile picture to session
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin', // Custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,
};
