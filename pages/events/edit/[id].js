import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import Link from "next/link";
import { API_URL } from "@/config/index";
import Image from "next/image";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

const EditEventPage = ({ evt }) => {
  console.log(evt);
  console.log(evt.attributes.slug);
  const [values, setValues] = useState({
    name: evt.attributes.name,
    performers: evt.attributes.performers,
    venue: evt.attributes.venue,
    address: evt.attributes.address,
    date: evt.attributes.date,
    time: evt.attributes.time,
    description: evt.attributes.description,
  });
  const [imgPreview, setImgPreview] = useState(
    evt.attributes.image.data
      ? evt.attributes.image.data.attributes.formats.thumbnail.url
      : null
  );
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (hasEmptyFields) {
      toast.error("Please fill in all fields.");
    }
    const data = { data: { ...values } };
    const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Something went wrong.");
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.data.attributes.slug}`);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/api/events/${evt.id}?populate=image`);
    const data = await res.json();
    console.log("below is imageuploaded res data");
    console.log(data);
    setImgPreview(data.attribtues.image.data.formats.thumbnail.url);
    setShowModal(false);

    // setImgPreview(data.image.formats.thumbnail.url);

    // evt.attributes.image.data.attributes.formats.thumbnail.url
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">&larr; Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Update Event" className="btn" />
      </form>
      <h2>Event Image</h2>
      {imgPreview ? (
        <Image
          src={imgPreview}
          width="170px"
          height="100px"
          alt="evt_img_preview"
        />
      ) : (
        <div>
          <p>No Image uploaded</p>
        </div>
      )}

      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
};

export default EditEventPage;

const getServerSideProps = async ({ params: { id }, req }) => {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=image`);
  const evt = await res.json();
  console.log(req.headers.cookie);

  return {
    props: {
      evt: evt.data,
    },
  };
};

export { getServerSideProps };
