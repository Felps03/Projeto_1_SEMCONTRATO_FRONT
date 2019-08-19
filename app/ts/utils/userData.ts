import { HomeController } from "../controllers/HomeController";

export function getUser(){
    let homeController = new HomeController();
    const data = homeController.getUser();

    if (data) {
        data.then(data => {
            let userData = {name: data.name, userName: data.userName};
            return userData;
        }).then (userData => {
            document.querySelector('#nameSpan').innerHTML = userData.name;
            document.querySelector('#userNameSpan').innerHTML = userData.userName;
            
            let aux = window.location.href;

            if (aux == 'http://localhost:3000/index.html' || aux == 'http://rebornsemcontrato.azurewebsites.net/') {
                document.getElementById('welcomeMessage').innerHTML = `
                <div class="row ${window.innerWidth <= 576 ? '' : 'mt-3'} mb-3 mx-0" id="welcomeResponsive">
                    <div class="col-12 section-help">
                        <div class="col-12">
                            <h3 class="txt-primary mt-4 mb-4">
                                Olá, <strong>${userData.name}</strong>!
                            </h3>
                        </div>
                    </div>
                </div>`;
            };

            
        })
    }
}