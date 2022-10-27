import Button from "./Button";
import SocialIcons from "./SocialIcons";
const HomePage = ({ refs }) => {
  return (
    <div className="placard">
      <SocialIcons />

      <div className="placard-text">
        <div>
          <h1>OPEN SOURCE ODYSSEY</h1>
        </div>
        <div>
          <p>
            A month long celebration of contributing to open source. Join us and
            others like you on this journey. get hacking, make pull requests,
            and win some cool swag!
          </p>
        </div>
        <div>
          <Button
            text={"TIMELINE"}
            onClick={() => {
              if (refs && refs.current) {
                refs.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                });
              }
            }}
          />
        </div>
      </div>
      <div className="rightlane">
        <div className="odysseyimage">
          <img src="/images/home-illus.svg" alt="Odyssey" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
