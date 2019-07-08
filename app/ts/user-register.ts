import { UserController } from "./controllers/UserController";

document.addEventListener("DOMContentLoaded", function (event) {
        
    if(localStorage.getItem('tkn')){
        window.location.href = "home.html";
    }
});

let cadastrar = document.querySelector('#user-register');
 if (cadastrar) {
     const userController = new UserController();
     cadastrar.addEventListener('submit', userController.add.bind(userController));
}
