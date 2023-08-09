import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../../prisma/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "",
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  pages: {
    signIn: "/signin",
  },
  events: {
    async createUser({ user }) {
      const userPrisma = await prisma.user.findUnique({
        where: { email: user.email ?? "" },
      });
      if (userPrisma) {
        await prisma.profile.create({
          data: {
            name: user.name ?? "",
            email: user.email ?? "",
            image: user.image ?? "",
            bio: "",
            userid: userPrisma?.id,
          },
        });
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
