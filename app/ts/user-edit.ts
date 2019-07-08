import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserService";

let update = document.getElementById("user-edit");
if (update) {
    const userController = new UserController();
    update.addEventListener('submit', userController.update.bind(userController))
}

let name = <HTMLInputElement>document.querySelector('#name');
let userName = <HTMLInputElement>document.querySelector('#userName');
let lastName = <HTMLInputElement>document.querySelector('#lastName');
let email = <HTMLInputElement>document.querySelector('#email');
let dateOfBirth = <HTMLInputElement>document.querySelector('#dateOfBirth');
let password = <HTMLInputElement>document.querySelector('#password');
let id = <HTMLInputElement>document.querySelector('#id');

let nameSpan = document.querySelector('#nameSpan');
let userNameSpan = document.querySelector('#userNameSpan');

let userController = new UserController();

const data = userController.getUserData();

if (data) {
    data.then(data => {

        console.log(data);

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
            dateOfBirth.value =  data.dateOfBirth.slice(0,10);        
        }
    })
}
else {
    window.location.href = "index.html"
}