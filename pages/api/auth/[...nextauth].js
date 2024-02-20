import { PrismaAdapter } from "@next-auth/prisma-adapter";
import client from "@/_libs/prisma/client";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  adapter: PrismaAdapter(client),
  theme: {
    colorScheme: "light",
    brandColor: "#347AEC",
    logo: "/public/_assets/images/icons/psyMI_logo.png",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "username" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please check the correctness of the data you entered");
        }

        const user = await client.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new Error(
            "The user does not exist, please check the correctness of the data you entered",
          );
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isCorrectPassword) {
          throw new Error("You have entered a wrong password");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          username: profile.given_name,
          email: profile.email,
          image: profile.picture,
          isRegistered: profile.isRegistered ? true : false,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.isRegistered = token.isRegistered;
      return session;
    },
    // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
    // async session({ session, trigger, newSession }) {
    //   // Note, that `rest.session` can be any arbitrary object, remember to validate it!
    //   if (trigger === "update" && newSession?.name) {
    //     // You can update the session in the database if it's not already updated.
    //     // await adapter.updateUser(session.user.id, { name: newSession.name })

    //     // Make sure the updated value is reflected on the client
    //     session.name = newSession.name;
    //   }
    //   return session;
    // },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-up",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
