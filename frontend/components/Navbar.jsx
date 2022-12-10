import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from 'next/router';
import getUser from '../apis/getUser';
import Loader from "./Loader";
import useUserStore from "../store/userStore";
import shallow from 'zustand/shallow';

const MENU_LIST = [
  //{ text: "Events", href: "/events" },
  { text: "Leaderboard", href: "/leaderboard" },
  { text: "About", href: "/about" },
  { text: "Participation", href: "/participation" },
  { text: "Join Slack", href: "https://join.slack.com/t/odysseyiitr/shared_invite/zt-1l5j7y9kh-_MOuheVROJdNeInlbdct6A" },
];

const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();
  const router = useRouter();
  const {setUser, userId} = useUserStore((state) => ({
    setUser: state.setUser,
    userId: state.user?.username || '',
  }), shallow)

  const fetchUserData = async () => {
    if(!session.user?.id || !session.accessToken) return;

    const data = await getUser({
      access_token: session.accessToken,
      id_token: session.user.id,
    })

    setIsLoading(false);
    
    if(data) {
      setUser({...data.user, rank: data.rank});
    }
    
    if (typeof data.user.enrollmentNo != 'string'      //this condition will redirect the user directly to profile
      || typeof data.user.contactNo != 'string'        //page with edit profile if their profile is not complete
      || typeof data.user.email != 'string'
      || typeof data.user.name != 'string') {
      router.push({
        pathname: '/profile',                              //details=0 is sent as parameter which opens the edit option
        query: { details: 0 }                              //on the profile page
      });
    }
    else if (router.query.details == 0 && router.pathname == '/profile') {   //even after filling the details the user still remains on the same
      router.push({                                                          //page with query details=0 so to get the user back to normal page
        pathname: '/profile',                                                //if all details are filled
      });
    }
  };


  useEffect(() => {
    if (session)
      fetchUserData();
    else {
      setIsLoading(false);
    }
  }, [session]);

  if(isLoading) {
    return <Loader/>
  }
  
  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
          <a>
            <img src="/images/logo.svg" id="navbar-logo"/>
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
