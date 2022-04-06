import "./profile-pic.scss";

import tempPfp from "../../../assets/temp/profile.png";
import editIcon from "../../../assets/icons/edit.svg";

import { useState } from "react";
import Modal from "../../modal/modal";
import EditIcon from "../../edit-icon/edit-icon";

export default function ProfilePic() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="profile-pic-container"
      onClick={() => {
        setShowModal(() => true);
      }}
    >
      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(() => false)}
        body={<ModalBody closeModal={() => setShowModal(() => false)} />}
      />
      <EditIcon />
      <img className="profile-pic" src={tempPfp} alt="profile pic" />
    </div>
  );
}

function ModalBody({ closeModal }: { closeModal: () => void }) {
  return (
    <div className="image-modal" onClick={(event) => event.stopPropagation()}>
      <img className="modal-pfp" src={tempPfp} alt="pfp" />
      <div className="buttons">
        <div className="upload-button">Upload</div>
        <div className="save-button" onClick={() => closeModal()}>
          Save
        </div>
      </div>
    </div>
  );
}
