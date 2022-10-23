import MemberCards from "./MemberCard";

const MemberCardGrid = ({ members }) => {
    return (
        <div className="members">
          {members.map((member, index) => {
            return (<div key={index} className="member">
              <MemberCards
              imgsource={member.profile_image}
              name={member.name}
            />
            </div>)
          }
          )}
        </div>
    )
}

export default MemberCardGrid;