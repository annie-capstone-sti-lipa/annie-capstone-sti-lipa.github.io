import AccountLinks from "../header/account-links/account-links";
import Bio from "../header/bio/bio";
import KanjiKana from "../header/kanji-kana/kanji-kana";
import ProfilePic from "../header/profile-pic/profile-pic";

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
        </div>
      </div>
    </div>
  );
}

export default Account;
