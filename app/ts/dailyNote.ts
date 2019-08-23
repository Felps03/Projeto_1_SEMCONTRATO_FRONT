import { DailyNoteController } from './controllers/DailyNoteController';
import { DailyNote } from './models/index';
import { getUser } from './utils/userData';
import { dateFormatYYYYMMDD } from './helpers/dateHelper';

let userData = getUser();
let cadastrar = document.querySelector('#daily-form');
let dailyesResult = document.querySelector('#dayliesResult');
let cancel = document.getElementById("cancel");
let listDate = document.querySelector('#filter');
let showDaylies = document.querySelector('#showDaylies');
const controller = new DailyNoteController();

if (listDate && dailyesResult) listDate.addEventListener('click', controller.listDateDaily.bind(controller));
if (cadastrar) cadastrar.addEventListener('submit', controller.registeredDaily.bind(controller));
if (cancel) cancel.addEventListener('click', controller.cancel.bind(controller));
if (showDaylies) showDaylies.addEventListener('click', controller.showAllDailys.bind(controller))

controller.checkImpediment()

$(document).ready(() => {
    document.getElementById('showDaylies').click()

    setTimeout(() => {
        let logout = document.getElementById("logout");
        if (logout) logout.addEventListener('click', controller.logout.bind(controller));
    }, 1000);



});


//Responsive
// if (window.innerWidth <= 576) {
//     document.getElementById('recovery-pass').classList.add('btn-block');
//     document.getElementById('cancel').classList.add('btn-block');

//     document.getElementById('filter').classList.add('btn-block');
//     document.getElementById('filter').classList.add('mt-0');
//     document.getElementById('filter').classList.add('mb-4');
//     document.getElementById('filter').classList.remove('col-sm-6');
//     document.getElementById('filter').classList.add('col-sm-12');
//     // document.getElementById('add_daily').classList.add('');
//     document.getElementById('add_daily').classList.add('mb-4');

//     var btn = document.querySelector('.responsive-add-daily-bottom');
//     if (btn.parentNode) btn.parentNode.removeChild(btn);

// } else {
//     var btn = document.querySelector('.responsive-add-daily-top');
//     if (btn.parentNode) btn.parentNode.removeChild(btn);
// }