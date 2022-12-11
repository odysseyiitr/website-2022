import axios from "axios";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useRouter } from 'next/router';
import Button from "./Button";
const EditProfile = ({pfp}) => {
    const { data: session } = useSession();
    const [editProfile, setEdit] = useState(true);
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

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/set-user/`, data, { headers: { "Content-Type": "application/json" } }).then(() => {
            window.location.reload();
        });
    }

    return (
        <>
            <div className="signup">
                <form className="signupForm" onSubmit={setData}>
                    <div className="avatar">
                        <div
                            className="formImage"
                            style={{
                                backgroundImage: `url(${pfp})`,
                            }}
                        ></div>
                    </div>
                    <div className="user-details">
                        <div className="form-floating">
                            <label>ACTUAL NAME</label>
                            <input
                                type="text"
                                placeholder="ENTER YOUR NAME"
                                className="input"
                                onChange={(e) => setName(e.target.value)}
                                value={formName}
                            />
                        </div>
                        <div className="form-floating">
                            <label>ENROLMENT NO</label>
                            <input
                                type="text"
                                placeholder="ENTER ENROLLMENT NO."
                                pattern="[0-9]{8}"
                                className="input"
                                title="enrollment number should contain only 8 numeric digits"
                                onChange={(e) => setEno(e.target.value)}
                                value={formEno}
                            />
                        </div>
                        <div className="form-floating">
                            <label>CONTACT NO</label>
                            <input
                                type="tel"
                                placeholder="ENTER CONTACT NO."
                                pattern="[0-9]{10}"
                                title="phone number should contain only 10 numeric digits"
                                className="input"
                                onChange={(e) => setContact(e.target.value)}
                                value={formContact}
                            />
                        </div>
                        <div className="form-floating">
                            <label>EMAIL ID</label>
                            <input
                                type="email"
                                placeholder="ENTER EMAIL ID"
                                className="input"
                                onChange={(e) => setEmail(e.target.value)}
                                value={formEmail}
                            />
                        </div>
                        <div
                            className="submit-button-profile"
                        >
                            <Button type="submit" text={"Sign Up"} />
                        </div>

                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProfile;
