import "./account-links.scss";

import discordIcon from "../../../assets/icons/discord.svg";
import malIcon from "../../../assets/icons/mal.svg";
import AnnieAPI from "../../../helpers/annie-api";
import AlertHelper from "../../../helpers/alert-helper";
import { useSelector } from "react-redux";

export default function AccountLinks() {
  const user = useSelector((state: any) => state.isLoggedIn.user);

  return (
    <div className="account-links">
      <AccountButton
        icon={discordIcon}
        name="Discord"
        color="#5865f2"
        onClick={() => console.log("Discord discord")}
      />
      <AccountButton
        icon={malIcon}
        name="My Anime List"
        color="#2e51a2"
        onClick={async () => {
          let authLoading = AlertHelper.showLoading(
            "Requesting Authentication..."
          );
          let _malAuthLink = await AnnieAPI.getMALAuthLink(user.uid);
          authLoading.close();
          window.open(_malAuthLink, "_blank", "toolbar=0,location=0,menubar=0");
        }}
      />
    </div>
  );
}

function AccountButton({
  icon,
  name,
  color,
  onClick,
}: {
  icon: string;
  name: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <div
      className="account-button"
      onClick={() => onClick()}
      style={{ backgroundColor: color }}
    >
      <div className="account-link-container">
        <img className="account-icon" src={icon} alt={`${name} icon`} />
        <span className="account-name">{name}</span>
      </div>
    </div>
  );
}
