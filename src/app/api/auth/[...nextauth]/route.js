import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getDataSource } from "@/lib/typeorm";
import User from "@/entities/User";

const credentialsAuth = Credentials({
  name: "EmailLogin",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize({ email, password }) {
    const db = await getDataSource();
    const userRepo = db.getRepository(User);

    const foundUser = await userRepo.findOne({
      where: { email },
    });

    if (!foundUser) return null;

    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordMatch) return null;

    return {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };
  },
});

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [credentialsAuth],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);
export { authHandler as GET, authHandler as POST };
