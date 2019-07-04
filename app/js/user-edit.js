import { UserController } from "./controllers/UserController";
let userController = new UserController();
let name = document.querySelector('#name');
let userName = document.querySelector('#userName');
let lastName = document.querySelector('#lastName');
let email = document.querySelector('#email');
let dateOfBirth = document.querySelector('#dateOfBirth');
let password = document.querySelector('#password');
const data = userController.getUserData();
if (data) {
    data.then(data => {
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
            let dia = new Date(data.dateOfBirth).getDay();
            let mes = new Date(data.dateOfBirth).getMonth();
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
