import "./profile-pic.scss";

import { useEffect, useState } from "react";
import Modal from "../../general/modal/modal";
import EditIcon from "../../general/edit-icon/edit-icon";
import addImageIcon from "../../../assets/icons/add_image.svg";
import AnnieAPI from "../../../helpers/annie-api";
import { useDispatch, useSelector } from "react-redux";
import AlertHelper from "../../../helpers/alert-helper";
import { fireBaseHelper } from "../../../App";
import { Loader } from "../../general/loader/loader";
import { updateImage } from "../../../redux/reducers/login";
import tempPfp from "../../../assets/icons/temp_pfp.svg";

export default function ProfilePic() {
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.isLoggedIn.user);
  const image = useSelector((state: any) => state.isLoggedIn.image);

  const [loadingImage, setLoadingImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [picUpdated, setPicUpdated] = useState(0);

  useEffect(() => {
    if (picUpdated > 0 || image === null) {
      setLoadingImage(true);
      fireBaseHelper
        .getUserImage(user.uid)
        .then((link) => {
          if (link) {
            dispatch(updateImage(link));
          }
        })
        .finally(() => {
          setLoadingImage(false);
        });
    }
  }, [user.uid, picUpdated, dispatch, image]);

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
        body={
          <ModalBody
            closeModal={() => setShowModal(() => false)}
            onUpload={() => setPicUpdated((current) => (current += 1))}
          />
        }
      />
      <EditIcon />
      {loadingImage ? (
        <Loader />
      ) : (
        <img className="profile-pic" src={image ?? tempPfp} alt=" " />
      )}
    </div>
  );
}

function ModalBody({
  closeModal,
  onUpload,
}: {
  closeModal: () => void;
  onUpload: () => void;
}) {
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
                    onUpload();
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
