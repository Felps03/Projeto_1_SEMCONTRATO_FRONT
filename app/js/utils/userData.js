import { HomeController } from "../controllers/HomeController";
export function getUser() {
    let homeController = new HomeController();
    const data = homeController.getUser();
    if (data) {
        data.then(data => {
            let userData = { name: data.name, userName: data.userName };
            return userData;
        }).then(userData => {
            document.querySelector('#nameSpan').innerHTML = userData.name;
            document.querySelector('#userNameSpan').innerHTML = userData.userName;
        });
    }
}
