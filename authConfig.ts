import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import WeChat from "@auth/core/providers/wechat";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthConfig } from "next-auth"


export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      //custom sign in page logic
      name: "credentials",
      credentials: {
        phone: { label: "Phone", type: "phone", placeholder: "phone" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //after sign in, check if the user exists in the database
        const user = await prisma.user.findUnique({
          where: {
            phone_number: credentials?.phone as string,
          },
        });
        //   console.log("credentials=>", user);
        if (!user) {
          throw new Error("No user found with this phone number.");
        }
        const isPasswordValid = await bcrypt.compare(
          credentials?.password as string,
          user.password!
        );
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        return {
          id: user.id,
          name: user.user_name,
          email: user.email,
          image: user.image,
          phone_number: user.phone_number,
        };
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    WeChat({
      clientId: process.env.AUTH_WECHAT_APP_ID,
      clientSecret: process.env.AUTH_WECHAT_APP_SECRET,
      platformType: "OfficialAccount",
    }),
  ],
  callbacks: {
    //Invoked when a user logs in
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email!,
        },
      });
      if (!existingUser) {
        try {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              user_name: user.name!,
              image: user.image,
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
      return true;
    },
    //Modify session object
    async session({ session, token }: { session: any; token: any }) {
      const getUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      if (!getUser) {
        throw new Error("User not found!");
      }
      session.user.id = getUser.id;
      return session;
    },
    //redirect to home page
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};