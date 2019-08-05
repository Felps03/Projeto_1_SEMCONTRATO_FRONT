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

if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;
if (listDate && dailyesResult) listDate.addEventListener('click', controller.listDateDaily.bind(controller));
if (cadastrar) cadastrar.addEventListener('submit', controller.registeredDaily.bind(controller));
if (cancel) cancel.addEventListener('click', controller.cancel.bind(controller));
if (showDaylies) showDaylies.addEventListener('click', controller.showAllDailys.bind(controller))

$(document).ready(() => document.getElementById('showDaylies').click());