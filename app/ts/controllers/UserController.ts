import { User } from '../models/User';
import { domInject } from '../helpers/decorators/index';
import { name } from '../validate-fns';

export class UserController {

    @domInject('#name')
    private _name: JQuery;

    @domInject('#lastName')
    private _lastName: JQuery;

    @domInject('#userName')
    private _userName: JQuery;

    @domInject('#email')
    private _email: JQuery;

    @domInject('#password')
    private _password: JQuery;

    @domInject('#dateOfBirth')
    private _dateOfBirth: JQuery;

    constructor() {}


    add(event: Event) {
        event.preventDefault();

<<<<<<< HEAD
        let data = new Date(this._dateOfBirth.val().replace(/-/g, ','));

        const user = new User(
            this._name.toString(),
            this._lastName.toString(),
            this._userName.toString(),
            this._email.toString(),
            this._password.toString(),
            data
=======
        let dataOfBirth = new Date(this._dateOfBirth.val().replace(/-/g, ','));

        const user = new User(
            this._name,
            this._lastName,
            this._userName,
            this._email,
            this._password,
            dataOfBirth
>>>>>>> 60da5cc4532eb5bd18fe61ff69f7b736a53b2bdd
        );

        console.log(user);
    }

    list() {

    }

    update() {

    }

    remove() {

    }

    findById() {

    }

    changePassword() {

    }
}