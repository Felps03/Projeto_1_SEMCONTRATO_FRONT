import { User } from '../models/User';
import { domInject } from '../helpers/decorators/index';

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


    adiciona(event: Event) {
        event.preventDefault();

        let dataOfBirth = new Date(this._dateOfBirth.val().replace(/-/g, ','));

        const user = new User(
            this._name.toString(),
            this._lastName.toString(),
            this._userName.toString(),
            this._email.toString(),
            this._password.toString(),
            dataOfBirth
        );

        console.log(user);
    }

}