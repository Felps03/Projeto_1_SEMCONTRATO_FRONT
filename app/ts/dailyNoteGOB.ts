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

if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
if (listDate && dailyesResult) listDate.addEventListener('click', controller.listD.bind(controller));
if (showDaylies) showDaylies.addEventListener('click', controller.showAllDailys.bind(controller))

$(document).ready(() => document.getElementById('showDaylies').click());