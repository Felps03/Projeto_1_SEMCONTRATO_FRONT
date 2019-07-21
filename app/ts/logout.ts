import { AuthenticateController } from "./controllers/AuthenticateController";

const controller = new AuthenticateController();

let logout = document.getElementById('logout');
if(logout) {
    console.log("chegou na integracao");
    logout.addEventListener('click', controller.logout.bind(controller));
}