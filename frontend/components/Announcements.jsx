import AnouncementCard from "./AnouncementCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Announcement = ({ data }) => {
  function slideLeft() {
    var slider = document.getElementById("anouncementList");
    if (!slider) {
      return;
    }
    slider.scrollLeft =
      slider.scrollLeft -
      (document.getElementsByClassName("card")[0].scrollWidth + 35) * 3;
  }
  function slideRight() {
    var slider = document.getElementById("anouncementList");
    if (!slider) {
      return;
    }
    slider.scrollLeft =
      slider.scrollLeft +
      (document.getElementsByClassName("card")[0].scrollWidth + 35) * 3;
  }
  return (
    <div className="announcement">
      <h1>Announcement</h1>

      <div className="anouncebox">
        <MdChevronLeft
          onClick={() => slideLeft()}
          size={50}
          style={{
            marginTop: "220px",
          }}
        />
        <div className="anouncementList" id="anouncementList">
          {data.map((item, i) => {
            return (
              <AnouncementCard
                date={item.date}
                key={i}
                heading={item.title}
                description={item.description}
              />
            );
          })}
        </div>
        <MdChevronRight
          onClick={() => slideRight()}
          size={50}
          style={{
            marginTop: "220px",
          }}
        />
      </div>
    </div>
  );
};
export default Announcement;
