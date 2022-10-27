import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import "../styles/globals.scss";
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Odyssey</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
