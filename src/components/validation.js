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

export const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

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
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
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
