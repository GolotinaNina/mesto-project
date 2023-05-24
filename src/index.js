import "./pages/index.css";
import {enableValidation,isValid,checkButtonIsValid} from "./components/validation.js";
import {getProfileData, getInitialCards, patchProfileData , deleteLike, putLike, postCard, deleteCard, patchAvatar} from "./components/api.js";
import {createCard, setCount} from "./components/card";
import {addCloseEvents,openPopup,addOpenEvents, closePopup} from "./components/modal";

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

let personalData = {};

const validationConfig = {
  formSelector: "form",
  inputSelector: "input",
  submitButtonSelector: 'button[type="submit"]',
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  // custValNames: ["edit-new__name","edit_profile__name-input"]
};

enableValidation(validationConfig);

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

const updateDescription = (name) => {
  pictureDecription.textContent = name;
}

const cbUpdatePopupEditAvatar = () => {
  popupEditAvatarLink.value = profileAvatar.getAttribute('src');
}

const checkFormIsValid = (form) => {
  Array.from(form.querySelectorAll('input')).forEach((input) => {
    isValid(form, input, validationConfig);  
  })
  checkButtonIsValid(form, validationConfig);
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

const cbCheckButtonIsValid = () => checkButtonIsValid(formNewPlace, validationConfig)

addOpenEvents(popupEditAvatar, profileAvatar, () => updatePopupValues(cbUpdatePopupEditAvatar, () => checkFormIsValid(formPopupEditAvatar)));
addOpenEvents(popupEditProfile, buttonEditProfile, () => updatePopupValues(cbUpdatePopupEditProfile, () => checkFormIsValid(formEditProfile)));
addOpenEvents(popupNewPlace, buttonNewPlace, () => updatePopupValues(cbUpdatePopupNewPlace, cbCheckButtonIsValid ));

const updateAvLink = (avLink) =>{
  if (avLink != null)
    profileAvatar.setAttribute('src', avLink);
}

function addCardToContainer(el) {
  elements.prepend(createCard(el, cbOnOpenPopupImage, isMyElement, cbDeleteCard, cbLike, isLiked));
}

const elements = document.querySelector(".elements");

const cbOnOpenPopupImage = (el) => {
  openPopup(popupExpandPicture);
  onOpenPopupImage(el.name, el.link, popupPicture, updateDescription);
}

const isMyElement = (el) => el.owner._id == personalData._id

const cbDeleteCard = (el, card) => {
  deleteCard(el._id)
  .then(() => {
    card.remove();
  })
  .catch((err) => {
    console.log(err); 
  });
};

const cbLike = (el, counter, likeButton) => {
  if (likeButton.classList.contains("element__like-button_status"))
  unlike(el._id, counter, likeButton, setCount);
  else 
    like(el._id, counter, likeButton, setCount);
}
const unlike = (id, counter, likeButton, setCount) => {
  deleteLike(id)
  .then((res) => {
    setCount(counter, res.likes.length);
    likeButton.classList.toggle("element__like-button_status");
  })
  .catch((err) => {
    console.log(err); 
  });
}

const like = (id, counter, likeButton, setCount) => {
  putLike(id)
  .then((res) => {
    setCount(counter, res.likes.length);
    likeButton.classList.toggle("element__like-button_status");
  })
  .catch((err) => {
    console.log(err); 
  });
}

const isLiked = (el) => el.likes.map((x) => x._id).includes(personalData._id);

function onOpenPopupImage(name, link, elPopupPicture) {
  elPopupPicture.setAttribute("src", link);
  elPopupPicture.setAttribute("alt", name);

  updateDescription(name);
};

function updatePopupValues(cbUpdateValues,checkFormIsValid) {
  cbUpdateValues();
  checkFormIsValid();
};

const saveProfileData = () =>{
  patchProfileData(popupEditProfileName.value, popupEditProfileAbout.value)
  .then((res) => {
    personalData = res;
    setProfileData(res.name, res.about);
  })
  .catch((err) => {
    console.log(err); 
  });
}

const saveAvatar = () => {
  patchAvatar(popupEditAvatarLink.value)
  .then(() => {
    updateAvLink(popupEditAvatarLink.value);
  })
  .catch((err) => {
    console.log(err); 
  });
}

const addCard = () => {
  postCard(popupNewPlaceName.value, popupNewPlaceLink.value)
  .then((el) => {
    addCardToContainer(el);
  })
  .catch((err) => {
    console.log(err); 
  });
}

const forms = [
  {
    form: formEditProfile,
    popup: popupEditProfile,
    button: buttonCloseEditProfile,
    submitAction: saveProfileData
  },
  {
    form: formNewPlace,
    popup: popupNewPlace,
    button: buttonNewPlace,
    submitAction: addCard
  },
  {
    form: formPopupEditAvatar,
    popup: popupEditAvatar,
    button: buttonEditAvatar,
    submitAction: saveAvatar 
  }
]

forms.forEach((el) => {
  el.form.addEventListener("submit", function (event) {
    let buttonText = el.button.textContent;
    try{
      el.button.textContent = "Сохранение...";
      el.submitAction();
      event.preventDefault();
      closePopup(el.popup);
    } finally{
      el.button.textContent = buttonText;
    }
  });
})

document
  .querySelectorAll(".popup__container")
  .forEach((el) => el.addEventListener("click", (e) => e.stopPropagation()));

getProfileData()
  .then((res) => {
    personalData = res;
    setProfileData(res.name, res.about);
    updateAvLink(res.avatar);
  })
  .then(getInitialCards)
  .then((result) => {
    result.reverse().forEach((el) => addCardToContainer(el));
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });