import "./manga-card.scss";

import trashIcon from "../../../assets/icons/trash.svg";
import editIcon from "../../../assets/icons/edit.svg";

export default function MangaCard({ sauce }: { sauce: number }) {
  return (
    <div className="manga-card">
      <div className="sauce">{sauce}</div>
      <img
        src={`https://t5.nhentai.net/galleries/${sauce}/cover.jpg`}
        alt="manga thumbnail"
        className="thumbnail"
        referrerPolicy="same-origin"
      />
      <div className="buttons">
        <div
          className="edit-button"
          onClick={(event) => event.stopPropagation()}
        >
          <img className="button-icon" src={editIcon} alt="edit button" />
        </div>
        <div
          className="delete-button"
          onClick={(event) => event.stopPropagation()}
        >
          <img className="button-icon" src={trashIcon} alt="delete button" />
        </div>
      </div>
    </div>
  );
}
