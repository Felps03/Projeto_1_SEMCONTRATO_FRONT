import { AuthenticateController } from "./controllers/AuthenticateController";
import { UserController } from "./controllers/UserController";
const authenticateController = new AuthenticateController();
let authenticate = document.querySelector('#login-form');
if (authenticate != null) {
    authenticate.addEventListener('submit', authenticateController.authenticate.bind(authenticate));
}
const userController = new UserController();
let cadastrar = document.querySelector('#user-register');
if (cadastrar != null) {
    cadastrar.addEventListener('submit', userController.add.bind(userController));
}
let recuperarEmail = document.querySelector('#recovery-pass-form');
if (recuperarEmail != null) {
    recuperarEmail.addEventListener('submit', authenticateController.changePassword.bind(authenticate));
}
