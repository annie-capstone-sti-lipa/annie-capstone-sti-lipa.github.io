import "./code-vault.scss";

import addIcon from "../../assets/icons/add.svg";
import { useState } from "react";
import Modal from "../general/modal/modal";

import theNumbers from "../../assets/images/numbers.jpg";
import MangaCard from "./manga-card/manga-card";

export default function CodeVault() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="code-vault">
      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(() => false)}
        body={<ModalBody closeModal={() => setShowModal(() => false)} />}
      />
      <div className="button-container">
        <div className="add-button" onClick={() => setShowModal(true)}>
          <img className="add-icon" src={addIcon} alt="add code" />
          <span>Add</span>
        </div>
      </div>
      <div className="card-container">
        <MangaCard sauce={2056560} />
        <MangaCard sauce={2056560} />
        <MangaCard sauce={2056560} />
        <MangaCard sauce={2056560} />
        <MangaCard sauce={2056560} />
        <MangaCard sauce={2056560} />
      </div>
    </div>
  );
}

function ModalBody({ closeModal }: { closeModal: () => void }) {
  return (
    <div className="code-modal" onClick={(event) => event.stopPropagation()}>
      <img
        className="numbers-image"
        src={theNumbers}
        alt="What are the numbers ?"
      />
      <div className="question-container">
        <div className="input-container">
          <div className="question">What are the numbers?</div>
          <input className="input" type="text" placeholder="777777" />
        </div>
        <div className="submit-button">
          <img className="submit-icon" src={addIcon} alt="add code" />
          <span>Submit</span>
        </div>
      </div>
    </div>
  );
}
