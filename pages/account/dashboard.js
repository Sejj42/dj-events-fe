import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import React from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Dashboard.module.css";

const DashboardPage = ({ events }) => {
  const deleteEvent = (id) => {
    console.log(id);
  };
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => {
          return (
            <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
          );
        })}
      </div>
    </Layout>
  );
};

export default DashboardPage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/api/events/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const events = await res.json();
  return {
    props: {
      events,
    },
  };
}
