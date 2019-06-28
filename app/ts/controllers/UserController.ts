import { User } from '../models/User';
import { UserService } from "../services/UserService";

export class UserController {

<<<<<<< HEAD
    private name: HTMLInputElement;
    private lastName: HTMLInputElement;
    private userName: HTMLInputElement;
    private email: HTMLInputElement;
    private photo: HTMLInputElement;
    private password: HTMLInputElement;
    private dateOfBirth: HTMLInputElement;

    constructor() {
        this.name =  <HTMLInputElement>document.querySelector('#name');
        this.lastName =  <HTMLInputElement>document.querySelector('#lastName');
        this.userName =  <HTMLInputElement>document.querySelector('#euserNamemail');
        this.email =  <HTMLInputElement>document.querySelector('#email');
        this.photo =  <HTMLInputElement>document.querySelector('#photo');
        this.password =  <HTMLInputElement>document.querySelector('#password');
        this.dateOfBirth =  <HTMLInputElement>document.querySelector('#dateOfBirth');
    }
=======
    // @domInject('#name')
    private _name: JQuery;

    // @domInject('#lastName')
    private _lastName: JQuery;

    // @domInject('#userName')
    private _userName: JQuery;

    // @domInject('#email')
    private _email: JQuery;

    // @domInject('#password')
    private _password: JQuery;

    // @domInject('#dateOfBirth')
    private _dateOfBirth: JQuery;

    constructor() {}

>>>>>>> 57dce118027694da13103736ad97228ae0c8a8f9

    add(event: Event) {
        event.preventDefault();

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
            let usuario = userService.cadastro(user);

        console.log(user);
        console.log(usuario);
    }

  /*  list() {
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

    changePassword() {

    }*/
}