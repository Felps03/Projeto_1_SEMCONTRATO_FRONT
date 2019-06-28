import { Authenticate } from "../models/index";
import { AuthenticateService } from "../services/AuthenticateService";

export class AuthenticateController {

    private email: HTMLInputElement;

    private password: HTMLInputElement;

    constructor() {

        this.email =  <HTMLInputElement>document.querySelector('#email');

        this.password =  <HTMLInputElement>document.querySelector('#senha');

    }

    adiciona(event: Event) {

        event.preventDefault();

            const authenticate = new Authenticate(

                this.email.value.toString(),

                this.password.value.toString()
            );


            const authenticateService = new AuthenticateService();

            let usuario = authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());

        console.log(authenticate);

        console.log(usuario);

    }

}