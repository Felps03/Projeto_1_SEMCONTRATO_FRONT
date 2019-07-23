import { AuthenticateController } from "./controllers/AuthenticateController";

const controller = new AuthenticateController();

// let teste = document.querySelector('#user-menu-login-link').parentElement.parentElement.lastElementChild.lastElementChild;
// let teste = document.querySelector('#user-menu-login-link').lastElementChild.lastElementChild.lastElementChild;

// console.log(teste);

// teste.addEventListener('click', () => {
//     console.log("oi");
// });
// teste.addEventListener('click', controller.logout.bind(controller));

// $(document).ready(function() {
    window.document;
  
    let a = document.querySelector('#user-menu-login-link #b #c #logout');

    $('#user-menu-login-link #b #c #logout').ready(function() {
        console.log($('#user-menu-login-link #b #c #logout')[0]);
        $('#user-menu-login-link #b #c #logout').click(function() {
            console.log("oi");
        });
    }) 
    
    // addEventListener('click', () => {
    //     console.log("oi");
    // });

    // if(document.querySelector('#user-menu-login-link').lastElementChild.lastElementChild.lastElementChild) {
    //    teste = document.querySelector('#user-menu-login-link').lastElementChild.lastElementChild.lastElementChild;
    // }

    // console.log(teste);
    
// });