import { EditHelpController } from "./controllers/EditHelpController";
import { getUser } from "./utils/userData";

const url = new URLSearchParams(location.search);
const url_help_id: string = url.get('id');
const url_owner = url.get('owner');

const idResult = document.querySelector('#editResult')
let userData = getUser();
if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

$('#help_cancel').click((e) => {
    e.preventDefault();
    window.location.href = "app-help-center.html";
});

if ((localStorage.getItem('isAdmin') == 'true') || (localStorage.getItem('id') === url_owner)) {

    let update = document.getElementById('edithelp-form');

    if (update) {
        const editController = new EditHelpController();
        editController.getHelpData(url_help_id);
        
        update.addEventListener("submit", (e: Event) => {
            editController.update(e)
                .then((res: (any)) => {
                    if (res.status === 201) {
                        idResult.textContent = "Pergunta Editada com sucesso"
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