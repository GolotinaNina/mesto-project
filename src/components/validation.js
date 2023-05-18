let params = {};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = "";
};

export const isValid = (formElement, inputElement, el) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement,inputElement,inputElement.validationMessage);
  } else if(typeof el !== "undefined" && customValid(el.data)){
    showInputError(formElement,inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

const customValid = (elChar) =>{
  return elChar != null && !(/^([a-zA-ZА-Яа-я0-9]){1,1}$/.test(elChar) || [45,32].includes(elChar.charCodeAt(0)));
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(params.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(params.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(params.inputSelector)
  );
  const buttonElement = formElement.querySelector(params.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (el) => {
      isValid(formElement, inputElement, el);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const checkButtonIsValid = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(`input`));
  const buttonElement = formElement.querySelector('button[type="submit"]');

  toggleButtonState(inputList, buttonElement);
};

export const enableValidation = (p) => {
  params = p;
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
