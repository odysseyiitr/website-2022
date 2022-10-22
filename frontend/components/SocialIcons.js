import React from "react";
const SocialIcons = () => {
  return (
    <div className="placard-icons">
      <a
        href="https://www.instagram.com/odyssey.iitr/"
        target="_blank"
        referrerPolicy="norefferer"
      >
        <img
          className="placard-icons-instagram"
          src="/images/instagram2.svg"
          alt="instagram"
        />
      </a>
      <a
        href="https://github.com/odysseyiitr"
        target="_blank"
        referrerPolicy="norefferer"
      >
        <img
          className="placard-icons-github"
          src="/images/github2.svg"
          alt="github"
        />
      </a>
    </div>
  );
};
export default SocialIcons;
