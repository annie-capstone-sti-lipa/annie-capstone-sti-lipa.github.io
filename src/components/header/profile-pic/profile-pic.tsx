import "./profile-pic.scss";

import Modal from "react-modal";

import tempPfp from "../../../assets/temp/profile.png";
import editIcon from "../../../assets/icons/edit.svg";
import closeIcon from "../../../assets/icons/close.svg";

import { useState } from "react";

export default function ProfilePic() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="profile-pic-container"
      onClick={() => {
        setShowModal(() => true);
      }}
    >
      <Dialog
        showModal={showModal}
        closeModal={() => setShowModal(() => false)}
      />
      <div className="icon-container">
        <img className="edit-icon" src={editIcon} alt="edit" />
      </div>
      <img className="profile-pic" src={tempPfp} alt="profile pic" />
    </div>
  );
}

function Dialog({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) {
  return (
    <Modal
      isOpen={showModal}
      className="modal"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={(event) => {
        event.stopPropagation();
        closeModal();
      }}
    >
      <div className="image-modal" onClick={(event) => event.stopPropagation()}>
        <div className="close-icon-container">
          <img
            className="close-icon"
            src={closeIcon}
            onClick={() => closeModal()}
            alt="close"
          />
        </div>
        <img className="modal-pfp" src={tempPfp} alt="pfp" />
        <div className="buttons">
          <div className="upload-button">Upload</div>
          <div className="save-button" onClick={() => closeModal()}>
            Save
          </div>
        </div>
      </div>
    </Modal>
  );
}
