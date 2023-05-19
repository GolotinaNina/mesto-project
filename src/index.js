import "./../pages/index.css";
import {enableValidation} from "./components/validation.js";

import {
  getProfileData,
  getInitialCards,
} from "./components/data.js";

import {
  addElement,
} from "./components/card";

getProfileData()
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
