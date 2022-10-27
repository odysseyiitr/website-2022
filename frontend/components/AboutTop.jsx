import SocialIcons from "./SocialIcons";

const AboutTop = () => {
  return (
    <div className="placard">
      <SocialIcons />
      <div className="placard-text">
        <div>
          <h1>Hello World!</h1>
        </div>
        <div>
          <p>
            ODYSSEY IS A CELEBRATION OF CONTRIBUTING TO OPEN SOURCE. THE MAIN
            AIM OF ORGANISING THIS EVENT IS TO SPREAD AWARENESS AND TO BUILD A
            COLLEGE-LEVEL OPEN SOURCE COMMUNITY KNOW MORE ABOUT THE TEAM BEHIND
            THIS EVENT.
          </p>
        </div>
        <h4>IN ASSOCIATION WITH</h4>
        <div className="icons">
          <div className="icon">
            <img src="/images/labs.svg" />
          </div>
          <div className="icon">
            <img src="/images/mdg.svg" />
          </div>
          <div className="icon">
            <img src="/images/acm.svg" />
          </div>
          <div className="icon">
            <img src="/images/dsg.svg" />
          </div>
          <div className="icon">
            <img src="/images/ds.svg" />
          </div>
          <div className="icon">
            <img src="/images/infosec.svg" />
          </div>
        </div>
      </div>
      <div className="rightlane">
        <div className="odysseyimage">
          <img src="/images/about_icon.svg" alt="abouticon" />
        </div>
      </div>
    </div>
  );
};

export default AboutTop;
