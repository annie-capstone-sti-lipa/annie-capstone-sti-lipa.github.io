import "./info-button.scss";

import infoIcon from "../../../assets/icons/info.svg";
import AlertHelper from "../../../helpers/alert-helper";

export default function InfoButton({ tooltip }: { tooltip: string }) {
  return (
    <div
      className="info-button-container"
      title={tooltip}
      onClick={(event) => {
        event.stopPropagation();
        AlertHelper.infoAlert(tooltip);
      }}
    >
      <img src={infoIcon} className="info-icon" alt="info icon" />
    </div>
  );
}
