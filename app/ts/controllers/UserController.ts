import { User } from '../models/User';
import { UserService } from "../services/UserService";

export class UserController {

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
        this.userName =  <HTMLInputElement>document.querySelector('#userName');
        this.email =  <HTMLInputElement>document.querySelector('#email');
        this.photo =  <HTMLInputElement>document.querySelector('#photo');
        this.password =  <HTMLInputElement>document.querySelector('#password');
        this.dateOfBirth =  <HTMLInputElement>document.querySelector('#dateOfBirth');
    }

    add(event: Event) {
        alert("chegou");
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