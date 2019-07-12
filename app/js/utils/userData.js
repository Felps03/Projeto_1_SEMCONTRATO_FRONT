import { HomeController } from "../controllers/HomeController";
export function getUserData() {
    let homeController = new HomeController();
    let teste;
    const data = homeController.getUserData();
    if (data) {
        data.then(data => {
            let userData = { name: data.name, userName: data.userName };
            return userData;
        }).then(data => {
            teste = data.name;
        });
        console.log(teste);
    }
}
