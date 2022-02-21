import { API_URL } from "@/config/index";
import Layout from "../../components/Layout";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";

const EventPage = ({ evt }) => {
  const deleteEvent = (e) => {
    console.log("delete");
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(evt.date).toLocaleDateString("en-GB")} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={
                evt.image.data
                  ? evt.image.data.attributes.formats.large.url
                  : "/images/event-default.png"
              }
              width={960}
              height={600}
              alt="evt_img"
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>&larr; Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};
export default EventPage;

// const getServerSideProps = async ({ query: { slug } }) => {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// };

// export { getServerSideProps };

// const getStaticPaths = async () => {
//   const res = await fetch(`${API_URL}/api/events`);
//   const events = await res.json();

//   const paths = events.map((evt) => ({
//     params: { slug: evt.slug },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// };

// export { getStaticPaths };

const getServerSideProps = async ({ query: { slug } }) => {
  const res = await fetch(`${API_URL}/api/events?populate=image&?=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events.data[0].attributes,
    },
  };
};

export { getServerSideProps };
