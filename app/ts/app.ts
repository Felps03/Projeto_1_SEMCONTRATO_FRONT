import { UserController } from "./controllers/UserController";
import { isFulfilled } from "../../node_modules/@types/q/index";

const controller = new UserController();
document.querySelector('.form').addEventListener('submit', controller.add.bind(controller));

let teste = document.querySelector('.form');
// if (!teste) {
//     teste  = ;
// }
teste.addEventListener('submit', controller.add.bind(controller));