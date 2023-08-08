const socket = io();

const createUserForm = document.getElementById('createUser');
const deleteUserForm = document.getElementById('deleteUser');

socket.on("connected", (data) => {
    let lista = document.getElementById("listausuarios");
    let usuarios = ''

    data.forEach((usuario) => {
        usuarios = ususarios + `<tr>
        <td>${usuario.name}</td>
        <td>${usuario.lastname}</td>
        <td>${usuario.user}</td>
        <td>${usuario.password}</td>
        </tr>
        `
    })
    lista.innerHTML = usuarios;
});


createUserForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    socket.emit('new_user', {name, lastname, user, password})

    document.getElementById('name').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('user').value = '';
    document.getElementById('password').value = '';

    return false;
})

deleteUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usna = document.getElementById('username').value;
    socket.emit('delete_username', {usna})
    document.getElementById('username').value = '';
    return false;
})