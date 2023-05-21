import { checkButtonIsValid, isValid } from './validation';
//я не поняла, что вы тут от меня хотите! На мой взгляд, тут все по solid, dry, kiss (in: бритва окамы)
import { postCard, patchProfileData, profileName, profileAbout } from './data';

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

export const popupExpandPicture = document.querySelector("#popup__expand_picture");
const buttonCloseExpandPicture = popupExpandPicture.querySelector("button.popup__close");
export const popupPicture = popupExpandPicture.querySelector(".popup__picture");
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

const closePopupByEsc = (evt) => {
  evt = evt || window.event;
    let isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
      evt.stopPropagation();
      let el = Array.from(document.querySelectorAll('.popup')).find(pp => pp.classList.contains('popup_opened'));
      if (el != null){
        document.removeEventListener('keydown',(event) => closePopupByEsc(event));
        removeOpenClass(el);
      }
    }
};

addOpenEvents(popupEditProfile, buttonEditProfile, updateProfilePopupValues);
addOpenEvents(popupNewPlace, buttonNewPlace, clearPopupNewPlace);

formEditProfile.addEventListener("submit", function (event) {
  patchProfileData(popupEditProfileName.value, popupEditProfileAbout.value);
  event.preventDefault();
  removeOpenClass(popupEditProfile);
});

formNewPlace.addEventListener("submit", function (event) {
  event.preventDefault();
  postCard(popupNewPlaceName.value, popupNewPlaceLink.value);
  removeOpenClass(popupNewPlace);
});

export function addOpenEvents(popup, elOpen, action) {
  document.addEventListener('keydown',(event) => closePopupByEsc(event));
  elOpen.addEventListener("click", function (event) {
    event.stopPropagation();
    addOpenClass(popup);
    if (action != null) action();
  });
};

closePopupElements.forEach((el) => {
  addCloseEvents(el.popup, el.button);
  addCloseEvents(el.popup, el.popup);
});

export function addCloseEvents(popup, elClose) {
  elClose.addEventListener("click", function () {
    removeOpenClass(popup);
  });
};

function removeOpenClass(el) {
  el.classList.remove("popup_opened");
};

export function addOpenClass(el) {
  el.classList.add("popup_opened");
};

export function onOpenPopupImage(name, link, elPopupPicture) {
  elPopupPicture.setAttribute("src", link);
  elPopupPicture.setAttribute("alt", name);

  pictureDecription.textContent = name;
};

function updateProfilePopupValues() {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileAbout.value = profileAbout.textContent;
  isValid(formEditProfile, popupEditProfileName);
  isValid(formEditProfile, popupEditProfileAbout);
  checkButtonIsValid(formEditProfile);
};

function clearPopupNewPlace() {
  popupNewPlaceName.value = "";
  popupNewPlaceLink.value = "";
  checkButtonIsValid(formNewPlace);
};