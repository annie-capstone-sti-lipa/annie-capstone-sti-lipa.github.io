import { ReactElement } from "react";
import Modal from "react-modal";

import "./modal.scss";

import closeIcon from "../../assets/icons/close.svg";

export default function Dialog({
  showModal,
  closeModal,
  body,
}: {
  showModal: boolean;
  closeModal: () => void;
  body: ReactElement;
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
      <div className="modal-container">
        {body}
        <div className="close-icon-container">
          <img
            className="close-icon"
            src={closeIcon}
            onClick={(event) => {
              event.stopPropagation();
              closeModal();
            }}
            alt="close"
          />
        </div>
      </div>
    </Modal>
  );
}
