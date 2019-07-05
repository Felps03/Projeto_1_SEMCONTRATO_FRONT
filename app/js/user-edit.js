import { UserController } from "./controllers/UserController";
let update = document.getElementById("user-edit");
if (update) {
    const userController = new UserController();
    update.addEventListener('submit', userController.update.bind(userController));
}
let name = document.querySelector('#name');
let userName = document.querySelector('#userName');
let lastName = document.querySelector('#lastName');
let email = document.querySelector('#email');
let dateOfBirth = document.querySelector('#dateOfBirth');
let password = document.querySelector('#password');
let id = document.querySelector('#id');
let nameSpan = document.querySelector('#nameSpan');
let userNameSpan = document.querySelector('#userNameSpan');
let userController = new UserController();
const data = userController.getUserData();
if (data) {
    data.then(data => {
        if (nameSpan != null) {
            nameSpan.textContent = data.name;
        }
        if (id != null) {
            id.value = data.id;
        }
        if (userNameSpan != null) {
            userNameSpan.textContent = `(${data.userName})`;
        }
        if (name != null) {
            name.value = data.name;
        }
        if (userName != null) {
            userName.value = data.userName;
        }
        if (lastName != null) {
            lastName.value = data.lastName;
        }
        if (email) {
            email.value = data.email;
        }
        if (dateOfBirth != null) {
            let dia = new Date(data.dateOfBirth).getDay() + 1;
            let mes = new Date(data.dateOfBirth).getMonth() + 1;
            let ano = new Date(data.dateOfBirth).getFullYear();
            let d;
            if (dia < 10) {
                d = "0" + dia.toString();
            }
            let m;
            if (mes < 10) {
                m = "0" + mes.toString();
            }
            let dataFormatada = ano + "-" + m + "-" + d;
            console.log(dataFormatada);
            dateOfBirth.value = dataFormatada;
        }
    });
}
else {
    window.location.href = "index.html";
}
