import AboutTop from "../../components/AboutTop";
import MemberCards from "../../components/MemberCard";

export default function Home() {
  return (
    <div>
      <AboutTop />
      {/* <div className='about'>
            <p>Designers</p>
            <div className='members'>
            <div className='member'><MemberCards imgsource={'/ok.jpg'} name="urmom"/></div>
            <div className='member'><MemberCards imgsource={'/ok.jpg'} name="urmom"/></div>
            <div className='member'><MemberCards imgsource={'/ok.jpg'} name="urmom"/></div>
            <div className='member'><MemberCards imgsource={'/ok.jpg'} name="urmom"/></div>
            <div className='member'><MemberCards imgsource={'/ok.jpg'} name="urmom"/></div>
            </div>
        </div>
        <div className='about'>
            <p>Developers</p>
            <div className='members'>
            <div className='member'><MemberCards imgsource={'/ok.jpg'} name="urmom"/></div>
            <div className='member'><MemberCards imgsource={'/ok.jpg'} name="urmom"/></div>
            <div className='member'><MemberCards imgsource={'/ok.jpg'} name="urmom"/></div>
            <div className='member'><MemberCards imgsource={'/ok.jpg'} name="urmom"/></div>
            </div>
        </div> */}
      <div className="about">
        <p class="mentors">Mentors</p>
        <div className="members">
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/bisht13.jpeg"}
              name="Aditya Bisht"
            />
          </div>
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/MayankMittal1.jpeg"}
              name="Mayank Mittal"
            />
          </div>
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/avii.jpeg"}
              name="Archit Gosian"
            />
          </div>
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/anshul.png"}
              name="Anshul Singh"
            />
          </div>
          <div className="member">
            <MemberCards
              imgsource={"/images/mentors/pragyansh.jpeg"}
              name="Pragyansh Chaturvedi"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
