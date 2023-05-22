import "./pages/index.css";
import {enableValidation,isValid,checkButtonIsValid} from "./components/validation.js";
import {getProfileData, getInitialCards, patchProfileData, personalData, deleteLike, putLike, postCard, deleteCard, patchAvatar} from "./components/api.js";
import {getElement, setCount} from "./components/card";
import {addCloseEvents,addOpenClass,addOpenEvents,updatePopupValues, onOpenPopupImage, removeOpenClass} from "./components/modal";

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAbout = profile.querySelector(".profile__about");
const profileAvatar = profile.querySelector('.profile__avatar');
const popupEditAvatar = document.querySelector('#popup__edit_avatar');
const formPopupEditAvatar = popupEditAvatar.querySelector('.edit-avatar');
const popupEditAvatarLink = popupEditAvatar.querySelector('#edit-avatar__url');
const buttonCloseAvatar = popupEditAvatar.querySelector("button.popup__close");
const buttonEditAvatar = popupEditAvatar.querySelector('.edit-avatar__submit');
const profileVecktor = profile.querySelector('.profile__vektor');

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
  {
    popup: popupEditAvatar,
    button: buttonCloseAvatar,
  },
];

closePopupElements.forEach((el) => {
  addCloseEvents(el.popup, el.button);
  addCloseEvents(el.popup, el.popup);
});

const cbUpdatePopupEditProfile = () => {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileAbout.value = profileAbout.textContent;
}

const cbUpdatePopupNewPlace = () => {
  popupNewPlaceName.value = "";
  popupNewPlaceLink.value = "";
}

const cbUpdateDescription = (name) => {
  pictureDecription.textContent = name;
}

const cbUpdatePopupEditAvatar = () => {
  popupEditAvatarLink.value = profileAvatar.getAttribute('src');
}

const cbCheckFormIsValid = (form) => {
  Array.from(form.querySelectorAll('input')).forEach((input) => {
    isValid(form, input);  
  })
  checkButtonIsValid(form);
}

const setProfileData = (name, about) => {
  profileName.textContent = name;
  profileAbout.textContent = about;
};

profileAvatar.addEventListener('mouseover',function() {
  profileVecktor.classList.add('show');
});

profileAvatar.addEventListener('mouseout',function() {
  profileVecktor.classList.remove('show');
});

const cbCheckButtonIsValid = () => checkButtonIsValid(formNewPlace)

addOpenEvents(popupEditAvatar, profileAvatar, () => updatePopupValues(cbUpdatePopupEditAvatar, () => cbCheckFormIsValid(formPopupEditAvatar)));
addOpenEvents(popupEditProfile, buttonEditProfile, () => updatePopupValues(cbUpdatePopupEditProfile, () => cbCheckFormIsValid(formEditProfile)));
addOpenEvents(popupNewPlace, buttonNewPlace, () => updatePopupValues(cbUpdatePopupNewPlace, cbCheckButtonIsValid ));

const cbUpdateAvLink = (avLink) =>{
  if (avLink != null)
    profileAvatar.setAttribute('src', avLink);
}

function addElement(el) {
  elements.prepend(getElement(el, cbOnOpenPopupImage, isMyElement, cbDeleteCard, cbLike, isLiked));
}

const elements = document.querySelector(".elements");

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

const forms = [
  {
    form: formEditProfile,
    popup: popupEditProfile,
    button: buttonCloseEditProfile,
    submitAction: () => patchProfileData(popupEditProfileName.value, popupEditProfileAbout.value, setProfileData)
  },
  {
    form: formNewPlace,
    popup: popupNewPlace,
    button: buttonNewPlace,
    submitAction: () => postCard(popupNewPlaceName.value, popupNewPlaceLink.value, addElement)
  },
  {
    form: formPopupEditAvatar,
    popup: popupEditAvatar,
    button: buttonEditAvatar,
    submitAction: () => patchAvatar(popupEditAvatarLink.value, cbUpdateAvLink)
  }
]

forms.forEach((el) => {
  el.form.addEventListener("submit", function (event) {
    let buttonText = el.button.textContent;
    try{
      el.button.textContent = "Сохранение...";
      el.submitAction();
      event.preventDefault();
      removeOpenClass(el.popup);
    } finally{
      el.button.textContent = buttonText;
    }
  });
})

document
  .querySelectorAll(".popup__container")
  .forEach((el) => el.addEventListener("click", (e) => e.stopPropagation()));

getProfileData(setProfileData, cbUpdateAvLink)
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
