import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SearchPage({ events }) {
  console.log("below is events");
  console.log(events);
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/events">&larr; Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show.</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
    </Layout>
  );
}

const getServerSideProps = async ({ query: { term } }) => {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $containsi: term,
            },
          },
          {
            performers: {
              $containsi: term,
            },
          },
          {
            description: {
              $containsi: term,
            },
          },
          {
            venue: {
              $containsi: term,
            },
          },
        ],
      },
    },
    { encode: false }
  );
  const res = await fetch(`${API_URL}/api/events?${query}&[populate]=image`);
  const events = await res.json();

  return {
    props: {
      events: events.data,
    },
  };
};

export { getServerSideProps };
