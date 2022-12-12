import axios from "axios";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useRouter } from 'next/router';
import Button from "./Button";
import { useEffect } from "react";
const EditProfile = ({ uname, aname, eno, contact, email, field, pfp }) => {
    const { data: session } = useSession();
    const [editProfile, setEdit] = useState(true);
    const [formName, setName] = useState("");
    const [formEmail, setEmail] = useState("");
    const [formEno, setEno] = useState("");
    const [formContact, setContact] = useState("");
    const [formField, setField] = useState("");
    const [fieldColor, setColor] = useState("rgba(255, 255, 255, 0.4)");
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

    useEffect(()=>{
        if(formField=="Developer" || formField=="Designer")
        setColor("rgba(255, 255, 255)")
    })

    return (
        <>
            <div className="signup">
                <form className="signupForm" onSubmit={setData}>
                    <div className="formAvatar">
                        <div
                            className="formImage"
                            style={{
                                backgroundImage: `url(${pfp})`,
                            }}
                        ></div>
                        <div className="userHandleForm">{uname}</div>
                        <select name="field" onChange={(e) => setField(e.target.value)} className="roleDropDown" style={{color:fieldColor}}>
                            <option value="" disabled selected hidden>Select Field</option>
                            <option className="options1" value="Developer">Developer</option>
                            <option className="options2" value="Designer">Designer</option>
                        </select>
                    </div>
                    <div className="userDetailsForm">
                        <div className="formEdit">
                            <label>ACTUAL NAME</label>
                            <input
                                type="text"
                                placeholder="ENTER YOUR NAME"
                                className="input"
                                onChange={(e) => setName(e.target.value)}
                                value={formName}
                            />
                        </div>
                        <div className="formEdit">
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
                        <div className="formEdit">
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
                        <div className="formEdit">
                            <label>EMAIL ID</label>
                            <input
                                type="email"
                                placeholder="ENTER EMAIL ID"
                                className="input"
                                onChange={(e) => setEmail(e.target.value)}
                                value={formEmail}
                            />
                        </div>
                        <div    className="submitProfile">
                            <Button type="submit" text={"Sign Up"} />
                        </div>

                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProfile;
