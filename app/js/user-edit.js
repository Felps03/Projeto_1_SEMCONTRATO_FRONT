import { UserController } from "./controllers/UserController";
import { getUser } from "./utils/userData";
let user = getUser();
let update = document.getElementById("user-edit");
if (update) {
    const userController = new UserController();
    update.addEventListener('submit', userController.update.bind(userController));
}
let userController = new UserController().getUserData();
