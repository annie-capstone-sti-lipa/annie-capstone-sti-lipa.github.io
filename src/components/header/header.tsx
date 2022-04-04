import Bio from "./bio/bio";
import "./header.scss";

import ProfilePic from "./profile-pic/profile-pic";
import Tabnav from "./tabnav/tabnav";

export default function Header() {
  return (
    <div id="header">
      <div className="container">
        <div className="header-container">
          <ProfilePic />
          <Bio />
          <div>kanji quiz score</div>
          <div>mal discord</div>
        </div>
      </div>
      <Tabnav />
    </div>
  );
}
