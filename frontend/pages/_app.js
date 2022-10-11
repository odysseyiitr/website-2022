import Navbar from "../components/Navbar";
import Card from "../components/Card";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Card />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
