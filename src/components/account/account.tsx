import { authenticationHelper } from "../../App";
import AlertHelper from "../../helpers/alert-helper";
import Helpers from "../../helpers/helpers";
import AccountLinks from "../header/account-links/account-links";
import Bio from "../header/bio/bio";
import KanjiKana from "../header/kanji-kana/kanji-kana";
import ProfilePic from "../header/profile-pic/profile-pic";

import logoutIcon from "../../assets/icons/logout.svg";
import "./account.scss";

function Account() {
  return (
    <div id="account">
      <div className="container">
        <div className="header-container">
          <ProfilePic />
          <Bio />
          <KanjiKana />
          <AccountLinks />
          <div
            className="logout"
            onClick={async () => {
              AlertHelper.confirmDialog({
                question: "Are you sure you want to Logout?",
                onConfirm: () => {
                  authenticationHelper
                    .signOut()
                    .then((res) => {
                      AlertHelper.successToast("Logged out successfully");
                    })
                    .catch((e) => {
                      AlertHelper.errorToast(Helpers.getFirebaseError(e));
                    });
                },
              });
            }}
          >
            <img src={logoutIcon} alt="logout" className="logout-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
