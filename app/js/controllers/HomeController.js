import { UserService } from "../services/UserService";
export class HomeController {
    constructor() { }
    getUserData() {
        if (!localStorage.getItem('tkn')) {
            window.location.href = "index.html";
        }
        else {
            const userService = new UserService();
            userService.getData();
        }
    }
}
