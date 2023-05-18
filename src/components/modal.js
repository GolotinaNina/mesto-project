import { checkButtonIsValid, isValid } from './validation';
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
const popupNewPlaceName = popupNewPlace.querySelector(
  '.edit-new__input[name="name"]'
);
const popupNewPlaceLink = popupNewPlace.querySelector(
  '.edit-new__input[name="link"]'
);

export const popupExpandPicture = document.querySelector("#popup__expand_picture");
const buttonCloseExpandPicture = popupExpandPicture.querySelector(
  "button.popup__close"
);
export const popupPicture = popupExpandPicture.querySelector(".popup__picture");
const pictureDecription = popupExpandPicture.querySelector(
  ".popup__description"
);

const modalsStack = [];

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

document
  .querySelectorAll(".popup__container")
  .forEach((el) => el.addEventListener("click", (e) => e.stopPropagation()));

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        if(modalsStack.length > 0){
          removeOpenClass(modalsStack.at(-1));
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
  elOpen.addEventListener("click", function (event) {
    event.stopPropagation();
    addOpenClass(popup);
    if (action != null) action();
  });
}

closePopupElements.forEach((el) => {
  addCloseEvents(el.popup, el.button);
  addCloseEvents(el.popup, el.popup);
});

export function addCloseEvents(popup, elClose) {
  elClose.addEventListener("click", function () {
    removeOpenClass(popup);
  });
}

function removeOpenClass(el) {
  el.classList.remove("popup_opened");
  modalsStack.slice(el);
}

function addOpenClass(el) {
  el.classList.add("popup_opened");
  modalsStack.push(el);
}

export function openPopupImage(name, link, elPopupPicture) {
  elPopupPicture.setAttribute("src", link);
  elPopupPicture.setAttribute("alt", name);

  pictureDecription.textContent = name;
}

function updateProfilePopupValues() {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileAbout.value = profileAbout.textContent;
  isValid(formEditProfile, popupEditProfileName);
  isValid(formEditProfile, popupEditProfileAbout);
}

function clearPopupNewPlace() {
  popupNewPlaceName.value = "";
  popupNewPlaceLink.value = "";
  checkButtonIsValid(formNewPlace);
}