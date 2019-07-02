import { UserService } from "../services/UserService";

export class HomeController {

    constructor() { }


    getUserData() {
        let data;

        if (!localStorage.getItem('tkn')) {
            // window.location.href = "index.html"
            return false;
        }
        else {

            const userService = new UserService();
            return userService.getData()
                .then(res => {
                    // console.log(res)
                    return res.json();
                })
                .then(result => {
                    // console.log(token);
                    // console.log(result['name'])
                    // console.log(result['userName'])
                    // console.log(result);
                    let data = {
                        name: result['name'],
                        userName: result['userName']
                    }
                    return data
                });


        }
        // console.log(data)
    }
}