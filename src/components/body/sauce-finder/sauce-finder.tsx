import "./sauce-finder.scss";

import addImageIcon from "../../../assets/icons/add_image.svg";
import linkIcon from "../../../assets/icons/link.svg";

import { useEffect, useState } from "react";
import EditIcon from "../../general/edit-icon/edit-icon";
import AnnieAPI from "../../../helpers/annie-api";
import Sauce from "../../../types/sauce";
import AlertHelper from "../../../helpers/alert-helper";

export default function SauceFinder() {
  const [image, setImage] = useState<any>(addImageIcon);
  const [link, setLink] = useState<any>("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [rawImage, setRawImage] = useState<any>();
  const [sauces, setSauces] = useState<Array<Sauce>>();
  const [showLessRelevant, setShowLessRelevant] = useState(false);

  useEffect(() => {
    setIsDisabled(() => !(link.length > 0 || rawImage !== undefined));
  }, [link, rawImage]);

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
            <img
              className={`preview-image ${
                rawImage === undefined ? "preview-image-placeholder" : ""
              }`}
              src={image}
              alt="upload"
            />
            <EditIcon />
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
                setRawImage(() => event!.target!.files![0]!);
                setLink("");
                (
                  document.getElementById("link-input") as HTMLInputElement
                ).value = "";
                reader.readAsDataURL(event.target.files[0]);
              }
            }}
          />
        </div>
        <div className="or">or</div>
        <span className="hint-text">Paste image URL:</span>
        <input
          id="link-input"
          className="url-input"
          type="text"
          placeholder="https://site/image.png"
          onChange={(event) => {
            setImage(() => addImageIcon);
            setRawImage(() => undefined);
            setLink(() => event.target.value);
          }}
        />
        <div
          className={`search-button ${isDisabled ? "disabled-button" : ""}`}
          onClick={async () => {
            if (link.length !== 0 || rawImage !== undefined) {
              AlertHelper.showLoading("Fetching...");
              let _sauces: Array<Sauce> = [];
              let formData = new FormData();

              if (link.length > 0) {
                formData.append("imageLink", link);

                _sauces = await AnnieAPI.getSauceFromLink(formData);
              } else {
                formData.append("image", rawImage, "upload.png");

                _sauces = await AnnieAPI.getSauceFromImage(formData);
              }
              setSauces(() => _sauces);
            }
          }}
        >
          Search
        </div>
      </div>

      <div className="results-container">
        {sauces != null && sauces!.length > 0 ? (
          <>
            <div className="less-relevant">
              <div className="title">Results </div>
              <small>Less relevant results have been hidden.</small>
              <div
                className="unhide-button"
                onClick={() => {
                  setShowLessRelevant((current) => !current);
                }}
              >
                {showLessRelevant ? "hide" : "show"}
              </div>
            </div>
          </>
        ) : (
          <span></span>
        )}

        <div className="sauces-container">
          {sauces?.length !== 0 ? (
            sauces?.map((sauce, index) => {
              if (
                Number.parseFloat(sauce.similarity) > 60 ||
                showLessRelevant
              ) {
                return (
                  <SauceCard sauce={sauce} key={`${sauce.sauce} ${index}`} />
                );
              } else {
                return <span key={`${sauce.sauce} ${index}`}></span>;
              }
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

function SauceCard({ sauce }: { sauce: Sauce }) {
  return (
    <div className="sauce-card">
      <div className="title">
        <span className="key">Sauce:</span> {sauce.sauce}
      </div>
      <img className="thumbnail" src={sauce.thumbnail} alt="thumbnail" />
      <div className="accuracy">
        <span className="key">Accuracy:</span>
        {sauce.similarity}%
      </div>
      <a
        className={`view-button ${
          sauce.extUrls.length === 0 ? "disabled-button" : ""
        }`}
        href={sauce.extUrls[0]}
        target="_blank"
        rel="noreferrer"
      >
        <div>View details</div>
        <img className="link-icon" src={linkIcon} alt="navigate" />
      </a>
    </div>
  );
}
