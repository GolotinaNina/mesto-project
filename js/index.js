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

function initElements() {
    for (let i = initialCards.length - 1; i >= 0; i--) {
        addElement(initialCards[i]);
    }
}

function addOpenEvents(popup, elOpen, action){
    elOpen.addEventListener('click', function (event) {
        event.stopPropagation();
        popup.classList.add('popup_opened');
        action();
    }); 
};

function addCloseEvents(popup, elClose){
    elClose.addEventListener('click',function(){
        popup.classList.remove('popup_opened');
    });
};

addCloseEvents(popupExpandPicture, buttonCloseExpandPicture);

function addElement(el){
    elements.prepend(getElement(el.link, el.name));
}

function getElement(link, name) {

    const userElement = userTemplate.querySelector('.element').cloneNode(true);

    let photo = userElement.querySelector('.element__photo');

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
addCloseEvents(popupEditProfile, buttonCloseEditProfile);

formEditProfile.addEventListener('submit', function(event){

    profileName.textContent = popupEditProfileName.value;
    profileAbout.textContent = popupEditProfileAbout.value;
    
    event.preventDefault();
    popupEditProfile.classList.remove('popup_opened');
});

addOpenEvents(popupNewPlace, buttonNewPlace,() => clearPopupNewPlace());
addCloseEvents(popupNewPlace, buttonCloseNewPlace);

formNewPlace.addEventListener('submit', function(event){
    event.preventDefault();
    addElement({name: popupNewPlaceName.value, link: popupNewPlaceLink.value});
    popupNewPlace.classList.remove('popup_opened');
});

function clearPopupNewPlace(){
    popupNewPlaceName.value = "";
    popupNewPlaceLink.value = "";
}