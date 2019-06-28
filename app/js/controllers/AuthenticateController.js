import { Authenticate } from "../models/index";
import { AuthenticateService } from "../services/AuthenticateService";
export class AuthenticateController {
    constructor() {
        this.email = document.querySelector('#email');
        this.password = document.querySelector('#senha');
    }
    adiciona(event) {
        event.preventDefault();
        const authenticate = new Authenticate(this.email.value.toString(), this.password.value.toString());
        const authenticateService = new AuthenticateService();
        let usuario = authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());
        console.log(authenticate);
        console.log(usuario);
    }
}
