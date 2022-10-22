import { useEffect, useState } from "react";
import { readMembersFromSheet } from "../api/google_api/google_sheets_api";
import AboutTop from "../../components/AboutTop";
import MemberCards from "../../components/MemberCard";
import MemberCardGrid from "../../components/MemberCardGrid";

export default function Home() {
  const [mentors, setMentors] = useState([]);
  
  useEffect(() => {
    const fetchMentors = async () => {
      const mentors = await readMembersFromSheet(process.env.NEXT_PUBLIC_MENTOR_SHEET_ID);
      setMentors(mentors);
    }

    fetchMentors();

  }, []);

  return (
    <div>
      <AboutTop />
      <div className="about">
        <p className="role-title">organizers</p>
        <div className="members">
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/bisht13.jpeg"}
              name="Aditya Bisht"
            />
          </div>
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/MayankMittal1.jpeg"}
              name="Mayank Mittal"
            />
          </div>
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/avii.jpeg"}
              name="Archit Gosian"
            />
          </div>
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/anshul.png"}
              name="Anshul Singh"
            />
          </div>
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/pragyansh.jpeg"}
              name="Pragyansh Chaturvedi"
            />
          </div>
        </div>
      </div>
      <div className="about">
        <p className="role-title">mentors</p>
        <MemberCardGrid members={mentors} />
      </div>
      <div className="about">
        <p className="role-title">designers &amp; developers</p>
      <div className="members">
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/bisht13.jpeg"}
              name="Aditya Bisht"
            />
          </div>
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/MayankMittal1.jpeg"}
              name="Mayank Mittal"
            />
          </div>
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/avii.jpeg"}
              name="Archit Gosian"
            />
          </div>
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/anshul.png"}
              name="Anshul Singh"
            />
          </div>
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/pragyansh.jpeg"}
              name="Pragyansh Chaturvedi"
            />
          </div>
        </div>
        </div>
    </div>
  );
}
