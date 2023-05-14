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

 
  
  enableValidation({
    formSelector: 'form',
    inputSelector: 'input',
    submitButtonSelector: 'button[type="submit"]',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  });