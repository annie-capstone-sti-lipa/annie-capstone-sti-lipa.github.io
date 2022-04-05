import "./account-links.scss";

import discordIcon from "../../../assets/icons/discord.svg";
import malIcon from "../../../assets/icons/mal.svg";

export default function AccountLinks() {
  return (
    <div className="account-links">
      <AccountButton
        icon={discordIcon}
        name="Discord"
        color="#5865f2"
        onClick={() => console.log("Discord")}
      />
      <AccountButton
        icon={malIcon}
        name="My Anime List"
        color="#2e51a2"
        onClick={() => console.log("MAL")}
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
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      <div className="account-link-container">
        <img className="account-icon" src={icon} alt={`${name} icon`} />
        <span className="account-name">{name}</span>
      </div>
    </div>
  );
}
