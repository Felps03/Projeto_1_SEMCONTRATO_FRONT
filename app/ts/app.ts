import { UserController } from "./controllers/UserController";
import { isFulfilled } from "../../node_modules/@types/q/index";

const controller = new UserController();

let teste = document.querySelector('.form');
if(teste != null){
    teste.addEventListener('submit', controller.add.bind(controller));
}