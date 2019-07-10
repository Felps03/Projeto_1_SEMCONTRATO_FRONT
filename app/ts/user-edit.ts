import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserService";

let update = document.getElementById("user-edit");
if (update) {
    const userController = new UserController();
    update.addEventListener('submit', userController.update.bind(userController))
}

let userController = new UserController().getUserData();

