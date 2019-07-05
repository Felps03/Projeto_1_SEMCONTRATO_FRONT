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
    //private photo: HTMLInputElement;
    private password: HTMLInputElement;
    private dateOfBirth: HTMLInputElement;
    private passwordConfirm: HTMLInputElement;
    private id: HTMLInputElement;

    private addVals: (() => boolean)[];

    constructor() {
        this.name = <HTMLInputElement>document.querySelector('#name');
        this.lastName = <HTMLInputElement>document.querySelector('#lastName');
        this.userName = <HTMLInputElement>document.querySelector('#userName');
        this.email = <HTMLInputElement>document.querySelector('#email');
        //this.photo = <HTMLInputElement>document.querySelector('#photo');
        this.password = <HTMLInputElement>document.querySelector('#password');
        this.dateOfBirth = <HTMLInputElement>document.querySelector('#dateOfBirth');
        this.passwordConfirm = <HTMLInputElement>document.querySelector('#passwordConfirm');
        this.id = <HTMLInputElement>document.querySelector('#id');
        
        // init validations

        try {
            this.addVals = [
                validate(this.name, vals.name),
                validate(this.lastName, vals.lastName),
                validate(this.userName, vals.username),
                validate(this.email, vals.email),
                validate(this.password, vals.editPassword),
                validate(this.dateOfBirth, vals.dateOfBirth),
                validate(this.passwordConfirm, vals.editPasswordConfirm, this.password)
            ];
        } catch (error) {
            console.log("validacao ok");
        }
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
                //this.photo.value.toString(),
                this.password.value.toString(),
                dataOfBirth,
                this.id.value.toString(),
            );

            const userService = new UserService();
            let usuario = userService.cadastro(user);

            console.log(user);
        }
    }

    getUserData() {
        let data;
        if (!localStorage.getItem('tkn')) {
            return false;
        }
        else {
            const userService = new UserService();
            return userService.getData()
                .then(res => {
                    return res.json();
                })
                .then(result => {
                    let data = {
                        id: result['_id'],
                        name: result['name'],
                        userName: result['userName'],
                        lastName: result['lastName'],
                        email: result['email'],
                        dateOfBirth: result['dateOfBirth']
                    }
                    return data;
                });
        }
    }

    update(event: Event) {
        event.preventDefault();

        let id = <HTMLInputElement>document.querySelector('#id');

        if (noFalse(this.addVals)) {
            let dataOfBirth = new Date(this.dateOfBirth.value.replace(/-/g, ','));

            const user = new User(
                this.name.value.toString(),
                this.lastName.value.toString(),
                this.userName.value.toString(),
                this.email.value.toString(),
                //this.photo.value.toString(),
                this.password.value.toString(),
                dataOfBirth,
                this.id.value.toString()
            );

            const userService = new UserService();

            userService.update(user);
        }
    }


    /*list() {
        event.preventDefault();

        const userService = new UserService();
        let usuarios = userService.lista();

        console.log(user);
        console.log(usuarios);

    }

    remove() {

    }

    findById() {

    }

    */

}