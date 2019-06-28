import { User } from '../models/User';
import { UserService } from "../services/UserService";
export class UserController {
    constructor() {
        this.name = document.querySelector('#name');
        this.lastName = document.querySelector('#lastName');
        this.userName = document.querySelector('#userName');
        this.email = document.querySelector('#email');
        this.photo = document.querySelector('#photo');
        this.password = document.querySelector('#password');
        this.dateOfBirth = document.querySelector('#dateOfBirth');
    }
    add(event) {
        alert("chegou");
        event.preventDefault();
        let dataOfBirth = new Date(this.dateOfBirth.value.replace(/-/g, ','));
        const user = new User(this.name.value.toString(), this.lastName.value.toString(), this.userName.value.toString(), this.email.value.toString(), this.photo.value.toString(), this.password.value.toString(), dataOfBirth);
        const userService = new UserService();
        let usuario = userService.cadastro(user);
        console.log(user);
        console.log(usuario);
    }
}
