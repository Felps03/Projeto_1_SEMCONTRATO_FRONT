import { DailyNoteGOBController } from './controllers/DailyNoteGobController';
import { DailyNoteGOB } from './models/index';
import { getUser } from './utils/userData';
import { dateFormatYYYYMMDD } from './helpers/dateHelper';

let userData = getUser();
let dayliesResult = document.getElementById("dayliesResult");
let dailyesResult = document.querySelector('#dayliesResult');
let listDate = document.querySelector('#filter');
let showDaylies = document.querySelector('#showDaylies');
const controller = new DailyNoteGOBController();

if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></font></a>`;
if (listDate && dailyesResult) listDate.addEventListener('click', controller.listD.bind(controller));
if (showDaylies) showDaylies.addEventListener('click', controller.showAllDailys.bind(controller))

let m = document.getElementById('user-main');
m.innerHTML = '';
$(document).ready(() => {
    document.getElementById('showDaylies').click()

    setTimeout(() => {
        let logout = document.getElementById("logout");
        if (logout) logout.addEventListener('click', controller.logout.bind(controller));
    }, 1000);


});

//Responsive
if (window.innerWidth <= 576) {
    document.getElementById('recovery-pass').classList.add('btn-block');
    document.getElementById('cancel').classList.add('btn-block');

    document.getElementById('filter').classList.add('btn-block');
    document.getElementById('filter').classList.add('mt-0');
    document.getElementById('filter').classList.add('mb-4');
    document.getElementById('filter').classList.remove('col-sm-6');
    document.getElementById('filter').classList.add('col-sm-12');
    // document.getElementById('add_daily').classList.add('');
    document.getElementById('add_daily').classList.add('mb-4');

}