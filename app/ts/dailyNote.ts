import { DailyNoteController } from "./controllers/DailyNoteController";
import { DailyNote } from "./models/index";

let yesterday = document.querySelector('#yesterday');
let today = document.querySelector('#today');
let impediment = document.querySelector('#impediment');
let date = document.querySelector('#date');
let dailyesResult = document.querySelector("#dayliesResult")

const controller = new DailyNoteController();

let cadastrar = document.querySelector("#daily-form");
if (cadastrar) {
    cadastrar.addEventListener('submit', controller.add.bind(controller));
}

let listDate = document.querySelector("#filter");
if (listDate) {
    listDate.addEventListener('click', listDateDaily);
}


function listDateDaily(event: Event) {
    const result = controller.listD(event);
    if (result) {
        result
            .then(result => {
                // console.log(result);
                result.forEach((r: any) => {
                    // console.log(r.yesterday);
                    const daily = new DailyNote(r.yesterday, r.today, r.impediment, new Date(r.date));
                    // console.log(r.Date);
                    // console.log(
                    if (dailyesResult) {
                        const body = document.createElement('tr');
                        body.innerHTML =
                            `<tr>
                            <td>${r.owner}</td>
                            <td>${daily.Date.getUTCDate()}/${daily.Date.getUTCMonth() + 1}/${daily.Date.getUTCFullYear()} ${daily.Date.getUTCHours()}:${daily.Date.getUTCMinutes()}</td>
                            <td>${daily.Yesterday}</td>
                            <td>${daily.Today}</td>
                            <td>${daily.Impediment}</td>
                        </tr>`;
                        dailyesResult.append(body);
                    }
                    // );
                });
            })
        // .then(response => {
        //     return response;
        // })

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
