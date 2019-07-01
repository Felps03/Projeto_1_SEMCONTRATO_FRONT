import { Authenticate } from "../models/index";
import { AuthenticateService } from "../services/AuthenticateService";

export class AuthenticateController {

    private email: HTMLInputElement;
    private password: HTMLInputElement;

    constructor() {
        this.email = <HTMLInputElement>document.getElementById('#email');
        this.password = <HTMLInputElement>document.getElementById('#password');
    }

    authenticate(event: Event) {
        event.preventDefault();

        const authenticateService = new AuthenticateService();

        let usuario = authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());


        console.log(this.email.value);
        console.log(this.password.value);
    }
}

/*

       

        

        

        console.log(authenticate);

        console.log(usuario);
*/