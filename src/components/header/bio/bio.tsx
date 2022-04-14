import { useState } from "react";
import Modal from "../../general/modal/modal";
import "./bio.scss";

import EditIcon from "../../edit-icon/edit-icon";

export default function Bio() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="name-and-bio" onClick={() => setShowModal(() => true)}>
      <EditIcon />
      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(() => false)}
        body={<ModalBody closeModal={() => setShowModal(() => false)} />}
      />
      <div className="name">Annie</div>
      <div className="bio">
        Qui veniam deserunt magna nisi proident labore duis aliquip non nostrud
        deserunt et.
      </div>
    </div>
  );
}

function ModalBody({ closeModal }: { closeModal: () => void }) {
  return (
    <div className="bio-modal" onClick={(event) => event.stopPropagation()}>
      <div className="input-container">
        <div>Name:</div>
        <input type="text" className="name-input" placeholder="Annie" />
        <div>Bio:</div>
        <textarea
          className="bio-input"
          placeholder="Qui veniam deserunt magna nisi proident labore duis aliquip non nostrud
        deserunt et."
          maxLength={300}
        />
      </div>
      <div className="button-container">
        <div className="save-button" onClick={() => closeModal()}>
          Save Changes
        </div>
      </div>
    </div>
  );
}
