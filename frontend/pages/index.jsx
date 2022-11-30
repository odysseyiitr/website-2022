import HomePage from "../components/HomePage";
import Timeline from "../components/Timeline";
import Announcement from "../components/Announcements";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Home() {
  const timeline = useRef();
  const [announcement, setAnnouncement] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}backend/api/get-announcements/`)
      .then((res) => {
        setAnnouncement(res.data);
      });
  }, []);
  return (
    // <div>
    //   <HomePage refs={timeline} />
    //   <Timeline refs={timeline} />
    //   <Announcement data={announcement} />
    // </div>
    <div className="anouncementCard">
      <div className="anouncementCard_container">
        <div className="AnouncementCard_content">
        </div>
      </div>
    </div>

  );
}
