import { Authenticate } from "../models/index";
import { AuthenticateService } from "../services/AuthenticateService";
import { validate } from '../helpers/index'
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck'
import { UserService } from "../services/UserService";

export class AuthenticateController {

    private email: HTMLInputElement;
    private password: HTMLInputElement;

    private authVals: (() => boolean)[];

    constructor() {
        this.email = <HTMLInputElement>document.getElementById('email');
        this.password = <HTMLInputElement>document.getElementById('password');

        // init validations
        this.authVals = [
            validate(this.email, vals.email),
            validate(this.password, vals.password)
        ];
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

       

        

        

    changePassword(event: Event) {
        event.preventDefault();

        var email = <HTMLInputElement>document.querySelector('#email_rec');

        const userService = new UserService();
        const authenticateService = new AuthenticateService();

        console.log(usuario);
*/
