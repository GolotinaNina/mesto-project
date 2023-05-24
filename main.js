/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto-project/./src/pages/index.css?");

/***/ }),

/***/ "./src/components/api.js":
/*!*******************************!*\
  !*** ./src/components/api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deleteCard: () => (/* binding */ deleteCard),\n/* harmony export */   deleteLike: () => (/* binding */ deleteLike),\n/* harmony export */   getInitialCards: () => (/* binding */ getInitialCards),\n/* harmony export */   getProfileData: () => (/* binding */ getProfileData),\n/* harmony export */   patchAvatar: () => (/* binding */ patchAvatar),\n/* harmony export */   patchProfileData: () => (/* binding */ patchProfileData),\n/* harmony export */   postCard: () => (/* binding */ postCard),\n/* harmony export */   putLike: () => (/* binding */ putLike)\n/* harmony export */ });\nconst config = {\r\n  baseUrl: \"https://nomoreparties.co/v1/plus-cohort-24\",\r\n  headers: {\r\n    authorization: \"68fdd3a9-a749-43e0-ad66-26fdd6a6cb73\",\r\n    \"Content-Type\": \"application/json\",\r\n  },\r\n};\r\n\r\nconst getProfileData = () => \r\n  fetch(`${config.baseUrl}/users/me`, {\r\n    headers: config.headers,\r\n  }).then(getPromiseResult);\r\n\r\nconst patchProfileData = (name, about) => \r\n  fetch(`${config.baseUrl}/users/me`, {\r\n    method: \"PATCH\",\r\n    headers: config.headers,\r\n    body: JSON.stringify({\r\n      name: name,\r\n      about: about,\r\n    }),\r\n  }).then(getPromiseResult);\r\n\r\nconst patchAvatar = (avLink) => \r\n  fetch(`${config.baseUrl}/users/me/avatar`, {\r\n    method: \"PATCH\",\r\n    headers: config.headers,\r\n    body: JSON.stringify({\r\n      avatar: avLink,\r\n    }),\r\n  }).then(getPromiseResult);\r\n\r\nconst postCard = (name, link) => \r\n  fetch(`${config.baseUrl}/cards`, {\r\n    method: \"POST\",\r\n    headers: config.headers,\r\n    body: JSON.stringify({\r\n      name: name,\r\n      link: link,\r\n    }),\r\n  }).then(getPromiseResult);\r\n\r\nconst deleteCard = (id) => \r\n  fetch(`${config.baseUrl}/cards/${id}`, {\r\n    method: \"DELETE\",\r\n    headers: config.headers,\r\n  }).then(getPromiseResult);\r\n\r\nconst putLike = (id) => \r\n  fetch(`${config.baseUrl}/cards/likes/${id}`, {\r\n    method: \"PUT\",\r\n    headers: config.headers,\r\n  })\r\n    .then(getPromiseResult);\r\n\r\nconst deleteLike = (id) => \r\n  fetch(`${config.baseUrl}/cards/likes/${id}`, {\r\n    method: \"DELETE\",\r\n    headers: config.headers,\r\n  }).then(getPromiseResult);\r\n\r\nconst getInitialCards = () => \r\n  fetch(`${config.baseUrl}/cards`, {\r\n    headers: config.headers,\r\n  }).then(getPromiseResult);\r\n\r\nfunction getPromiseResult(res) {\r\n  if (res.ok) {\r\n    return res.json();\r\n  }\r\n  return Promise.reject(`Ошибка: ${res.status}`);\r\n}\n\n//# sourceURL=webpack://mesto-project/./src/components/api.js?");

/***/ }),

/***/ "./src/components/card.js":
/*!********************************!*\
  !*** ./src/components/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCard: () => (/* binding */ createCard),\n/* harmony export */   setCount: () => (/* binding */ setCount)\n/* harmony export */ });\nconst cardTemplate = document.querySelector(\"#elTemplate\").content;\r\n\r\nfunction createCard(el, cbOnOpenPopupImage, isMyElement, cbDeleteCard, cbLike, isLiked) {\r\n  const card = cardTemplate.querySelector(\".element\").cloneNode(true);\r\n  const delButton = card.querySelector(\".element__delete\");\r\n  const photo = card.querySelector(\".element__photo\");\r\n  const likeButton = card.querySelector(\".element__like-button\");\r\n  const counter = card.querySelector(\".counter\");\r\n\r\n  card.id = el._id;\r\n\r\n  if (!isMyElement(el)) delButton.remove();\r\n  else delButton.addEventListener(\"click\", () => cbDeleteCard(el, card));\r\n\r\n  photo.setAttribute(\"src\", el.link);\r\n  photo.setAttribute(\"alt\", el.name);\r\n  card.querySelector(\".element__place-name\").textContent = el.name;\r\n\r\n  if (isLiked(el))\r\n    likeButton.classList.toggle(\"element__like-button_status\");\r\n\r\n  setCount(counter, el.likes.length);\r\n\r\n  likeButton.addEventListener(\"click\", function (event) {\r\n    event.stopPropagation();\r\n    cbLike(el, counter, this)\r\n  });\r\n\r\n  photo.addEventListener(\"click\", function (event) {\r\n    event.stopPropagation();\r\n    cbOnOpenPopupImage(el);\r\n  });\r\n\r\n  return card;\r\n}\r\n\r\nfunction setCount(counter, count) {\r\n  if (count > 0) counter.textContent = count;\r\n  else counter.textContent = \"\";\r\n}\n\n//# sourceURL=webpack://mesto-project/./src/components/card.js?");

/***/ }),

/***/ "./src/components/modal.js":
/*!*********************************!*\
  !*** ./src/components/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCloseEvents: () => (/* binding */ addCloseEvents),\n/* harmony export */   addOpenEvents: () => (/* binding */ addOpenEvents),\n/* harmony export */   closePopup: () => (/* binding */ closePopup),\n/* harmony export */   closePopupByEsc: () => (/* binding */ closePopupByEsc),\n/* harmony export */   openPopup: () => (/* binding */ openPopup)\n/* harmony export */ });\nconst closePopupByEsc = (evt) => {\r\n    if (evt.key === \"Escape\") {\r\n      const openedPopup  = document.querySelector('.popup_opened');\r\n      closePopup(openedPopup);\r\n    }\r\n};\r\n\r\nfunction addOpenEvents(popup, elOpen, callback) {\r\n  elOpen.addEventListener(\"click\", function (event) {\r\n    event.stopPropagation();\r\n    openPopup(popup);\r\n    if (callback != null) callback();\r\n  });\r\n};\r\n\r\nfunction addCloseEvents(popup, elClose) {\r\n  elClose.addEventListener(\"click\", function () {\r\n    closePopup(popup);\r\n  });\r\n};\r\n\r\nfunction closePopup(el) {\r\n  el.classList.remove(\"popup_opened\");\r\n  document.removeEventListener('keydown',closePopupByEsc);\r\n};\r\n\r\nfunction openPopup(el) {\r\n  document.addEventListener('keydown',closePopupByEsc);\r\n  el.classList.add(\"popup_opened\");\r\n};\n\n//# sourceURL=webpack://mesto-project/./src/components/modal.js?");

/***/ }),

/***/ "./src/components/validation.js":
/*!**************************************!*\
  !*** ./src/components/validation.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkButtonIsValid: () => (/* binding */ checkButtonIsValid),\n/* harmony export */   enableValidation: () => (/* binding */ enableValidation),\n/* harmony export */   isValid: () => (/* binding */ isValid)\n/* harmony export */ });\nconst showInputError = (formElement, inputElement, errorMessage, config) => {\r\n  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);\r\n  inputElement.classList.add(config.inputErrorClass);\r\n  errorElement.textContent = errorMessage;\r\n  errorElement.classList.add(config.errorClass);\r\n};\r\n\r\nconst hideInputError = (formElement, inputElement, config) => {\r\n  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);\r\n  inputElement.classList.remove(config.inputErrorClass);\r\n  errorElement.classList.remove(config.errorClass);\r\n  errorElement.textContent = \"\";\r\n};\r\n\r\nconst isValid = (formElement, inputElement, config) => {\r\n  if (inputElement.validity.patternMismatch) {\r\n    inputElement.setCustomValidity(inputElement.dataset.errorMessage);\r\n  } else {\r\n    inputElement.setCustomValidity(\"\");\r\n  }\r\n\r\n  if (!inputElement.validity.valid) {\r\n    showInputError(formElement, inputElement, inputElement.validationMessage, config);\r\n  } else {\r\n    hideInputError(formElement, inputElement, config);\r\n  }\r\n};\r\n\r\nconst toggleButtonState = (inputList, buttonElement, config) => {\r\n  if (hasInvalidInput(inputList)) {\r\n    buttonElement.disabled = true;\r\n    buttonElement.classList.add(config.inactiveButtonClass);\r\n  } else {\r\n    buttonElement.disabled = false;\r\n    buttonElement.classList.remove(config.inactiveButtonClass);\r\n  }\r\n};\r\n\r\nconst hasInvalidInput = (inputList) => {\r\n  return inputList.some((inputElement) => {\r\n    return !inputElement.validity.valid;\r\n  });\r\n};\r\n\r\nconst setEventListeners = (formElement, config) => {\r\n  const inputList = Array.from(\r\n    formElement.querySelectorAll(config.inputSelector)\r\n  );\r\n  const buttonElement = formElement.querySelector(config.submitButtonSelector);\r\n\r\n  inputList.forEach((inputElement) => {\r\n    inputElement.addEventListener(\"input\", () => {\r\n      isValid(formElement, inputElement, config);\r\n      toggleButtonState(inputList, buttonElement, config);\r\n    });\r\n  });\r\n};\r\n\r\nconst checkButtonIsValid = (formElement, config) => {\r\n  const inputList = Array.from(formElement.querySelectorAll(`input`));\r\n  const buttonElement = formElement.querySelector('button[type=\"submit\"]');\r\n\r\n  toggleButtonState(inputList, buttonElement, config);\r\n};\r\n\r\nconst enableValidation = (config) => {\r\n  const formList = Array.from(document.querySelectorAll(config.formSelector));\r\n  formList.forEach((formElement) => {\r\n    setEventListeners(formElement, config);\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://mesto-project/./src/components/validation.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _components_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/validation.js */ \"./src/components/validation.js\");\n/* harmony import */ var _components_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/api.js */ \"./src/components/api.js\");\n/* harmony import */ var _components_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/card */ \"./src/components/card.js\");\n/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/modal */ \"./src/components/modal.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst profile = document.querySelector(\".profile\");\r\nconst profileName = profile.querySelector(\".profile__name\");\r\nconst profileAbout = profile.querySelector(\".profile__about\");\r\nconst profileAvatar = profile.querySelector('.profile__avatar');\r\nconst popupEditAvatar = document.querySelector('#popup__edit_avatar');\r\nconst formPopupEditAvatar = popupEditAvatar.querySelector('.edit-avatar');\r\nconst popupEditAvatarLink = popupEditAvatar.querySelector('#edit-avatar__url');\r\nconst buttonCloseAvatar = popupEditAvatar.querySelector(\"button.popup__close\");\r\nconst buttonEditAvatarSubmit = popupEditAvatar.querySelector('.edit-avatar__submit');\r\nconst profileVecktor = profile.querySelector('.profile__vektor');\r\n\r\nconst popupEditProfile = document.querySelector(\"#popup__edit_profile\");\r\nconst buttonEditProfile = document.querySelector(\"#profile__edit\");\r\nconst buttonCloseEditProfile = popupEditProfile.querySelector(\"button.popup__close\");\r\nconst formEditProfile = popupEditProfile.querySelector(\".edit-form\");\r\nconst popupEditProfileName = popupEditProfile.querySelector('.edit-form__input[name=\"name\"]');\r\nconst popupEditProfileAbout = popupEditProfile.querySelector('.edit-form__input[name=\"about\"]');\r\nconst buttonEditProfileSubmit = popupEditProfile.querySelector('.edit-form__submit');\r\n\r\nconst popupNewPlace = document.querySelector(\"#popup__new_place\");\r\nconst buttonNewPlace = document.querySelector(\"#element__add\");\r\nconst buttonCloseNewPlace = popupNewPlace.querySelector(\"button.popup__close\");\r\nconst formNewPlace = popupNewPlace.querySelector(\".edit-new\");\r\nconst popupNewPlaceName = popupNewPlace.querySelector('.edit-new__input[name=\"name\"]');\r\nconst popupNewPlaceLink = popupNewPlace.querySelector('.edit-new__input[name=\"link\"]');\r\nconst buttonNewPlaceSubmit = popupNewPlace.querySelector('.edit-new__submit');\r\n\r\n\r\nconst popupExpandPicture = document.querySelector(\"#popup__expand_picture\");\r\nconst buttonCloseExpandPicture = popupExpandPicture.querySelector(\"button.popup__close\");\r\nconst popupPicture = popupExpandPicture.querySelector(\".popup__picture\");\r\nconst pictureDecription = popupExpandPicture.querySelector(\".popup__description\");\r\n\r\nlet personalData = {};\r\n\r\nconst validationConfig = {\r\n  formSelector: \"form\",\r\n  inputSelector: \"input\",\r\n  submitButtonSelector: 'button[type=\"submit\"]',\r\n  inactiveButtonClass: \"form__submit_inactive\",\r\n  inputErrorClass: \"form__input_type_error\",\r\n  errorClass: \"form__input-error_active\"\r\n};\r\n\r\n(0,_components_validation_js__WEBPACK_IMPORTED_MODULE_1__.enableValidation)(validationConfig);\r\n\r\nconst closePopupElements = [\r\n  {\r\n    popup: popupExpandPicture,\r\n    button: buttonCloseExpandPicture,\r\n  },\r\n  {\r\n    popup: popupEditProfile,\r\n    button: buttonCloseEditProfile,\r\n  },\r\n  {\r\n    popup: popupNewPlace,\r\n    button: buttonCloseNewPlace,\r\n  },\r\n  {\r\n    popup: popupEditAvatar,\r\n    button: buttonCloseAvatar,\r\n  },\r\n];\r\n\r\nclosePopupElements.forEach((el) => {\r\n  (0,_components_modal__WEBPACK_IMPORTED_MODULE_4__.addCloseEvents)(el.popup, el.button);\r\n  (0,_components_modal__WEBPACK_IMPORTED_MODULE_4__.addCloseEvents)(el.popup, el.popup);\r\n});\r\n\r\nconst cbUpdatePopupEditProfile = () => {\r\n  popupEditProfileName.value = profileName.textContent;\r\n  popupEditProfileAbout.value = profileAbout.textContent;\r\n}\r\n\r\nconst cbUpdatePopupNewPlace = () => {\r\n  popupNewPlaceName.value = \"\";\r\n  popupNewPlaceLink.value = \"\";\r\n}\r\n\r\nconst updateDescription = (name) => {\r\n  pictureDecription.textContent = name;\r\n}\r\n\r\nconst cbUpdatePopupEditAvatar = () => {\r\n  popupEditAvatarLink.value = profileAvatar.getAttribute('src');\r\n}\r\n\r\nconst checkFormIsValid = (form) => {\r\n  Array.from(form.querySelectorAll('input')).forEach((input) => {\r\n    ;(0,_components_validation_js__WEBPACK_IMPORTED_MODULE_1__.isValid)(form, input, validationConfig);  \r\n  })\r\n  ;(0,_components_validation_js__WEBPACK_IMPORTED_MODULE_1__.checkButtonIsValid)(form, validationConfig);\r\n}\r\n\r\nconst setProfileData = (name, about) => {\r\n  profileName.textContent = name;\r\n  profileAbout.textContent = about;\r\n};\r\n\r\nprofileAvatar.addEventListener('mouseover',function() {\r\n  profileVecktor.classList.add('show');\r\n});\r\n\r\nprofileAvatar.addEventListener('mouseout',function() {\r\n  profileVecktor.classList.remove('show');\r\n});\r\n\r\nconst cbCheckButtonIsValid = () => (0,_components_validation_js__WEBPACK_IMPORTED_MODULE_1__.checkButtonIsValid)(formNewPlace, validationConfig)\r\n\r\n;(0,_components_modal__WEBPACK_IMPORTED_MODULE_4__.addOpenEvents)(popupEditAvatar, profileAvatar, () => updatePopupValues(cbUpdatePopupEditAvatar, () => checkFormIsValid(formPopupEditAvatar)));\r\n(0,_components_modal__WEBPACK_IMPORTED_MODULE_4__.addOpenEvents)(popupEditProfile, buttonEditProfile, () => updatePopupValues(cbUpdatePopupEditProfile, () => checkFormIsValid(formEditProfile)));\r\n(0,_components_modal__WEBPACK_IMPORTED_MODULE_4__.addOpenEvents)(popupNewPlace, buttonNewPlace, () => updatePopupValues(cbUpdatePopupNewPlace, cbCheckButtonIsValid ));\r\n\r\nconst updateAvLink = (avLink) =>{\r\n  if (avLink != null)\r\n    profileAvatar.setAttribute('src', avLink);\r\n}\r\n\r\nfunction addCardToContainer(el) {\r\n  elements.prepend((0,_components_card__WEBPACK_IMPORTED_MODULE_3__.createCard)(el, cbOnOpenPopupImage, isMyElement, cbDeleteCard, cbLike, isLiked));\r\n}\r\n\r\nconst elements = document.querySelector(\".elements\");\r\n\r\nconst cbOnOpenPopupImage = (el) => {\r\n  (0,_components_modal__WEBPACK_IMPORTED_MODULE_4__.openPopup)(popupExpandPicture);\r\n  onOpenPopupImage(el.name, el.link, popupPicture, updateDescription);\r\n}\r\n\r\nconst isMyElement = (el) => el.owner._id == personalData._id\r\n\r\nconst cbDeleteCard = (el, card) => {\r\n  ;(0,_components_api_js__WEBPACK_IMPORTED_MODULE_2__.deleteCard)(el._id)\r\n  .then(() => {\r\n    card.remove();\r\n  })\r\n  .catch((err) => {\r\n    console.log(err); \r\n  });\r\n};\r\n\r\nconst cbLike = (el, counter, likeButton) => {\r\n  if (likeButton.classList.contains(\"element__like-button_status\"))\r\n    unlike(el._id, counter, likeButton, _components_card__WEBPACK_IMPORTED_MODULE_3__.setCount);\r\n  else \r\n    like(el._id, counter, likeButton, _components_card__WEBPACK_IMPORTED_MODULE_3__.setCount);\r\n}\r\nconst unlike = (id, counter, likeButton, setCount) => {\r\n  ;(0,_components_api_js__WEBPACK_IMPORTED_MODULE_2__.deleteLike)(id)\r\n  .then((res) => {\r\n    setCount(counter, res.likes.length);\r\n    likeButton.classList.toggle(\"element__like-button_status\");\r\n  })\r\n  .catch((err) => {\r\n    console.log(err); \r\n  });\r\n}\r\n\r\nconst like = (id, counter, likeButton, setCount) => {\r\n  ;(0,_components_api_js__WEBPACK_IMPORTED_MODULE_2__.putLike)(id)\r\n  .then((res) => {\r\n    setCount(counter, res.likes.length);\r\n    likeButton.classList.toggle(\"element__like-button_status\");\r\n  })\r\n  .catch((err) => {\r\n    console.log(err); \r\n  });\r\n}\r\n\r\nconst isLiked = (el) => el.likes.map((x) => x._id).includes(personalData._id);\r\n\r\nfunction onOpenPopupImage(name, link, elPopupPicture) {\r\n  elPopupPicture.setAttribute(\"src\", link);\r\n  elPopupPicture.setAttribute(\"alt\", name);\r\n\r\n  updateDescription(name);\r\n};\r\n\r\nfunction updatePopupValues(cbUpdateValues,checkFormIsValid) {\r\n  cbUpdateValues();\r\n  checkFormIsValid();\r\n};\r\n\r\nconst saveProfileData = () =>{\r\n  (0,_components_api_js__WEBPACK_IMPORTED_MODULE_2__.patchProfileData)(popupEditProfileName.value, popupEditProfileAbout.value)\r\n  .then((res) => {\r\n    personalData = res;\r\n    setProfileData(res.name, res.about);\r\n  })\r\n  .catch((err) => {\r\n    console.log(err); \r\n  });\r\n}\r\n\r\nconst saveAvatar = () => {\r\n  ;(0,_components_api_js__WEBPACK_IMPORTED_MODULE_2__.patchAvatar)(popupEditAvatarLink.value)\r\n  .then(() => {\r\n    updateAvLink(popupEditAvatarLink.value);\r\n  })\r\n  .catch((err) => {\r\n    console.log(err); \r\n  });\r\n}\r\n\r\nconst addCard = () => {\r\n  ;(0,_components_api_js__WEBPACK_IMPORTED_MODULE_2__.postCard)(popupNewPlaceName.value, popupNewPlaceLink.value)\r\n  .then((el) => {\r\n    addCardToContainer(el);\r\n  })\r\n  .catch((err) => {\r\n    console.log(err); \r\n  });\r\n}\r\n\r\nconst forms = [\r\n  {\r\n    form: formEditProfile,\r\n    popup: popupEditProfile,\r\n    button: buttonEditProfileSubmit,\r\n    submitAction: saveProfileData\r\n  },\r\n  {\r\n    form: formNewPlace,\r\n    popup: popupNewPlace,\r\n    button: buttonNewPlaceSubmit,\r\n    submitAction: addCard\r\n  },\r\n  {\r\n    form: formPopupEditAvatar,\r\n    popup: popupEditAvatar,\r\n    button: buttonEditAvatarSubmit,\r\n    submitAction: saveAvatar \r\n  }\r\n]\r\n\r\nforms.forEach((el) => {\r\n  el.form.addEventListener(\"submit\", function (event) {\r\n    let buttonText = el.button.textContent;\r\n    try{\r\n      el.button.textContent = \"Сохранение...\";\r\n      el.submitAction();\r\n      event.preventDefault();\r\n      (0,_components_modal__WEBPACK_IMPORTED_MODULE_4__.closePopup)(el.popup);\r\n    } catch(err) {\r\n      console.log(err);\r\n    } finally{\r\n      el.button.textContent = buttonText;\r\n    }\r\n  });\r\n})\r\n\r\ndocument\r\n  .querySelectorAll(\".popup__container\")\r\n  .forEach((el) => el.addEventListener(\"click\", (e) => e.stopPropagation()));\r\n\r\n(0,_components_api_js__WEBPACK_IMPORTED_MODULE_2__.getProfileData)()\r\n  .then((res) => {\r\n    personalData = res;\r\n    setProfileData(res.name, res.about);\r\n    updateAvLink(res.avatar);\r\n  })\r\n  .then(_components_api_js__WEBPACK_IMPORTED_MODULE_2__.getInitialCards)\r\n  .then((result) => {\r\n    result.reverse().forEach((el) => addCardToContainer(el));\r\n  })\r\n  .catch((err) => {\r\n    console.log(err); // выводим ошибку в консоль\r\n  });\n\n//# sourceURL=webpack://mesto-project/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;