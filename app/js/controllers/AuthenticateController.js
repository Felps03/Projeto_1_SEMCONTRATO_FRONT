import { Authenticate } from "../models/index";
import { AuthenticateService } from "../services/AuthenticateService";
export class AuthenticateController {
    constructor() {
        this.email = document.getElementById('#email');
        this.password = document.getElementById('#password');
    }
    authenticate(event) {
        event.preventDefault();
        alert("chegou");
        console.log('aqui');
        console.log(this.email.value.toString());
        console.log(this.password.value.toString());
        const authenticate = new Authenticate(this.email.value.toString(), this.password.value.toString());
        const authenticateService = new AuthenticateService();
        let usuario = authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());
        console.log(authenticate);
        console.log(usuario);
    }
}
