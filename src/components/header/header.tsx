import "./header.scss";

import ProfilePic from "./profile-pic/profile-pic";

export default function Header() {
  return (
    <div id="header">
      <div className="container">
        <div className="header-container">
          <ProfilePic />
          <div>name and bio</div>
          <div>kanji quiz score</div>
          <div>mal discord</div>
        </div>
      </div>
    </div>
  );
}
