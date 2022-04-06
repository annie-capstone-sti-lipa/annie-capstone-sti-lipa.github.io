import editIcon from "../../assets/icons/edit.svg";

import "./edit-icon.scss";

export default function EditIcon() {
  return (
    <div className="edit-container">
      <img className="edit-icon" src={editIcon} alt="edit" />
    </div>
  );
}
