import { AuthenticateService } from "../services/AuthenticateService";
import { UserService } from "../services/UserService";
export class AuthenticateController {
    constructor() {
        this.email = document.getElementById('#email');
        this.password = document.getElementById('#password');
    }
    authenticate(event) {
        event.preventDefault();
        alert("chegou");
        console.log('aqui');
        console.log(this.email.value);
        console.log(this.password);
        const authenticateService = new AuthenticateService();
        let usuario = authenticateService.authenticate(this.email.value.toString(), this.password.value.toString());
        console.log(usuario);
    }
    changePassword(event) {
        event.preventDefault();
        var email = document.querySelector('#email_rec');
        if (email != null) {
            alert(email.value);
        }
        const userService = new UserService();
        let usuario = userService.findByEmail("alskdjfçlasdjfd");
    }
}
