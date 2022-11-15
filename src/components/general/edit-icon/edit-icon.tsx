import editIcon from "../../../assets/icons/edit.svg";

import "./edit-icon.scss";

export default function EditIcon({ icon }: { icon?: string | undefined }) {
  return (
    <div className="edit-container">
      <img className="edit-icon" src={icon ?? editIcon} alt="edit" />
    </div>
  );
}
