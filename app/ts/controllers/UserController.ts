import { User } from '../models/User';
import { UserService } from "../services/UserService";
import { AuthenticateService } from '../services/index';

import { validate } from '../helpers/index'
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck'
import { MessageView } from '../views/MessageView';

export class UserController {

    private messageView: MessageView

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
        // this.photo = <HTMLInputElement>document.querySelector('#photo');
        this.password = <HTMLInputElement>document.querySelector('#password');
        this.dateOfBirth = <HTMLInputElement>document.querySelector('#dateOfBirth');
        this.passwordConfirm = <HTMLInputElement>document.querySelector('#passwordConfirm');
        this.id = <HTMLInputElement>document.querySelector('#id');

        this.messageView = new MessageView('#message-view')

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
            new Promise((resolve, reject) => {
                userService.add(user)
                    .then(result => {
                        if (result.status === 200) {
                            const token = result.headers.get("Token");
                            if (token != null) {
                                localStorage.setItem('tkn', token);
                            };
                            resolve(result.json())
                        } else {
                            reject(result)
                        }
                    })
            })
                .then((res: any) => {
                    localStorage.setItem('email', res.email)
                    localStorage.setItem('id', res._id)
                    // console.log(result[0]['email']);
                    window.location.href = "home.html";
                })

                .catch((res: any) => res.json())
                .then((res: any) => {
                    console.log(res)
                    if (res.erro)
                        this.messageView.update(res.erro)
                })
        }
    }

    getUserData() {
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
                    if (!result) {
                        window.location.href = "index.html"
                    }

                    let id = <HTMLInputElement>document.querySelector('#id');
                    if (id != null) id.value = result['_id'];

                    new User(
                        this.name.value = result['name'],
                        this.userName.value = result['userName'],
                        this.lastName.value = result['lastName'],
                        this.email.value = result['email'],
                        this.dateOfBirth.value = result['dateOfBirth'].slice(0, 10),
                        this.password.value = ""
                    );
                });
        }
    }

    update(event: Event) {
        event.preventDefault();

        let id = <HTMLInputElement>document.querySelector('#id');

        if (noFalse(this.addVals)) {
            let dataOfBirth = this.dateOfBirth.value.replace(/-/g, ',');

            const user = new User(
                this.name.value.toString(),
                this.lastName.value.toString(),
                this.userName.value.toString(),
                this.email.value.toString(),
                this.password.value.toString(),
                dataOfBirth
            );

            const userService = new UserService();

            userService.update(user, id.value)
                .then(result => {
                    return result.json();
                }).then(res => {
                    window.location.href = "home.html";
                })
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