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
    .then(res => {
        if (res.ok) {
             return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    })
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
    .then(res =>{
        personalData = res;
        setProfileData(res.name, res.about);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    });
} 

getProfileData()
.then(getInitialCards)
.then((result) => {
    result.forEach(el => addElement(el));
})
.catch((err) => {
    console.log(err); // выводим ошибку в консоль
}); 

const userTemplate = document.querySelector('#elTemplate').content;
const userButtonTemplate = document.querySelector('#elButtonTemplate').content;
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
    elements.prepend(getElement(el.link, el.name, el._id));
}

function getElement(link, name, id) {

    const userElement = userTemplate.querySelector('.element').cloneNode(true);
    const delButton = userButtonTemplate.querySelector('.element__delete').cloneNode(true);
    const photo = userElement.querySelector('.element__photo');
    const likeButton = userElement.querySelector('.element__like-button');

    if(id == personalData._id){
        userElement.addElement(delButton);
        userElement.querySelector('.element__delete').addEventListener('click', function(){
            this.parentElement.remove();
        });
    }

    photo.setAttribute('src', link);
    photo.setAttribute('alt', name);
    userElement.querySelector('.element__place-name').textContent = name;

    likeButton.addEventListener('click', function(event){
        event.stopPropagation();
        this.classList.toggle('element__like-button_status');
    });

    addOpenEvents(popupExpandPicture, userElement.querySelector('.element__photo'), () => openPopupImage(name, link));

    return userElement;
}

function openPopupImage(name,link){

    popupPicture.setAttribute('src', link);
    popupPicture.setAttribute('alt', name);

    pictureDecription.textContent = name;
};

addOpenEvents(popupEditProfile, buttonEditProfile);

formEditProfile.addEventListener('submit', function(event){

    patchProfileData(popupEditProfileName.value, popupEditProfileAbout.value)
    
    event.preventDefault();
    removeOpenClass(popupEditProfile);
});

const setProfileData = (name, about) =>{
    profileName.textContent = name;
    profileAbout.textContent = about;
}

addOpenEvents(popupNewPlace, buttonNewPlace,() => clearPopupNewPlace());

formNewPlace.addEventListener('submit', function(event){
    event.preventDefault();
    addElement({name: popupNewPlaceName.value, link: popupNewPlaceLink.value});
    removeOpenClass(popupNewPlace);
});

function clearPopupNewPlace(){
    popupNewPlaceName.value = "";
    popupNewPlaceLink.value = "";
}