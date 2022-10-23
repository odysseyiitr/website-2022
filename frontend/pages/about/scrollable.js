import { useEffect, useState } from "react";
import { readMembersFromSheet } from "../api/google_api/google_sheets_api";
import AboutTop from "../../components/AboutTop";
import MemberCards from "../../components/MemberCard";
import MemberCardGrid from "../../components/MemberCardGrid";

export default function Home() {
  const [mentors, setMentors] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [developers, setDevelopers] = useState([]);
  
  useEffect(() => {
    const fetchMentors = async () => {
      const mentorsList = await readMembersFromSheet(process.env.NEXT_PUBLIC_MENTOR_SHEET_ID);
      setMentors(mentorsList);
    }

    const fetchOragnizers = async () => {
      const organizersList = await readMembersFromSheet(process.env.NEXT_PUBLIC_ORGANIZERS_SHEET_ID);
      setOrganizers(organizersList);
    }

    const fetchDevelopersAndDesigners = async () => {
      const developersList = await readMembersFromSheet(process.env.NEXT_PUBLIC_DEVELOPERS_AND_DESIGNERS_SHEET_ID);
      setDevelopers(developersList);
    }

    fetchMentors();
    fetchOragnizers();
    fetchDevelopersAndDesigners();

  }, []);

  return (
    <div>
      <AboutTop />
      <div className="about">
        <p className="role-title">organizers</p>
        <MemberCardGrid members={organizers} />
      </div>
      <div className="about">
        <p className="role-title">mentors</p>
        <MemberCardGrid members={mentors} />
      </div>
      <div className="about">
        <p className="role-title">designers &amp; developers</p>
        <MemberCardGrid members={developers} />
        </div>
    </div>
  );
}
