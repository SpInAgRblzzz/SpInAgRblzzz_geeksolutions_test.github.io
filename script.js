//получение элементов документа
const popup = document.querySelector('.popup');
const form = document.querySelector('.popup-form');
const table = document.querySelector('.userlist-content')
const userlist = JSON.parse(localStorage.getItem('userlist')) || [];

//заполнение таблицы при запуске
fillTable(userlist, table);

//добавление данных в localStorage
function addItem(e) {
    e.preventDefault();
    const username = (this.querySelector('[name=username]')).value;
    const password = (this.querySelector('[name=password]')).value;    
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
const showBtn = document.querySelector('.show-popup');
showBtn.addEventListener('click',()=>{
  popup.classList.remove('visually-hidden');
  showBtn.classList.add('visually-hidden');
});

const hideBtn = document.querySelector('.hide-popup');
hideBtn.addEventListener('click',()=>{
  popup.classList.add('visually-hidden');
  showBtn.classList.remove('visually-hidden');
});