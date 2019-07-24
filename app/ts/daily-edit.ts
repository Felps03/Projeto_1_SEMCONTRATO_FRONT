const url = new URLSearchParams(location.search);
const url_owner = url.get('owner');
const url_daily = url.get('id');

import { EditDailyController } from "./controllers/EditDailyController";
import { getUser } from "./utils/userData";
// import { DailyNote } from "./models/index";

// const update = document.querySelector('#update_daily');

// const idDaily = document.querySelector('#idDaily')
// const yesterday = document.querySelector('#edit-yesterday')
// const today = document.querySelector('#edit-today')
// const impediment = document.querySelector('#edit-impediment')
const idResult = document.querySelector('#editResult')

let userData = getUser();
if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
// let newYesterday: string;
// let newToday: string;
// let newImpediment: string;

$('#daily_cancel').click((e) => {
    e.preventDefault();
    window.location.href = "app-daily-note.html";
});

if ((localStorage.getItem('isAdmin') == 'true') || (localStorage.getItem('id') === url_owner)) {

    let update = document.getElementById('editdaily-form');

    if (update) {
        const editController = new EditDailyController();
        // update.addEventListener("submit", editController.update.bind(editController)
        update.addEventListener("submit", (e: Event) => {
            editController.update(e)
                .then((res: (any)) => {
                    if (res.status === 200) {
                        idResult.textContent = "Daily Editada com sucesso"
                        idResult.className = "alert alert-info"
                        setTimeout(() => {
                            window.location.href = "app-daily-note.html";
                        }, 1000)
                    }
                })
        })
    }
    // console.log(url_daily)
    const editDailyController = new EditDailyController().getDailyData(url_daily);

}
else {
    window.location.href = "index.html"

}