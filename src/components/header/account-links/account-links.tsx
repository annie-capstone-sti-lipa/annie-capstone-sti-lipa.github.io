import "./account-links.scss";

import discordIcon from "../../../assets/icons/discord.svg";
import malIcon from "../../../assets/icons/mal.svg";
import AnnieAPI from "../../../helpers/annie-api";
import AlertHelper from "../../../helpers/alert-helper";
import { useSelector } from "react-redux";
import Modal from "../../general/modal/modal";
import { useState } from "react";
import DiscordAuth from "../../../types/discord-auth";

export default function AccountLinks() {
  const [showDiscordModal, setShowDiscordModal] = useState(false);
  const [discordAuth, setDiscordAuth] = useState<DiscordAuth>();
  const user = useSelector((state: any) => state.isLoggedIn.user);

  return (
    <div className="account-links">
      <Modal
        showModal={showDiscordModal}
        closeModal={() => setShowDiscordModal(() => false)}
        body={
          <DiscordModalBody
            discordAuth={discordAuth}
            closeModal={() => setShowDiscordModal(() => false)}
          />
        }
      />
      <AccountButton
        icon={discordIcon}
        name="Discord"
        color="#5865f2"
        onClick={() => {
          let discordLoading = AlertHelper.showLoading("Please Wait...");
          AnnieAPI.getDiscordAuth(user.uid)
            .then((discordAuth) => {
              setDiscordAuth(discordAuth);
              setShowDiscordModal(true);
            })
            .finally(() => {
              discordLoading.close();
            });
        }}
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

function DiscordModalBody({
  closeModal,
  discordAuth,
}: {
  closeModal: () => void;
  discordAuth?: DiscordAuth;
}) {
  return (
    <div className="discord-modal" onClick={(event) => event.stopPropagation()}>
      <div className="discord-message">
        <div>Register by sending this command to Annie.</div>
        <div className="register-command">
          <span className="command">{discordAuth?.message}</span>
          <small
            className="copy-command"
            onClick={() => {
              navigator.clipboard.writeText(discordAuth!.message);
              AlertHelper.successToast("Command Copied to clipboard.");
            }}
          >
            copy command
          </small>
        </div>
        <div />
        <a href={discordAuth?.link} className="discord-link" target="_blank">
          Message Annie
        </a>
      </div>
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
