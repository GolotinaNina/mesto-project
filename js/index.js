const userTemplate = document.querySelector('#elTemplate').content;
const elements = document.querySelector('.elements');

const popupEditProfile = document.querySelector('#popup__edit_profile');
const buttonEditProfile = document.querySelector('#profile__edit');
const buttonCloseEditProfile = popupEditProfile.querySelector('button.popup__close');
const formEditProfile = popupEditProfile.querySelector('.edit-form');
const popupEditProfileName = popupEditProfile.querySelector('.edit-form__input[name="name"]');
const popupEditProfileAbout = popupEditProfile.querySelector('.edit-form__input[name="about"]');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

const popupNewPlace = document.querySelector('#popup__new_place');
const buttonNewPlace = document.querySelector('#element__add');
const buttonCloseNewPlace = popupNewPlace.querySelector('button.popup__close');
const formNewPlace = popupNewPlace.querySelector('.edit-new');
const popupNewPlaceName = popupNewPlace.querySelector('.edit-new__input[name="name"]');
const popupNewPlaceLink = popupNewPlace.querySelector('.edit-new__input[name="link"]');

const popupExpandPicture = document.querySelector('#popup__expand_picture');
const buttonCloseExpandPicture = popupExpandPicture.querySelector('button.popup__close');
const popupPicture = popupExpandPicture.querySelector('.popup__picture');
const pictureDecription = popupExpandPicture.querySelector('.popup__description');

const closePopupElements = [
    {
        popup: popupExpandPicture,
        button: buttonCloseExpandPicture
    },
    {
        popup: popupEditProfile,
        button: buttonCloseEditProfile
    },
    {
        popup: popupNewPlace,
        button: buttonCloseNewPlace
    }
];

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
    headers: {
      authorization: '01a3fc80-66ed-437d-82ce-f240976e36ea',
      'Content-Type': 'application/json'
    }
  }

let personalData = {};

const getProfileData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(getPromiseResult)
    .then(res => {
        personalData = res;
        setProfileData(res.name, res.about);
    });
} 

const patchProfileData = (name, about) =>{
    fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
    })
    .then(getPromiseResult)
    .then(res => {
        personalData = res;
        setProfileData(res.name, res.about);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

const postCard = (name, link) => {
    fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
    })
    .then(getPromiseResult)
    .then(el => {
        addElement(el);
    });
}

const deleteCard = (id, card) =>{
    fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(getPromiseResult)
    .then(() => {
        card.remove();
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    });
}

const putLike = (id, counter, likeButton) =>{
    fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(getPromiseResult)
    .then((res) => {
        setCount(counter, res.likes.length);
        likeButton.classList.toggle('element__like-button_status');
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    });
}

const deleteLike = (id, counter, likeButton) =>{
    fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(getPromiseResult)
    .then((res) => {
            setCount(counter, res.likes.length);
            likeButton.classList.toggle('element__like-button_status');
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    });
}

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(getPromiseResult);
} 

function getPromiseResult(res){
    if (res.ok) {
          return res.json();
        }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}

getProfileData()
.then(getInitialCards)
.then((result) => {
    result.forEach(el => addElement(el));
})
.catch((err) => {
    console.log(err); // выводим ошибку в консоль
}); 

closePopupElements.forEach((el) => {
    addCloseEvents(el.popup, el.button);
    addCloseEvents(el.popup, el.popup);
});

document.querySelectorAll('.popup__container').forEach((el) => el.addEventListener('click',(e) => e.stopPropagation()));

function addOpenEvents(popup, elOpen, action){
    elOpen.addEventListener('click', function (event) {
        event.stopPropagation();
        addOpenClass(popup);
        if(action != null)
            action();
    }); 
};

function addCloseEvents(popup, elClose){
    elClose.addEventListener('click',function(){
        removeOpenClass(popup);
    });
};

function removeOpenClass(el){
    el.classList.remove('popup_opened');
}

function addOpenClass(el){
    el.classList.add('popup_opened');
}

function addElement(el){
    elements.prepend(getElement(el));
}

function getElement(el) {

    const userElement = userTemplate.querySelector('.element').cloneNode(true);
    const delButton = userElement.querySelector('.element__delete');
    const photo = userElement.querySelector('.element__photo');
    const likeButton = userElement.querySelector('.element__like-button');
    const counter = userElement.querySelector('.counter');

    userElement.id = el._id;

    if(el.owner._id != personalData._id)
        delButton.remove();
    else
        delButton.addEventListener('click', () => deleteCard(el._id, userElement));

    photo.setAttribute('src', el.link);
    photo.setAttribute('alt', el.name);
    userElement.querySelector('.element__place-name').textContent = el.name;

    if(el.likes.map(x => x._id).includes(personalData._id))
        likeButton.classList.toggle('element__like-button_status');

    setCount(counter, el.likes.length);

    likeButton.addEventListener('click', function(event){
        
        event.stopPropagation();
        
        if(this.classList.contains('element__like-button_status'))
            deleteLike(el._id, counter, this);
        else
            putLike(el._id, counter, this);
    });

    addOpenEvents(popupExpandPicture, photo, () => openPopupImage(el.name, el.link));

    return userElement;
}

function setCount(counter, count){
    if(count > 0)
        counter.textContent = count;
    else
        counter.textContent = "";
}

function openPopupImage(name,link){

    popupPicture.setAttribute('src', link);
    popupPicture.setAttribute('alt', name);

    pictureDecription.textContent = name;
};

addOpenEvents(popupEditProfile, buttonEditProfile, updateProfilePopupValues);

function updateProfilePopupValues() {
    popupEditProfileName.value = profileName.textContent;
    popupEditProfileAbout.value = profileAbout.textContent;
    isValid(formEditProfile, popupEditProfileName);
    isValid(formEditProfile, popupEditProfileAbout);
}

formEditProfile.addEventListener('submit', function(event){

    patchProfileData(popupEditProfileName.value, popupEditProfileAbout.value)
    
    event.preventDefault();
    removeOpenClass(popupEditProfile);
});

const setProfileData = (name, about) =>{
    profileName.textContent = name;
    profileAbout.textContent = about;
}

addOpenEvents(popupNewPlace, buttonNewPlace, clearPopupNewPlace);

formNewPlace.addEventListener('submit', function(event){
    event.preventDefault();
    postCard(popupNewPlaceName.value, popupNewPlaceLink.value);
    removeOpenClass(popupNewPlace);
});

function clearPopupNewPlace(){
    popupNewPlaceName.value = "";
    popupNewPlaceLink.value = "";
    checkButtonIsValid(formNewPlace);
}

// Валидация

const showInputError = (formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  }; 
  
  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement);
    }
  }; 

  const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
          buttonElement.disabled = true;
      buttonElement.classList.add('form__submit_inactive');
    } else {
          // иначе сделай кнопку активной
          buttonElement.disabled = false;
      buttonElement.classList.remove('form__submit_inactive');
    }
  };

  const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  };

    const setEventListeners = (formElement) => {
        // Найдём все поля формы и сделаем из них массив
        const inputList = Array.from(formElement.querySelectorAll(`input`));
            // Найдём в текущей форме кнопку отправки
        const buttonElement = formElement.querySelector('button[type="submit"]');

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);

                    // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement);
            });
        });
    }; 

    const checkButtonIsValid = (formElement) => {
        // Найдём все поля формы и сделаем из них массив
        const inputList = Array.from(formElement.querySelectorAll(`input`));
            // Найдём в текущей форме кнопку отправки
        const buttonElement = formElement.querySelector('button[type="submit"]');

        toggleButtonState(inputList, buttonElement);
    }; 

  const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('form'));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  };
  
  // Вызовем функцию
  enableValidation(); 

// -------------------

// const addButton = document.querySelector('.edit-form__submit');
// const songsContainer = document.querySelector('.edit-form__input');

// console.log(document.forms.form0);
// const form = document.forms.form0; // получаем форму
// // вешаем на неё обработчик события submit
// form.addEventListener('submit', function (evt) {
//     // отменим стандартное поведение
//     evt.preventDefault();
// });

// const form0 = document.forms.form0;
// const name = form.elements.name;
// const about = form.elements.about;

// function addSong(nametValue, aboutValue) {
//     const songTemplate = document.querySelector('#song-template').content;
//     const songElement = songTemplate.cloneNode(true);
// songsContainer.append(songElement);
// }

// form.addEventListener('submit', function (evt) {
//     evt.preventDefault();
//     addSong(name.value, about.value);
//    setSubmitButtonState(false);
// });

// songsContainer.addEventListener('input', function (evt) {
//     // Выведем в консоль значение свойства validity.valid поля ввода, 
//     // на котором слушаем событие input
//     console.log(evt.target.validity.valid);
//   }); 

// function setSubmitButtonState(isFormValid) {
//     if (isFormValid) {
//         addButton.removeAttribute('disabled');
//         addButton.classList.remove('input__btn_disabled');
//       } else {
//        addButton.setAttribute('disabled', true);
//       addButton.classList.add('input__btn_disabled'); 
//       } 
//   }

//   form.addEventListener('input', function (evt) {
//     const isValid = name.value.length > 0 && about.value.length > 0;
//   setSubmitButtonState(isValid);
// }); 



// const gloButton = document.querySelector('.edit-new__submit');
// const gloseContainer = document.querySelector('.edit-new__input');

// console.log(document.forms.form2);
// const forms = document.forms.form2; // получаем форму
// // вешаем на неё обработчик события submit
// forms.addEventListener('submit', function (evt) {
//     // отменим стандартное поведение
//     evt.preventDefault();
// });

// const form2 = document.forms.form2;
// const name1 = form.elements.name1;
// const link = form.elements.link;

// function addSong(nametValue, linkValue) {
//     const sonTemplate = document.querySelector('#son-template').content;
//     const sonElement = sonTemplate.cloneNode(true);
//     gloseContainer.append(sonElement);
// }

// forms.addEventListener('submit', function (evt) {
//     evt.preventDefault();
//     addSong(name.value, link.value);
//    setSubmitButtonState(false);
// });

// gloseContainer.addEventListener('input', function (evt) {
//     // Выведем в консоль значение свойства validity.valid поля ввода, 
//     // на котором слушаем событие input
//     console.log(evt.target.validity.valid);
//   }); 

// function setSubmitButtonState(isFormsValid) {
//     if (isFormsValid) {
//         gloButton.removeAttribute('disabled');
//         gloButton.classList.remove('input__btn_disabled');
//       } else {
//         gloButton.setAttribute('disabled', true);
//         gloButton.classList.add('input__btn_disabled'); 
//       } 
//   }

//   form.addEventListener('input', function (evt) {
//     const isValid = name.value.length > 0 && link.value.length > 0;
//   setSubmitButtonState(isValid);
// }); 
