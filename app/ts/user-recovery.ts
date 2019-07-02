import { UserController } from './controllers/UserController';

let changePassword = document.getElementById("recoverycodeT");
if(changePassword) {
    const userController = new UserController();
    
    changePassword.addEventListener('click', userController.changePassword.bind(userController))
}