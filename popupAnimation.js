//кнопки попапа
const popupBackground = document.querySelector('.popup-background');

const showBtn = document.querySelector('.show-popup');
showBtn.addEventListener('click',()=>{
  popup.classList.remove('visually-hidden', 'hidden');
  showBtn.classList.add('hidden');
  popupBackground.classList.remove('popup-background-hidden');
  setTimeout(()=>{showBtn.classList.add('visually-hidden')},300);
});

const hideBtn = document.querySelector('.hide-popup');
hideBtn.addEventListener('click',()=>{
  popup.classList.add('hidden');
  setTimeout(()=>{popup.classList.add('visually-hidden')},300);
  showBtn.classList.remove('visually-hidden','hidden');
  popupBackground.classList.add('popup-background-hidden');
});