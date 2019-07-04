import { DailyNoteController } from "./controllers/DailyNoteController";

const controller = new DailyNoteController();

let cadastrar = document.querySelector("#daily-form");
if(cadastrar) {
    cadastrar.addEventListener('submit', controller.add.bind(controller));
}

let list = document.querySelector("#daily-form");
if(list) {
    list.addEventListener('click', controller.listD.bind(controller));
}