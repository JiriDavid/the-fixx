import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { env, hasAdminCredentials } from "./env";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!hasAdminCredentials) {
          throw new Error("Admin credentials are not configured.");
        }

        const suppliedEmail = credentials?.email?.toLowerCase().trim();
        const suppliedPassword = credentials?.password ?? "";

        if (suppliedEmail !== env.ADMIN_EMAIL?.toLowerCase()) {
          throw new Error("Invalid credentials.");
        }

        const isValid = await bcrypt.compare(
          suppliedPassword,
          env.ADMIN_PASSWORD_HASH
        );

        if (!isValid) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: "admin",
          name: "Admin",
          email: env.ADMIN_EMAIL,
          role: "admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export function isAdminSession(session) {
  return Boolean(session?.user?.role === "admin");
}
