import "./sauce-finder.scss";

import addImageIcon from "../../../assets/icons/add_image.svg";
import { useState } from "react";
import EditIcon from "../../edit-icon/edit-icon";

export default function SauceFinder() {
  const [image, setImage] = useState<any>(addImageIcon);

  return (
    <div className="sauce-finder">
      <div className="hint-text">Select Image:</div>
      <div className="image-input">
        <div
          className="preview-image-container"
          onClick={() => {
            document.getElementById("image-input")?.click();
          }}
        >
          <EditIcon />
          <img className="preview-image" src={image} alt="upload" />
        </div>
        <input
          id="image-input"
          type="file"
          accept="image/*"
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              let reader = new FileReader();
              reader.onload = (e) => {
                setImage(() => e.target?.result);
              };
              reader.readAsDataURL(event.target.files[0]);
            }
          }}
        />
      </div>
      <div className="or">or</div>
      <div>
        <span className="hint-text">Paste image URL:</span>
        <input type="text" />
      </div>
      <div className="search-button">Search</div>
    </div>
  );
}
