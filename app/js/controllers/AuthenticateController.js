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
<<<<<<< HEAD
        console.log(this.email.value);
        console.log(this.password);
=======
        console.log(this.email.value.toString());
        console.log(this.password.value.toString());
        const authenticate = new Authenticate(this.email.value.toString(), this.password.value.toString());
        const authenticateService = new AuthenticateService();
        let usuario = authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());
        console.log(authenticate);
        console.log(usuario);
>>>>>>> 2dac24a8728cb4804987a9b3312d4358257e8c16
    }
}
