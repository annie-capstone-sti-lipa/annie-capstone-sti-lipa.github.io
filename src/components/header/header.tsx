import "./header.scss";

import Tabnav from "./tabnav/tabnav";

export default function Header() {
  return (
    <div id="header">
      <div className="top-line"></div>
      <Tabnav />
    </div>
  );
}
