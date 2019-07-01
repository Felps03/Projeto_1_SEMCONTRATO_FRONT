import { Authenticate } from "../models/index";
import { AuthenticateService } from "../services/AuthenticateService";
import { validate } from '../helpers/index'
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck'

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

        /*alert("chegou");
        console.log('aqui');
        console.log(this.email.value);
        console.log(this.password);*/

        console.log(this.authVals);

        if (noFalse(this.authVals)) {

            /*
            
                    const authenticate = new Authenticate(
            
                        this.email.value.toString(),
            
                        this.password.value.toString()
                    );
            
            */
            const authenticateService = new AuthenticateService();

            let usuario = authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());


            console.log(usuario);

        }
    }

    
    changePassword(event: Event) {
        event.preventDefault();

        var email = <HTMLInputElement>document.querySelector('#email_rec');
        
        const userService = new UserService();
        const authenticateService = new AuthenticateService();

        userService.findByEmail(email.value);

        authenticateService.resetPassword(email.value);
    }

}