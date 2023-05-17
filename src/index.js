import './../pages/index.css';

import {
  enableValidation,
  checkButtonIsValid,
  isValid,
} from "./components/validation.js";

import {
  getProfileData,
  patchProfileData,
  setCount,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
  getInitialCards,
  personalData,
} from "./components/data.js";

const userTemplate = document.querySelector("#elTemplate").content;
const elements = document.querySelector(".elements");

const popupEditProfile = document.querySelector("#popup__edit_profile");
const buttonEditProfile = document.querySelector("#profile__edit");
const buttonCloseEditProfile = popupEditProfile.querySelector("button.popup__close");
const formEditProfile = popupEditProfile.querySelector(".edit-form");
const popupEditProfileName = popupEditProfile.querySelector('.edit-form__input[name="name"]');
const popupEditProfileAbout = popupEditProfile.querySelector('.edit-form__input[name="about"]');

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAbout = profile.querySelector(".profile__about");

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

getProfileData()
  .then(getInitialCards)
  .then((result) => {
    result.forEach((el) => addElement(el));
    setProfileData(personalData.name, personalData.about);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

closePopupElements.forEach((el) => {
  addCloseEvents(el.popup, el.button);
  addCloseEvents(el.popup, el.popup);
});

document.querySelectorAll(".popup__container").forEach((el) => el.addEventListener("click", (e) => e.stopPropagation()));

function addOpenEvents(popup, elOpen, action) {
  elOpen.addEventListener("click", function (event) {
    event.stopPropagation();
    addOpenClass(popup);
    if (action != null) action();
  });
}

function addCloseEvents(popup, elClose) {
  elClose.addEventListener("click", function () {
    removeOpenClass(popup);
  });
}

function removeOpenClass(el) {
  el.classList.remove("popup_opened");
}

function addOpenClass(el) {
  el.classList.add("popup_opened");
}

export function addElement(el) {
  elements.prepend(getElement(el));
}

function openPopupImage(name, link, elPopupPicture) {
  elPopupPicture.setAttribute("src", link);
  elPopupPicture.setAttribute("alt", name);

  pictureDecription.textContent = name;
}

function getElement(el) {
  const userElement = userTemplate.querySelector(".element").cloneNode(true);
  const delButton = userElement.querySelector(".element__delete");
  const photo = userElement.querySelector(".element__photo");
  const likeButton = userElement.querySelector(".element__like-button");
  const counter = userElement.querySelector(".counter");

  userElement.id = el._id;

  if (el.owner._id != personalData._id) delButton.remove();
  else
    delButton.addEventListener("click", () => deleteCard(el._id, userElement));

  photo.setAttribute("src", el.link);
  photo.setAttribute("alt", el.name);
  userElement.querySelector(".element__place-name").textContent = el.name;

  if (el.likes.map((x) => x._id).includes(personalData._id))
    likeButton.classList.toggle("element__like-button_status");

  setCount(counter, el.likes.length);

  likeButton.addEventListener("click", function (event) {
    event.stopPropagation();

    if (this.classList.contains("element__like-button_status"))
      deleteLike(el._id, counter, this);
    else putLike(el._id, counter, this);
  });

  addOpenEvents(popupExpandPicture, photo, () =>
    openPopupImage(el.name, el.link, popupPicture)
  );

  return userElement;
}



addOpenEvents(popupEditProfile, buttonEditProfile, updateProfilePopupValues);

function updateProfilePopupValues() {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileAbout.value = profileAbout.textContent;
  isValid(formEditProfile, popupEditProfileName);
  isValid(formEditProfile, popupEditProfileAbout);
}

formEditProfile.addEventListener("submit", function (event) {
  patchProfileData(popupEditProfileName.value, popupEditProfileAbout.value);
  setProfileData(personalData.name, personalData.about);
  event.preventDefault();
  removeOpenClass(popupEditProfile);
});

addOpenEvents(popupNewPlace, buttonNewPlace, clearPopupNewPlace);

const setProfileData = (name, about) => {
  profileName.textContent = name;
  profileAbout.textContent = about;
};

formNewPlace.addEventListener("submit", function (event) {
  event.preventDefault();
  postCard(popupNewPlaceName.value, popupNewPlaceLink.value);
  removeOpenClass(popupNewPlace);
});

function clearPopupNewPlace() {
  popupNewPlaceName.value = "";
  popupNewPlaceLink.value = "";
  checkButtonIsValid(formNewPlace);
}

enableValidation({
  formSelector: "form",
  inputSelector: "input",
  submitButtonSelector: 'button[type="submit"]',
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});
