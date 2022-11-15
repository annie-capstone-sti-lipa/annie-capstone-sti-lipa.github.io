import { useCallback, useEffect, useState } from "react";
import Modal from "../../general/modal/modal";
import "./bio.scss";

import EditIcon from "../../general/edit-icon/edit-icon";
import AnnieAPI from "../../../helpers/annie-api";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../../redux/reducers/login";
import { Loader } from "../../general/loader/loader";
import UserInfo from "../../../types/user-info";
import AlertHelper from "../../../helpers/alert-helper";

export default function Bio() {
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.isLoggedIn.user);
  const userInfo = useSelector((state: any) => state.isLoggedIn.userInfo);

  const [showModal, setShowModal] = useState(false);
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);
  const [infoUpdated, setInfoUpdated] = useState(0);

  const [userInfoIsNull, setUserInfoIsNull] = useState(false);

  const updateInfo = useCallback(() => {
    if (infoUpdated > 0 || userInfoIsNull) {
      setLoadingUserInfo(true);
      AnnieAPI.getUserInfo(user.uid)
        .then((userInfo) => {
          if (userInfo) {
            dispatch(updateUserInfo(userInfo));
          } else {
            let defaultName = user.email.substring(0, user.email.indexOf("@"));
            dispatch(
              updateUserInfo(new UserInfo(defaultName, "Bio", user.uid))
            );
          }
        })
        .finally(() => setLoadingUserInfo(false));
    }
  }, [dispatch, infoUpdated, user.email, user.uid, userInfoIsNull]);

  useEffect(() => {
    updateInfo();
  }, [updateInfo, infoUpdated]);

  useEffect(() => {
    if (infoUpdated === 0) {
      setUserInfoIsNull(userInfo === null);
    }
  }, [userInfo, infoUpdated]);

  return loadingUserInfo ? (
    <Loader />
  ) : (
    <div className="name-and-bio" onClick={() => setShowModal(() => true)}>
      <EditIcon />
      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(() => false)}
        body={
          <ModalBody
            closeModal={() => setShowModal(() => false)}
            onUpdate={() => setInfoUpdated((current) => (current += 1))}
            name={userInfo?.name ?? ""}
            bio={userInfo?.bio ?? ""}
          />
        }
      />
      <div className="name">{userInfo?.name ?? "name"}</div>
      <div className="bio">{userInfo?.bio ?? "bio"}</div>
    </div>
  );
}

function ModalBody({
  closeModal,
  onUpdate,
  name,
  bio,
}: {
  closeModal: () => void;
  onUpdate: () => void;
  name: string;
  bio: string;
}) {
  const user = useSelector((state: any) => state.isLoggedIn.user);

  const [nameInput, setNameInput] = useState("");
  const [bioInput, setBioInput] = useState("");

  const copyInfo = useCallback(() => {
    setNameInput(name);
    setBioInput(bio);
  }, [bio, name]);

  useEffect(() => {
    copyInfo();
  }, [copyInfo]);

  return (
    <div className="bio-modal" onClick={(event) => event.stopPropagation()}>
      <div className="input-container">
        <div>Name:</div>
        <input
          type="text"
          className="name-input"
          placeholder="Input your name."
          defaultValue={nameInput}
          onChange={(event) => {
            setNameInput(() => event.target.value);
          }}
        />
        <div>Bio:</div>
        <textarea
          className="bio-input"
          placeholder="Input your bio."
          maxLength={300}
          defaultValue={bioInput}
          onChange={(event) => {
            setBioInput(() => event.target.value);
          }}
        />
      </div>
      <div className="button-container">
        <div
          className="save-button"
          onClick={() => {
            let updating = AlertHelper.showLoading("Updating User Info");
            closeModal();
            AnnieAPI.saveUserInfo({
              name: nameInput,
              bio: bioInput,
              userId: user.uid,
            })
              .then(() => onUpdate())
              .finally(() => {
                updating.close();
              });
          }}
        >
          Save Changes
        </div>
      </div>
    </div>
  );
}
