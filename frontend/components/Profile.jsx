import axios from "axios";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";
import { useState } from "react";
import Button from "./Button";

const Profile = ({ uname, aname, role, eno, contact, email, pfp }) => {
  const { data: session } = useSession();
  const [formName, setName] = useState("");
  const [formEmail, setEmail] = useState("");
  const [formEno, setEno] = useState("");
  const [formContact, setContact] = useState("");
  const [formField, setField] = useState("Developer");

  async function setData(e) {
    e.preventDefault();
    let data = {
      access_token: session.accessToken,
      id_token: session.user.id,
      name: formName ? formName : aname,
      email: formEmail ? formEmail : email,
      enrollmentNo: formEno ? formEno : eno,
      contactNo: formContact ? formContact : contact,
      field: formField ? formField : field,
    };

    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}backend/api/set-user/`, data, { headers: { "Content-Type": "application/json" } }).then(() => {
      window.location.reload();
    });
  }

  return (
    <div className="signup">
      <form className="user-form" onSubmit={setData}>
        <div className="avatar">
          <div
            className="imageCropper"
            style={{
              backgroundImage: `url(${pfp})`,
            }}
          ></div>
        </div>
        <div className="labels">
          <label className="userHandle">{uname}</label>
          <label className="actualName capitalised">{aname}</label>
          <label className="role">{role}</label>
        </div>

        <div className="user-details">
          <div className="form-floating">
            <label className="detail-label">ENROLMENT NO</label>
            <label className="details">{eno}</label>
          </div>
          <div className="form-floating">
            <label className="detail-label">CONTACT NO</label>
            <label className="details">{contact}</label>
          </div>
          <div className="form-floating">
            <label className="detail-label">EMAIL ID</label>
            <label className="details">{email}</label>
          </div>
          <div className="form-floating">
            <label className="detail-label">GITHUB HANDLE</label>
            <label className="details">{uname}</label>
          </div>
          <div className="rankHandle">
            <label className="userHandle">()</label>
            <label className="userHandle">#RANK</label>
          </div>
        </div>
      </form>

    </div>
  );  
};

Profile.defaultProps = {
  uname: "USERNAME",
  aname: "ACTUAL NAME",
  role: "DEVELOPER",
  eno: "Lorem Ipsum",
  contact: "Lorem Ipsum",
  email: "Lorem Ipsum",
};

Profile.propTypes = {
  uname: PropTypes.string,
  aname: PropTypes.string,
  eno: PropTypes.string,
  contact: PropTypes.string,
  email: PropTypes.string,
};

export default Profile;
