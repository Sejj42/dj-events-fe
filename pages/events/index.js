import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import Link from "next/link";
const qs = require("qs");

const PER_PAGE = 2;

export default function EventsPage({ events, page, accumulated, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  const prevPage = Math.ceil(accumulated / PER_PAGE);
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show.</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}

      {page > 1 && (
        <Link href={`/events?page=${prevPage}`}>
          <a className="btn-secondary">&larr; Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next &rarr;</a>
        </Link>
      )}
    </Layout>
  );
}

const getServerSideProps = async ({ query: { page = 1 } }) => {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const query = qs.stringify(
    {
      pagination: {
        start: start,
        limit: PER_PAGE,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const eventRes = await fetch(`${API_URL}/api/events?${query}&populate=*`);
  const events = await eventRes.json();

  return {
    props: {
      events: events.data,
      page: +page,
      accumulated: events.meta.pagination.start,
      total: events.meta.pagination.total,
    },
  };
};

export { getServerSideProps };
