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
