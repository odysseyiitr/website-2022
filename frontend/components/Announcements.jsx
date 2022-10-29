import EventCard from "./EventCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Announcement = ({ data }) => {
  function slideLeft() {
    var slider = document.getElementById("events");
    if (!slider) {
      return;
    }
    slider.scrollLeft =
      slider.scrollLeft -
      (document.getElementsByClassName("card")[0].scrollWidth + 35) * 3;
  }
  function slideRight() {
    var slider = document.getElementById("events");
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
        <div className="events" id="events">
          {data.map((item, i) => {
            return (
              <EventCard
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
