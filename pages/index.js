import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show.</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

const getStaticProps = async () => {
  const res = await fetch(
    `${API_URL}/api/events?[populate]=image&?_sort=date:ASC&_limit=3`
  );
  const events = await res.json();

  return {
    props: {
      events: events.data,
    },
    revalidate: 1,
  };
};

export { getStaticProps };
