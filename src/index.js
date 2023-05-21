import "./pages/index.css";
import {enableValidation,isValid,checkButtonIsValid} from "./components/validation.js";
import {getProfileData,getInitialCards,patchProfileData,personalData, deleteLike, putLike, postCard, deleteCard} from "./components/api.js";
import {getElement, setCount} from "./components/card";
import {addCloseEvents,addOpenClass,addOpenEvents,updateProfilePopupValues,clearPopupNewPlace, onOpenPopupImage, removeOpenClass} from "./components/modal";

const avatar = new URL('./images/avatar.jpg', import.meta.url);
const profile__avatar = document.querySelector('.profile__avatar');
profile__avatar.setAttribute('src',avatar);

const popupEditProfile = document.querySelector("#popup__edit_profile");
const buttonEditProfile = document.querySelector("#profile__edit");
const buttonCloseEditProfile = popupEditProfile.querySelector("button.popup__close");
const formEditProfile = popupEditProfile.querySelector(".edit-form");
const popupEditProfileName = popupEditProfile.querySelector('.edit-form__input[name="name"]');
const popupEditProfileAbout = popupEditProfile.querySelector('.edit-form__input[name="about"]');

const popupNewPlace = document.querySelector("#popup__new_place");
const buttonNewPlace = document.querySelector("#element__add");
const buttonCloseNewPlace = popupNewPlace.querySelector("button.popup__close");
const formNewPlace = popupNewPlace.querySelector(".edit-new");
const popupNewPlaceName = popupNewPlace.querySelector('.edit-new__input[name="name"]');
const popupNewPlaceLink = popupNewPlace.querySelector('.edit-new__input[name="link"]');

const popupExpandPicture = document.querySelector("#popup__expand_picture");
const buttonCloseExpandPicture = popupExpandPicture.querySelector("button.popup__close");
const popupPicture = popupExpandPicture.querySelector(".popup__picture");
const pictureDecription = popupExpandPicture.querySelector(".popup__description");

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAbout = profile.querySelector(".profile__about");

const closePopupElements = [
  {
    popup: popupExpandPicture,
    button: buttonCloseExpandPicture,
  },
  {
    popup: popupEditProfile,
    button: buttonCloseEditProfile,
  },
  {
    popup: popupNewPlace,
    button: buttonCloseNewPlace,
  },
];

const elements = document.querySelector(".elements");

function addElement(el) {
  elements.prepend(getElement(el, cbOnOpenPopupImage, isMyElement, cbDeleteCard, cbLike, isLiked));
}

const cbUpdateProfileValues = () => {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileAbout.value = profileAbout.textContent;
}

const cbCheckFormIsValid = () => {
  isValid(formEditProfile, popupEditProfileName);
  isValid(formEditProfile, popupEditProfileAbout);
  checkButtonIsValid(formEditProfile);
}

const cbUpdateDescription = (name) => {
  pictureDecription.textContent = name;
}

const setProfileData = (name, about) => {
  profileName.textContent = name;
  profileAbout.textContent = about;
};

const cbOnOpenPopupImage = (el) => {
  addOpenClass(popupExpandPicture);
  onOpenPopupImage(el.name, el.link, popupPicture, cbUpdateDescription);
}

const isMyElement = (el) => el.owner._id == personalData._id

const cbDeleteCard = (el, userElement) => deleteCard(el._id, userElement);

const isLiked = (el) => el.likes.map((x) => x._id).includes(personalData._id);

const cbLike = (el, counter, likeButton) => {
  if (likeButton.classList.contains("element__like-button_status"))
    deleteLike(el._id, counter, likeButton, setCount);
  else 
    putLike(el._id, counter, likeButton, setCount);
}

const cbUpdatePopupNewPlace = () => {
  popupNewPlaceName.value = "";
  popupNewPlaceLink.value = "";
}

const cbCheckButtonIsValid = () => checkButtonIsValid(formNewPlace)

addOpenEvents(popupEditProfile, buttonEditProfile, () => updateProfilePopupValues(cbUpdateProfileValues,cbCheckFormIsValid));
addOpenEvents(popupNewPlace, buttonNewPlace, () => clearPopupNewPlace(cbUpdatePopupNewPlace, cbCheckButtonIsValid ));

closePopupElements.forEach((el) => {
  addCloseEvents(el.popup, el.button);
  addCloseEvents(el.popup, el.popup);
});

formEditProfile.addEventListener("submit", function (event) {
  patchProfileData(popupEditProfileName.value, popupEditProfileAbout.value, setProfileData);
  event.preventDefault();
  removeOpenClass(popupEditProfile);
});

formNewPlace.addEventListener("submit", function (event) {
  event.preventDefault();
  postCard(popupNewPlaceName.value, popupNewPlaceLink.value, addElement);
  removeOpenClass(popupNewPlace);
});

document
  .querySelectorAll(".popup__container")
  .forEach((el) => el.addEventListener("click", (e) => e.stopPropagation()));

getProfileData(setProfileData)
  .then(getInitialCards)
  .then((result) => {
    result.forEach((el) => addElement(el));
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

enableValidation({
  formSelector: "form",
  inputSelector: "input",
  submitButtonSelector: 'button[type="submit"]',
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  custValNames: ["edit-new__name","edit_profile__name-input"]
});
