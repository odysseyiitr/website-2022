import React, { Component } from "react";
import Image from "next/image";

class Footer extends Component {
  render() {
    return (
      <>
        <div className="footer">
          <div className="footer-1">
            <div className="footer-logo">
              <img src="/images/logo.svg"></img>
            </div>
            <div className="footer-1_text">ODYSSEY</div>
          </div>
          <div className="footer-text">
            In real open-source, you have the right to control your own destiny
          </div>
          <div className="footer-social">
            <div className="contact">
              <div className="footer-social-text">Contact Us</div>
              <div className="social-icons">
                <a
                  href="https://github.com/odysseyiitr"
                  target="_blank"
                  referrerPolicy="norefferer"
                  rel="noreferrer"
                >
                  <img className="icon_img" src="/images/github.svg" />
                </a>
                <a
                  href="https://www.instagram.com/odyssey.iitr/"
                  target="_blank"
                  referrerPolicy="norefferer"
                  rel="noreferrer"
                >
                  <img className="icon_img" src="/images/instagram.svg" />
                </a>
                <a
                  href="mailto:odysseyiitr@gmail.com"
                  target="_blank"
                  referrerPolicy="norefferer"
                  rel="noreferrer"
                >
                  <img className="icon_img" src="/images/email.svg" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-credits">
          <span className="footer-credits-text">Made with ❤️ by</span>&nbsp;
          <Image src="/images/labs.svg" height={32} width={32} />
        </div>
      </>
    );
  }
}

export default Footer;
