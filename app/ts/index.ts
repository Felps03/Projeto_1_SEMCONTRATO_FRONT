import { AuthenticateController } from "./controllers/AuthenticateController";
import { UserController } from "./controllers/UserController";

const authenticateController = new AuthenticateController();

let authenticate = document.querySelector('#login-form');
if(authenticate != null){
    authenticate.addEventListener('submit', authenticateController.authenticate.bind(authenticate));
}

const userController = new UserController();
let cadastrar = document.querySelector('#user-register');

if(cadastrar != null){
    cadastrar.addEventListener('submit', userController.add.bind(userController));
}