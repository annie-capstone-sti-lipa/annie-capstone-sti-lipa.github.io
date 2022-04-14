import "./code-vault.scss";

import addIcon from "../../assets/icons/add.svg";

export default function CodeVault() {
  return (
    <div className="code-vault">
      <div className="button-container">
        <div className="add-button">
          <img className="add-icon" src={addIcon} alt="add code" />
          <span>Add</span>
        </div>
      </div>
    </div>
  );
}
