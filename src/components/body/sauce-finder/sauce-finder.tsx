import "./sauce-finder.scss";

import addImageIcon from "../../../assets/icons/add_image.svg";
import linkIcon from "../../../assets/icons/link.svg";

import { useEffect, useState } from "react";
import sauce from "../../../types/sauce";
import EditIcon from "../../edit-icon/edit-icon";

export default function SauceFinder() {
  const [image, setImage] = useState<any>(addImageIcon);
  const [sauce, setSauce] = useState<sauce | null>();

  useEffect(() => {
    setSauce({
      title: "Sakurasou",
      thumbnail:
        "https://static.wikia.nocookie.net/sakurasounopetnakanojo/images/c/c2/Ep05_01.jpg",
      accuracy: 88,
      source: "https://anilist.co/anime/13759/Sakurasou-no-Pet-na-Kanojo",
    });
  }, []);

  return (
    <div className="sauce-finder-container">
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

      {sauce && <SauceCard sauce={sauce} />}
    </div>
  );
}

function SauceCard({ sauce }: { sauce: sauce }) {
  return (
    <div className="sauce-card">
      <div className="found">Sauce Found!</div>
      <div className="title">
        <span className="key">Title:</span> {sauce.title}
      </div>
      <img className="thumbnail" src={sauce.thumbnail} alt="thumbnail" />
      <div className="accuracy">
        <span className="key">Accuracy:</span>
        {sauce.accuracy.toPrecision(3)}%
      </div>
      <a
        className="view-button"
        href={sauce.source}
        target="_blank"
        rel="noreferrer"
      >
        <div>View details</div>
        <img className="link-icon" src={linkIcon} alt="navigate" />
      </a>
    </div>
  );
}
