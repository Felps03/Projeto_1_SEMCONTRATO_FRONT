import { Authenticate } from "../models/index";
import { AuthenticateService } from "../services/AuthenticateService";
import { validate } from '../helpers/index'
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck'
import { UserService } from "../services/UserService";

export class AuthenticateController {

    private email: HTMLInputElement;
    private password: HTMLInputElement;

    private emailRec: HTMLInputElement;

    private authVals: (() => boolean)[];
    private passRecVals: (() => boolean)[];

    constructor() {
        this.email = <HTMLInputElement>document.getElementById('email');
        this.password = <HTMLInputElement>document.getElementById('password');

        this.emailRec = <HTMLInputElement>document.getElementById('email_rec');

        // init validations
        try{
            this.authVals = [
              validate(this.email, vals.email),
              validate(this.password, vals.password)
            ];

            this.passRecVals = [
              validate(this.emailRec, vals.email)
             ];
        }catch(e){
            console.log("passo no catch");
        }
    }

    authenticate(event: Event) {

        if (noFalse(this.authVals)) {

            const authenticateService = new AuthenticateService();

            let usuario = authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());

            // console.log("oiii");
            // console.log(this.email.value);
            // console.log(this.password.value);
        }

        event.preventDefault();
    }

    resetPassword(event: Event) {
        event.preventDefault();

        if (noFalse(this.passRecVals)) {
            // /users/user/recover
            const userService = new UserService();
            const authenticateService = new AuthenticateService();

            authenticateService.resetPassword(this.email.value.toString())
        }
    }

    logout(event: Event){
        event.preventDefault();
    
        // /users/logout
        // fach com local storage kill token 
        //Authorization : Bearer "token"
        const authenticateService = new AuthenticateService();

        authenticateService.logout();
        
    }
}