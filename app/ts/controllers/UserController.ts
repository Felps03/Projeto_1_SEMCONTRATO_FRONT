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
        // this.photo = <HTMLInputElement>document.querySelector('#photo');
        this.password = <HTMLInputElement>document.querySelector('#password');
        this.dateOfBirth = <HTMLInputElement>document.querySelector('#dateOfBirth');
        this.passwordConfirm = <HTMLInputElement>document.querySelector('#passwordConfirm');

        // init validations


        this.addVals = [
            validate(this.name, vals.name),
            validate(this.lastName, vals.lastName),
            validate(this.userName, vals.username),
            validate(this.email, vals.email),
            // validate(this.photo, vals.photo),
            validate(this.password, vals.password),
            validate(this.dateOfBirth, vals.dateOfBirth),
            validate(this.passwordConfirm, vals.passwordConfirm, this.password)
        ];

    }

    add(event: Event) {

        event.preventDefault();

        if (noFalse(this.addVals)) {

            const user = new User(
                this.name.value.toString(),
                this.lastName.value.toString(),
                this.userName.value.toString(),
                this.email.value.toString(),
                // this.photo.value.toString(),
                this.password.value.toString(),
                this.dateOfBirth.value.toString(),
            );
            const userService = new UserService();
            userService.add(user)
            .then(result => {
                const token = result.headers.get("Token");
                if (token != null) {
                    localStorage.setItem('tkn', token);
                };
                return result.json()        
            })
            .then(res => {
                console.table(res)
                localStorage.setItem('email', res.email)
                localStorage.setItem('id', res._id)
            // console.log(result[0]['email']);
                window.location.href = "home.html";
            })

            // let usuario = userService.cadastro(user);

            // console.log(user);
            // console.log(usuario);
        }
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

}