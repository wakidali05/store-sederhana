import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginWithGoogle, signIn } from "@/services/auth/services";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          if (!email || !password) {
            console.error("authorize: missing email or password");
            return null;
          }

          const user: any = await signIn(email);
          if (!user) {
            console.error("authorize: user not found for", email);
            return null;
          }

          // jika user.password undefined maka compare akan melempar error
          if (!user.password) {
            console.error("authorize: user has no password stored", email);
            return null;
          }

          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }

          console.error("authorize: invalid password for", email);
          return null;
        } catch (err) {
          console.error("authorize error:", err);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      try {
        // credentials provider: user tersedia dari authorize
        if (account?.provider === "credentials" && user) {
          token.email = user.email;
          token.fullname = user.fullname;
          token.phone = user.phone;
          token.role = user.role;
          token.id = user.id;
          token.image = user.image;
        }

        // google provider: user mungkin undefined on subsequent calls; gunakan profile when available
        if (account?.provider === "google") {
          // ambil data dari user (pertama kali) atau profile (initial OAuth profile)
          const fullname =
            user?.name ?? profile?.name ?? profile?.given_name ?? "";
          const email = user?.email ?? profile?.email ?? "";
          const image = user?.image ?? profile?.picture ?? "";

          const data = {
            fullname,
            email,
            type: "google",
            image,
          };

          // loginWithGoogle mungkin asynchronous dan menerima callback;
          // tangani kemungkinan error dan pastikan token di-set jika callback terpanggil
          try {
            await loginWithGoogle(data, (resData: any) => {
              if (resData) {
                token.email = resData.email;
                token.fullname = resData.fullname;
                token.role = resData.role;
                token.image = resData.image;
                token.id = resData.id;
              } else {
                // fallback: simpan minimal info dari profile
                token.email = token.email ?? email;
                token.fullname = token.fullname ?? fullname;
                token.image = token.image ?? image;
              }
            });
          } catch (err) {
            console.error("jwt callback: loginWithGoogle error:", err);
            // fallback to profile/user if loginWithGoogle gagal
            token.email = token.email ?? email;
            token.fullname = token.fullname ?? fullname;
            token.image = token.image ?? image;
          }
        }

        return token;
      } catch (err) {
        console.error("jwt callback error:", err);
        return token;
      }
    },

    async session({ session, token }: any) {
      try {
        // pastikan session.user adalah object agar tidak melempar jika undefined
        if (!session.user) session.user = {} as any;

        if ("email" in token) {
          session.user.email = token.email;
        }
        if ("fullname" in token) {
          session.user.fullname = token.fullname;
        }
        if ("phone" in token) {
          session.user.phone = token.phone;
        }
        if ("role" in token) {
          session.user.role = token.role;
        }
        if ("id" in token) {
          session.user.id = token.id;
        }
        if ("image" in token) {
          session.user.image = token.image;
        }

        // hanya sign token jika NEXTAUTH_SECRET tersedia
        if (!process.env.NEXTAUTH_SECRET) {
          console.error("session callback: NEXTAUTH_SECRET is not set");
          session.accessToken = "";
          return session;
        }

        // Hindari signing token dengan object yang mempunyai cirular ref:
        // buat payload sederhana dari token agar jwt.sign tidak melempar
        const safePayload: Record<string, any> = {
          email: token.email,
          fullname: token.fullname,
          role: token.role,
          id: token.id,
          image: token.image,
        };

        const accessToken = jwt.sign(
          safePayload,
          process.env.NEXTAUTH_SECRET || "",
          {
            algorithm: "HS256",
          }
        );

        session.accessToken = accessToken;
        return session;
      } catch (err) {
        console.error("session callback error:", err);
        // jika error, kembalikan session minimal
        session.accessToken = "";
        return session;
      }
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
