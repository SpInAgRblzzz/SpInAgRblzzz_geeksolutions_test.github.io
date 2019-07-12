//получение элементов документа
const popup = document.querySelector('.popup');
const form = document.querySelector('.popup-form');
const table = document.querySelector('.userlist-content');
const userlist = JSON.parse(localStorage.getItem('userlist')) || [];

const errorAreas = Array.from(document.querySelectorAll('.error'));
const inputs = Array.from(document.querySelectorAll('fieldset input'));
console.log(inputs)

//заполнение таблицы при запуске
fillTable(userlist, table);

//функция заполнения ошибок
function fillInputError(errorMade, errorIndex, errorMessage){
  if(errorMade){
    errorAreas[errorIndex].innerHTML = `${errorMessage}`;
    inputs[errorIndex].classList.add('input-error');
    return
  }
  inputs[errorIndex].classList.remove('input-error');
  errorAreas[errorIndex].innerHTML = '';
}

//добавление данных в localStorage
function addItem(e) {
  e.preventDefault();
  const username = (this.querySelector('[name=username]')).value;
  const password = (this.querySelector('[name=password]')).value;

  if(username === ''){
    fillInputError(true,0,'Username required!');
  } else if(userlist.some((user)=>user.username===username)){
    fillInputError(true,0,'Username already exists!');
  }else {fillInputError(false, 0, '');}

  if(password === ''){
    fillInputError(true,1,'Password required!');
  } else {fillInputError(false, 1, '');}

  if(username === '' || password === ''){return}    

  const user = {
    username,
    password: String(CryptoJS.AES.encrypt(password, "GEEK_Solutions_test"))
  };

  userlist.push(user);
  fillTable(userlist, table);
  localStorage.setItem('userlist', JSON.stringify(userlist));
  this.reset();
}

form.addEventListener('submit', addItem)

//функция заполнения таблицы
function fillTable(list = [], table) {
  if(userlist.length === 0){
    table.innerHTML = `
      <p>No users logged in.</p>
    `;
    return
  }
  const tableHeader = `
    <table>
      <tr>
        <th>Username</th>
        <th>Encripted password</th>
      </tr>
  `;
  table.innerHTML = tableHeader + list.map((user,index) => {
    return `
      <tr>
        <td>          
          ${user.username}
        </td>
        <td>
          ${user.password}
        </td>
      </tr>
    `;
  }).join('') + '</table>';
}

//кнопки попапа
const popupBackground = document.querySelector('.popup-background');

const showBtn = document.querySelector('.show-popup');
showBtn.addEventListener('click',()=>{
  popup.classList.remove('visually-hidden');
  popup.classList.remove('hidden');
  showBtn.classList.add('hidden');
  popupBackground.classList.remove('popup-background-hidden');
  setTimeout(()=>{showBtn.classList.add('visually-hidden')},300);
});

const hideBtn = document.querySelector('.hide-popup');
hideBtn.addEventListener('click',()=>{
  popup.classList.add('hidden');
  setTimeout(()=>{popup.classList.add('visually-hidden')},300);
  showBtn.classList.remove('hidden');
  showBtn.classList.remove('visually-hidden');
  popupBackground.classList.add('popup-background-hidden');
});