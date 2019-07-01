import { AuthenticateController } from "./controllers/AuthenticateController";
const controller = new AuthenticateController();
let teste = document.querySelector('.form');
if (teste != null) {
    teste.addEventListener('submit', controller.authenticate.bind(controller));
}
