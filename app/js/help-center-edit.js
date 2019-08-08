System.register(["./controllers/EditHelpController", "./utils/userData"], function (exports_1, context_1) {
    "use strict";
    var EditHelpController_1, userData_1, url, url_help_id, url_owner, idResult, userData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (EditHelpController_1_1) {
                EditHelpController_1 = EditHelpController_1_1;
            },
            function (userData_1_1) {
                userData_1 = userData_1_1;
            }
        ],
        execute: function () {
            url = new URLSearchParams(location.search);
            url_help_id = url.get('id');
            url_owner = url.get('owner');
            idResult = document.querySelector('#editResult');
            userData = userData_1.getUser();
            if (!localStorage.getItem('tkn'))
                document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
            $('#help_cancel').click((e) => {
                e.preventDefault();
                window.location.href = "app-help-center.html";
            });
            if ((localStorage.getItem('isAdmin') == 'true') || (localStorage.getItem('id') === url_owner)) {
                let update = document.getElementById('edithelp-form');
                if (update) {
                    const editController = new EditHelpController_1.EditHelpController();
                    editController.getHelpData(url_help_id);
                    update.addEventListener("submit", (e) => {
                        editController.update(e)
                            .then((res) => {
                            if (res.status === 201) {
                                idResult.textContent = "Pergunta Editada com sucesso";
                                idResult.className = "alert alert-info";
                                setTimeout(() => {
                                    window.location.href = `app-help-center.html`;
                                }, 1000);
                            }
                        });
                    });
                }
            }
            else {
                window.location.href = "index.html";
            }
        }
    };
});
