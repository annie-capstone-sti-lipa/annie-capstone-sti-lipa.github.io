import { authenticationHelper } from "../../App";
import AlertHelper from "../../helpers/alert-helper";
import Helpers from "../../helpers/helpers";
import AccountLinks from "../header/account-links/account-links";
import Bio from "../header/bio/bio";
import KanjiKana from "../header/kanji-kana/kanji-kana";
import ProfilePic from "../header/profile-pic/profile-pic";

import logoutIcon from "../../assets/icons/logout.svg";
import "./account.scss";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/login";
import { setAnimes } from "../../redux/reducers/anime-recommendations";
import { select } from "../../redux/reducers/tabnav-item-reducer";
import tabnavItem from "../../types/enums/tabnavItem";

function Account() {
  const dispatch = useDispatch();

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
              }).then((confirmed) => {
                if (confirmed) {
                  authenticationHelper
                    .signOut()
                    .then((res) => {
                      dispatch(login({ isLoggedIn: false, user: null }));
                      dispatch(setAnimes([]));
                      dispatch(select(tabnavItem.recommendations));
                      AlertHelper.successToast("Logged out successfully");
                    })
                    .catch((e) => {
                      AlertHelper.errorToast(Helpers.getFirebaseError(e));
                    });
                }
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
