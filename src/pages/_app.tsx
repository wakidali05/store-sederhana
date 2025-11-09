import { Session } from "inspector/promises";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/fragments/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const disableNavbar = ["auth", "admin"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();

  return (
    <SessionProvider session={session}>
      <Head>
        <link
          href="https://cdn.boxicons.com/3.0.3/fonts/basic/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className={lato.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
