import { UserService } from "../services/UserService";
export class HomeController {
    constructor() { }
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
                    userName: result['userName']
                };
                return data;
            });
        }
    }
}
