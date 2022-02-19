import styles from "@/styles/EventItem.module.css";
import Image from "next/image";
import Link from "next/link";

const EventItem = ({ evt }) => {
  console.log("EventItem below");
  console.log(evt);
  // console.log(evt.image);
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.image
              ? evt.image.data.attributes.formats.thumbnail.url
              : "/images/event-default.png"
          }
          alt=""
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className={"btn"}>Details</a>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
