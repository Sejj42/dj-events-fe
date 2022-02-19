import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";
import { FaExclamationTriangle } from "react-icons/fa";
const NotFoundPage = () => {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1>
          <span>
            <FaExclamationTriangle />{" "}
          </span>
          404
        </h1>
        <h2>Sorry, this page does not exist.</h2>
        <br />
        <Link href="/">&larr; Return Home</Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
