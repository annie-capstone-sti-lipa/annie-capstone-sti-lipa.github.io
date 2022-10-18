import "./profile-pic.scss";

import tempPfp from "../../../assets/temp/profile.png";
import { useState } from "react";
import Modal from "../../general/modal/modal";
import EditIcon from "../../general/edit-icon/edit-icon";
import addImageIcon from "../../../assets/icons/add_image.svg";
import Helpers from "../../../helpers/helpers";
import AnnieAPI from "../../../helpers/annie-api";
import { useSelector } from "react-redux";
import { fireBaseHelper } from "../../../App";
import AlertHelper from "../../../helpers/alert-helper";

export default function ProfilePic() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="profile-pic-container"
      onClick={() => {
        setShowModal(() => true);
      }}
    >
      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(() => false)}
        body={<ModalBody closeModal={() => setShowModal(() => false)} />}
      />
      <EditIcon />
      <img className="profile-pic" src={tempPfp} alt="profile pic" />
    </div>
  );
}

function ModalBody({ closeModal }: { closeModal: () => void }) {
  const [image, setImage] = useState<any>(addImageIcon);
  const [rawImage, setRawImage] = useState<any>();
  const user = useSelector((state: any) => state.isLoggedIn.user);

  return (
    <div className="image-modal" onClick={(event) => event.stopPropagation()}>
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
            reader.readAsDataURL(event.target.files[0]);
          }
        }}
      />
      <div className="buttons">
        <div
          className={`save-button ${
            rawImage === undefined ? "disabled-button" : ""
          }`}
          onClick={() => {
            if (rawImage !== undefined) {
              let uploading = AlertHelper.showLoading("Uploading image");

              AnnieAPI.uploadProfilePic(user.uid, rawImage)
                .then((success) => {
                  if (success) {
                    AlertHelper.successToast("Image updated");
                  }
                })
                .finally(() => {
                  uploading.close();
                });
              closeModal();
            }
          }}
        >
          Save
        </div>
      </div>
    </div>
  );
}
