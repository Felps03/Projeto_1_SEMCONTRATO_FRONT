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