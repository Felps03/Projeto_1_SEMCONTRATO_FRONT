import { User } from '../models/User';
import { UserService } from "../services/UserService";
import { AuthenticateService } from '../services/index';


import { validate } from '../helpers/index'
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck'


export class UserController {

    private name: HTMLInputElement;
    private lastName: HTMLInputElement;
    private userName: HTMLInputElement;
    private email: HTMLInputElement;
    private photo: HTMLInputElement;
    private password: HTMLInputElement;
    private dateOfBirth: HTMLInputElement;
    private passwordConfirm: HTMLInputElement;

    private addVals: (() => boolean)[];

    constructor() {
        this.name = <HTMLInputElement>document.querySelector('#name');
        this.lastName = <HTMLInputElement>document.querySelector('#lastName');
        this.userName = <HTMLInputElement>document.querySelector('#userName');
        this.email = <HTMLInputElement>document.querySelector('#email');
        this.photo = <HTMLInputElement>document.querySelector('#photo');
        this.password = <HTMLInputElement>document.querySelector('#password');
        this.dateOfBirth = <HTMLInputElement>document.querySelector('#dateOfBirth');
        this.passwordConfirm = <HTMLInputElement>document.querySelector('#passwordConfirm');

        // init validations


        this.addVals = [
            validate(this.name, vals.name),
            validate(this.lastName, vals.lastName),
            validate(this.userName, vals.username),
            validate(this.email, vals.email),
            validate(this.photo, vals.photo),
            validate(this.password, vals.password),
            validate(this.dateOfBirth, vals.dateOfBirth),
            validate(this.passwordConfirm, vals.passwordConfirm, this.password)
        ];

    }

    add(event: Event) {

        event.preventDefault();

        if (noFalse(this.addVals)) {

            let dataOfBirth = new Date(this.dateOfBirth.value.replace(/-/g, ','));

            const user = new User(
                this.name.value.toString(),
                this.lastName.value.toString(),
                this.userName.value.toString(),
                this.email.value.toString(),
                this.photo.value.toString(),
                this.password.value.toString(),
                dataOfBirth,
            );
            
            const userService = new UserService();
            let usuario = userService.add(user);

            console.log(user);
            console.log(usuario);
        }
    }


    changePassword(event: Event) {
        event.preventDefault();

        let email = <HTMLInputElement>document.querySelector('#email_rec');

        let password = <HTMLInputElement>document.querySelector('#password_rec');

        let url_string = window.location.href;
        let url = new URL(url_string);
        let URL_KEY = url.searchParams.get("key");

        const authenticateService = new AuthenticateService();

        authenticateService.verifyCode(URL_KEY, email.value, password.value);

    }

    /*list() {
        event.preventDefault();

        const userService = new UserService();
        let usuarios = userService.lista();

        console.log(user);
        console.log(usuarios);

    }

    update() {

    }

    remove() {

    }

    findById() {

    }

    */

   update(event: Event) {

    event.preventDefault();

    if (noFalse(this.addVals)) {

        let dataOfBirth = new Date(this.dateOfBirth.value.replace(/-/g, ','));

        const user = new User(
            this.name.value.toString(),
            this.lastName.value.toString(),
            this.userName.value.toString(),
            this.email.value.toString(),
            this.photo.value.toString(),
            this.password.value.toString(),
            dataOfBirth,
        );

        const userService = new UserService();
        // let usuario = userService.cadastro(user);

        console.log(user);
        // console.log(usuario);
    }
}

}