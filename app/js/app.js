import { UserController } from "./controllers/UserController";
const controller = new UserController();
let user = document.querySelector('.form');
if (user != null) {
    user.addEventListener('submit', controller.add.bind(controller));
}
