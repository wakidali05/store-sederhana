import { Session } from "inspector/promises";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/layouts/Navbar";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <div className={lato.className}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
