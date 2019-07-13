//функция заполнения таблицы
function fillTable(data) {
    userlist = data.val();  
    keys = Object.keys(userlist);    
    const tableHeader = `
      <table>
        <tr>
          <th>Username</th>
          <th>Encripted password</th>
        </tr>
    `;
    
    table.innerHTML = tableHeader + keys.map((userKey) => {
      return `
        <tr>
          <td>          
            ${userlist[userKey].username}
          </td>
          <td>
            ${userlist[userKey].password}
          </td>
        </tr>
      `;
    }).join('') + '</table>';
}