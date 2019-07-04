import { UserController } from "./controllers/UserController";
let name = document.querySelector('#name');
let userName = document.querySelector('#userName');
let lastName = document.querySelector('#lastName');
let email = document.querySelector('#email');
let dateOfBirth = document.querySelector('#dateOfBirth');
let userController = new UserController();
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
        if (email != null) {
            email.value = data.email;
        }
        if (dateOfBirth != null) {
            let dia = new Date(data.dateOfBirth.toString()).getDay();
            let d;
            if (dia < 10) {
                d = "0" + dia;
            }
            let mes = new Date(data.dateOfBirth.toString()).getMonth();
            let m;
            if (mes < 10) {
                m = "0" + mes;
            }
            let ano = new Date(data.dateOfBirth.toString()).getFullYear();
            let dataFormatada = ano + "-" + m + "-" + d;
            dateOfBirth.value = dataFormatada;
        }
    });
}
else {
    window.location.href = "index.html";
}
