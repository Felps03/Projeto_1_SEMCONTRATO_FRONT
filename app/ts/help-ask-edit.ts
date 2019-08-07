import { EditAskController } from "./controllers/EditAskController";
import { getUser } from "./utils/userData";

const url = new URLSearchParams(location.search);
const url_ask_id: string = url.get('id');
const url_owner = url.get('owner');

const idResult = document.querySelector('#editResult')
let userData = getUser();
if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

$('#ask_cancel').click((e) => {
    e.preventDefault();
    window.location.href = "app-daily-note.html";
});

if ((localStorage.getItem('isAdmin') == 'true') || (localStorage.getItem('id') === url_owner)) {

    let update = document.getElementById('editask-form');

    if (update) {
        const editController = new EditAskController();
        editController.getAskData(url_ask_id);
        
        update.addEventListener("submit", (e: Event) => {
            editController.update(e)
                .then((res: (any)) => {
                    if (res.status === 200) {
                        idResult.textContent = "Resposta Editada com sucesso"
                        idResult.className = "alert alert-info"
                        setTimeout(() => {
                            window.location.href = `app-help-center.html`;
                        }, 1000)
                    }
                })
        })
    }

}
else {
    window.location.href = "index.html"

}