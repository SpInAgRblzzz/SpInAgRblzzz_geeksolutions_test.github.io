//БД и ключи 
let userlist = {};
let keys = [];

//получение БД
const database = firebase.database();
const ref = database.ref('userlist');

//заполнение таблицы при получении данных
ref.on('value', fillTable);

//получение элементов документа
const popup = document.querySelector('.popup');
const form = document.querySelector('.popup-form');
const table = document.querySelector('.userlist-content');
const errorAreas = Array.from(document.querySelectorAll('.error'));
const inputs = Array.from(document.querySelectorAll('fieldset input'));

//добавление данных в БД
function addItemSubmit(e) {
  e.preventDefault();

  const username = (this.querySelector('[name=username]')).value;
  const password = (this.querySelector('[name=password]')).value;

  if(!isValid(username,password)){return}

  const user = {
    username,
    password: String(CryptoJS.AES.encrypt(password, "GEEK_Solutions_test"))
  };
  
  ref.push(user);
  
  this.reset();
}

//отлов отправки формы
form.addEventListener('submit', addItemSubmit);