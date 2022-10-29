// Text Font: BankGothic Md BT

const timelineData = [
  {
    text: "odyssey starts",
    date: "6 th oct",
    dateObj: new Date("October 6, 2022 00:00:00"),
  },
  {
    text: "workspace and git setup workshop",
    date: "8 th Oct",
    dateObj: new Date("October 8, 2022 00:00:00"),
  },
  {
    text: "contribution start",
    date: "12 th Oct",
    dateObj: new Date("October 12, 2022 00:00:00"),
  },
  {
    text: "opensource opportunities talk",
    date: "22 th Oct",
    dateObj: new Date("October 22, 2022 00:00:00"),
  },
  {
    text: "design hackathon",
    date: "28 th Oct",
    dateObj: new Date("October 28, 2022 00:00:00"),
  },
  {
    text: "24 hour contribution sprint",
    date: "29 th Oct",
    dateObj: new Date("October 29, 2022 00:00:00"),
  },
  {
    text: "closing ceremony",
    date: "31 th Oct",
    dateObj: new Date("October 31, 2022 00:00:00"),
  },
];

function computeTimelineLength() {
  let i = 0;
  for (let x of timelineData) {
    i++;
    if (x.dateObj < new Date()) {
      i += (new Date() - x.dateObj) / (timelineData[i + 1].dateObj - x.dateObj);
      break;
    }
  }

  return i / 6;
}

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <div className="timeline-item-date">
        <time>{data.date}</time>
      </div>
      {data.dateObj < new Date() ? (
        <div className="timeline-item-logo">
          <img src="/TimelineCheckMark.svg" />
        </div>
      ) : (
        <div className="timeline-item-logo">
          <img src="/TimelineCheckMarkDull.svg" />
        </div>
      )}

      <div className="timeline-item-text">
        <p>{data.text}</p>
      </div>
    </div>
  </div>
);

const Timeline = ({ refs }) =>
  timelineData.length > 0 && (
    <div className="timeline" ref={refs}>
      <h1>Timeline</h1>
      <div className="timeline-container">
        {timelineData.map((data, idx) => (
          <TimelineItem data={data} key={idx} />
        ))}
        <div className="timeline-active" />
        <style jsx>{`
          .timeline-active {
            color: blue;
            background: linear-gradient(
              90deg,
              rgba(80, 41, 189, 0.69) 0%,
              rgba(129, 41, 82, 0.79) 59%,
              rgba(233, 69, 96, 1) 100%
            );
            content: "";
            position: absolute;
            top: calc(50% - 2.3rem);
            left: 7%;
            width: ${100 * computeTimelineLength(100) * 0.78}%;
            height: 1.25rem;
            z-index: 10;
            border-radius: 3.026rem;
          }
        `}</style>
      </div>
    </div>
  );

export default Timeline;
