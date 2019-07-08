import { HelpCenterController } from "./controllers/HelpCenterController";

const controller = new HelpCenterController();

let cadastrar = document.querySelector("#cadastroHelpCenter");
if (cadastrar) {
    cadastrar.addEventListener('click', controller.add.bind(controller));
}

