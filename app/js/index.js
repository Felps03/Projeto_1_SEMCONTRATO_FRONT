import { AuthenticateController } from "./controllers/AuthenticateController";
const authenticateController = new AuthenticateController();
let authenticate = document.querySelector('formAuth');
if (authenticate != null) {
    authenticate.addEventListener('click', authenticateController.authenticate.bind(authenticate));
}
