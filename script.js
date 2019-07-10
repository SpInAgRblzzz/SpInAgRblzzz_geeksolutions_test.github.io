//получение элементов документа
const form = document.querySelector('.popup-form');
const table = document.querySelector('.userlist-content')
const userlist = JSON.parse(localStorage.getItem('userlist')) || [];

//добавление данных в localStorage
function addItem(e) {
    console.log(e);
    e.preventDefault();
    const username = (this.querySelector('[name=username]')).value;
    const password = (this.querySelector('[name=password]')).value;
    if(username === '' || password === ''){return}
    const user = {
      username,
      password
    };
    userlist.push(user);
    fillTable(userlist, table);
    localStorage.setItem('userlist', JSON.stringify(userlist));
    this.reset();
}

form.addEventListener('submit', addItem)

//функция заполнения таблицы
function fillTable(list = [], table) {
  table.innerHTML = list.map((user) => {
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
  }).join('');
}