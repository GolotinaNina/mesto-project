const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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

closePopupElements.forEach((el) => addCloseEvents(el.popup, el.button));

function initElements() {
    for (let i = initialCards.length - 1; i >= 0; i--) {
        addElement(initialCards[i]);
    }
}

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
    elements.prepend(getElement(el.link, el.name));
}

function getElement(link, name) {

    const userElement = userTemplate.querySelector('.element').cloneNode(true);
    const photo = userElement.querySelector('.element__photo');

    photo.setAttribute('src', link);
    photo.setAttribute('alt', name);
    userElement.querySelector('.element__place-name').textContent = name;

    userElement.querySelector('.element__delete').addEventListener('click', function(){
        this.parentElement.remove();
    });

    userElement.querySelector('.element__like-button').addEventListener('click', function(event){
        event.stopPropagation();
        this.classList.toggle('element__like-button_status');
    });

    addOpenEvents(popupExpandPicture, userElement.querySelector('.element__photo'), () => openPopupImage(name, link));

    return userElement;
}

initElements();

function openPopupImage(name,link){

    popupPicture.setAttribute('src', link);
    popupPicture.setAttribute('alt', name);

    pictureDecription.textContent = name;
};

addOpenEvents(popupEditProfile, buttonEditProfile);

formEditProfile.addEventListener('submit', function(event){

    profileName.textContent = popupEditProfileName.value;
    profileAbout.textContent = popupEditProfileAbout.value;
    
    event.preventDefault();
    removeOpenClass(popupEditProfile);
});

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