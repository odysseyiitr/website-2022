import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";

const MENU_LIST = [
  //{ text: "Events", href: "/events" },
  //{ text: "Leaderboard", href: "/leaderboard" },
  { text: "About", href: "/about" },
  { text: "Participation", href: "/participation" },
];

const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [userId, setUserId] = useState("");

  const { data: session } = useSession();

  const fetchUserData = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/get-user/`,
      { access_token: session.accessToken, id_token: session.user.id },
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  };

  useEffect(() => {
    if (session)
      fetchUserData().then((response) => {
        setUserId(response.data.username);
      });
  }, [session]);

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
          <a>
            <img src="/images/logo.svg" id="navbar-logo"></img>
          </a>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
          {!session ? (
            <button
              className="login_signupButton"
              onClick={() => signIn("github")}
            >
              LOGIN / SIGNUP
            </button>
          ) : (
            <div className="dropdownmenu">
              {userId}
              <div className="dropdown">
                <button className="profile_button">
                  <NavItem {...{ text: "Profile", href: "/profile" }} />
                </button>
                <button className="logout_button" onClick={() => signOut()}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
