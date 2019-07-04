import { User } from '../models/User';
import { UserService } from "../services/UserService";
import { validate } from '../helpers/index';
import * as vals from '../validation/userValidate';
import { noFalse } from '../utils/listCheck';
export class UserController {
    constructor() {
        this.name = document.querySelector('#name');
        this.lastName = document.querySelector('#lastName');
        this.userName = document.querySelector('#userName');
        this.email = document.querySelector('#email');
        this.photo = document.querySelector('#photo');
        this.password = document.querySelector('#password');
        this.dateOfBirth = document.querySelector('#dateOfBirth');
        this.passwordConfirm = document.querySelector('#passwordConfirm');
        try {
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
        catch (error) {
            console.log("validacao ok");
        }
    }
    add(event) {
        event.preventDefault();
        if (noFalse(this.addVals)) {
            let dataOfBirth = new Date(this.dateOfBirth.value.replace(/-/g, ','));
            const user = new User(this.name.value.toString(), this.lastName.value.toString(), this.userName.value.toString(), this.email.value.toString(), this.photo.value.toString(), this.password.value.toString(), dataOfBirth);
            const userService = new UserService();
            let usuario = userService.add(user);
            console.log(user);
            console.log(usuario);
        }
    }
    update(event) {
        event.preventDefault();
        if (noFalse(this.addVals)) {
            let dataOfBirth = new Date(this.dateOfBirth.value.replace(/-/g, ','));
            const user = new User(this.name.value.toString(), this.lastName.value.toString(), this.userName.value.toString(), this.email.value.toString(), this.photo.value.toString(), this.password.value.toString(), dataOfBirth);
            const userService = new UserService();
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
                    name: result['name'],
                    userName: result['userName'],
                    lastName: result['lastName'],
                    email: result['email'],
                    dateOfBirth: result['dateOfBirth']
                };
                return data;
            });
        }
    }
}
