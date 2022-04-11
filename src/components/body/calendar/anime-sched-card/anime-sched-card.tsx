import { useState } from "react";
import Modal from "../../../modal/modal";
import "./anime-sched-card.scss";

export default function AnimeSchedCard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="anime-sched-card" onClick={() => setShowModal(true)}>
      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(() => false)}
        body={<ModalBody closeModal={() => setShowModal(() => false)} />}
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Ancient_Magus%27_Bride%2C_volume_1.jpg/220px-The_Ancient_Magus%27_Bride%2C_volume_1.jpg"
        alt=""
        className="thumbnail"
        draggable={false}
      />
      <div className="anime-name">Mahoutsukai no yome</div>
    </div>
  );
}

function ModalBody({ closeModal }: { closeModal: () => void }) {
  return (
    <div
      className="anime-sched-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="anime-details-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Ancient_Magus%27_Bride%2C_volume_1.jpg/220px-The_Ancient_Magus%27_Bride%2C_volume_1.jpg"
          alt=""
          className="thumbnail"
        />
        <div className="anime-details">
          <div className="title">
            <div className="name">Mahoutsukai no yome</div>
            <div className="ratings">********</div>
          </div>
          <div className="synopsis">
            Cupidatat voluptate cupidatat magna Lorem occaecat fugiat
            exercitation sit sit. Lorem incididunt minim ipsum proident
            incididunt. Dolor ipsum cillum esse non consequat ea Lorem culpa.
            Culpa elit voluptate veniam laborum veniam consequat nulla fugiat
            laboris. Culpa voluptate proident qui incididunt deserunt quis enim
            eiusmod duis quis.
          </div>
          <div className="link-input">
            <div>Link:</div>
            <input
              type="text"
              className="input"
              placeholder="https://www.netflix.com/watch/81511413"
            />
            <div className="update">Update</div>
          </div>
          <div className="hint">
            *add the link for the website that you want to stream the anime on
            and it will automatically redirect you it when you press the play
            button in the calendar.
          </div>
          <div className="actions">
            <div className="mark-complete">Mark Complete</div>
            <div className="hold">Put on hold</div>
            <div className="drop">Drop</div>
          </div>
        </div>
      </div>
    </div>
  );
}
