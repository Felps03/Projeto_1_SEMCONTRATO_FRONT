import { DailyNoteController } from "./controllers/DailyNoteController";

let yesterday = document.querySelector('#yesterday');
let today = document.querySelector('#today');
let impediment = document.querySelector('#impediment');
let date = document.querySelector('#date');

let nameSpanTxt = "";
let userNameSpanTxt = ""

const controller = new DailyNoteController();

let cadastrar = document.querySelector("#daily-form");
if(cadastrar) {
    cadastrar.addEventListener('submit', controller.add.bind(controller));
}

let listDate = document.querySelector("#filter");
if(listDate) {
    listDate.addEventListener('click', listDateDaily);
}


function listDateDaily(event: Event) {
    const daily = controller.listD(event);
    if (daily){
        daily
            .then(daily => {
                console.log()
                if(yesterday != null){
                    yesterday.textContent = daily.yesterday;
                }
            })
                
    }
    // lida promise
    // mudar o conteudo html
}
// if (data) {
//     data.then(data => {

//         if (nameSpan != null) {
//             nameSpan.textContent = data.name;
//         }
//         if (userNameSpan != null) {
//             userNameSpan.textContent = `(${data.userName})`;
//         }
//     })
// }
// else {
//     window.location.href = "index.html"
// }
