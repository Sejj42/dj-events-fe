import Head from "next/head";
import styles from "../styles/Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ title, keywords, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      <div className={styles.container}>{children}</div>

      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "DJ Events | Find the Hottest Parties",
  description: "Find the latest DJ and other musical events",
  keywords: "music, dj, edm, events, event",
};

export default Layout;
