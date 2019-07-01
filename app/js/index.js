import { AuthenticateController } from "./controllers/AuthenticateController";
import { UserController } from "./controllers/UserController";
const authenticateController = new AuthenticateController();
<<<<<<< HEAD
let authenticate = document.querySelector('form');
=======
let authenticate = document.querySelector('#login-form');
>>>>>>> 2dac24a8728cb4804987a9b3312d4358257e8c16
if (authenticate != null) {
    authenticate.addEventListener('submit', authenticateController.authenticate.bind(authenticate));
}
const userController = new UserController();
let cadastrar = document.querySelector('#user-register');
if (cadastrar != null) {
    cadastrar.addEventListener('submit', userController.add.bind(userController));
}
