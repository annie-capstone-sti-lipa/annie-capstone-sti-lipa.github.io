import "./profile-pic.scss";

import tempPfp from "../../../assets/temp/profile.png";
import editIcon from "../../../assets/icons/edit.svg";

export default function ProfilePic() {
  return (
    <div className="profile-pic-container">
      <div className="icon-container">
        <img className="edit-icon" src={editIcon} alt="" />
      </div>
      <img className="profile-pic" src={tempPfp} alt="profile pic" />
    </div>
  );
}
