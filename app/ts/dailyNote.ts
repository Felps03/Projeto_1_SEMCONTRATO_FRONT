import { DailyNoteController } from './controllers/DailyNoteController';
import { DailyNote } from './models/index';
import { getUser } from './utils/userData';
import { dateFormatYYYYMMDD } from './helpers/dateHelper';

let userData = getUser();
if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="home.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;

let dailyesResult = document.querySelector('#dayliesResult');
let totalPagesDiv = document.querySelector('#pages');
let id_daily: string;
const url = new URLSearchParams(location.search);
const url_date = url.get('date');
const dateField = <HTMLInputElement>document.querySelector('#date_filter');

const controller = new DailyNoteController();

let cadastrar = document.querySelector('#daily-form');
if (cadastrar) {
	cadastrar.addEventListener('submit', registeredDaily);
}

let cancel = document.getElementById("cancel");
if (cancel) {
	const dailyNoteController = new DailyNoteController();
	cancel.addEventListener('click', dailyNoteController.cancel.bind(dailyNoteController));
}

load()

let listDate = document.querySelector('#filter');
if (listDate) {
	if (dailyesResult) {
		listDate.addEventListener('click', listDateDaily);
	}
}

// window.addEventListener('load', load); 

// const dateValue = dateField.value || url_date;

function load() {
	// essa porra que tava bugando tudo.
	// if (url.get('date') && url.get('page')) {
	// 	// 	// console.log('oi do load')
	// 	listDateDaily(event);
	// }

	// let year = `${new Date().getFullYear()}`;
	// let month = `${new Date().getMonth() + 1}`;
	// let day = `${new Date().getDate()}`;

	// if (month.length < 2) month = '0' + month;
	// if (day.length < 2) day = '0' + day;

	// let today = `${year}-${month}-${day}`;

	let today = dateFormatYYYYMMDD(new Date());

	dateField.value = url_date || today;

	if (url.get('user')) {
		listUserDaily(event)
	} else {
		listDateDaily(event)
	}
	dailyButton(event);
	login(event);
}

function login(event: Event) {
	if (!localStorage.getItem('id') || localStorage.getItem('id') === 'undefined' || localStorage.getItem('id') === null) {
		document.getElementById('add_daily').setAttribute('disabled', 'disabled');
	}
}

function dailyButton(event: Event) {
	controller.registered(event)
		.then((res) => {
			//console.log(res.status)
			if (res.status == 400) {
				document.getElementById('dailyModal').click();
				document.getElementById('add_daily').setAttribute('disabled', 'disabled');
				return;
			}
		});
}

function registeredDaily(event: Event) {
	controller.add(event)
		.then((res) => {
			if (res.status == 200) {
				listDateDaily(event);
				document.getElementById('dailyModal').click();
				document.getElementById('add_daily').setAttribute('disabled', 'disabled');
				document.getElementById('status_daily').innerHTML = `
			<div class="alert alert-success alert-dismissible fade show" role="alert">
			<strong>Daily cadastrada com sucesso!</strong>
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
			</button>
			</div>
			`;
				return;
			} else if (res.status == 400) {
				document.getElementById('dailyModal').click();
				document.getElementById('add_daily').setAttribute('disabled', 'disabled');
				document.getElementById('status_daily').innerHTML = `
			<div class="alert alert-danger alert-dismissible fade show" role="alert">
			<strong>Você já cadastrou sua daily!</strong>
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
			</button>
			</div>
			`;
				return;
			}
		});
}

function listDateDaily(event: Event) {
	dailyesResult.innerHTML = '';
	const result = controller.listD(event);

	if (result) {
		result.then((result) => {
			for(let i = 0; i < result.length-1; i++){
				// const r = result[0];
				// console.log(r.hasOwnProperty('totalDocs'));
				// console.log(r);
				const daily = new DailyNote(result[i].yesterday, result[i].today, result[i].impediment, new Date(result[i].date));
				// daily.Id = r.id_daily;
				// console.log(daily);
				const owner: string = result[i].owner;
				const id_owner: string = result[i].id_user;
				id_daily = result[i].id_daily;
				if (dailyesResult) {
					mountTable(dailyesResult, daily, owner, id_owner, id_daily);
				}
				id_daily = '';
			}
			return;
		});
	}
}

function listUserDaily(event: Event) {
	dailyesResult.innerHTML = ''
	const result = controller.listU(event)

	if (result) {
		result.then(result => {
			result.forEach((r: any) => {
				// const r = result[0];
				// console.log(r.hasOwnProperty('totalDocs'));
				// console.log(r);
				const daily = new DailyNote(
					r.yesterday,
					r.today,
					r.impediment,
					new Date(r.date)
				)
				// daily.Id = r.id_daily;
				// console.log(daily);

				let totalPages: number
				if (r.hasOwnProperty('totalPages')) {
					totalPages = parseInt(r.totalPages)
					// totalPages = 10;
					let header_pagination: string = ''
					let string_li: string = ''
					let footer_pagination: string = ''
					const dateValue = url_date || dateField.value
					// console.log("a data é: ", dateValue);
					if (totalPagesDiv) {
						header_pagination = `
                        <nav aria-label="daily-nav" class="float-right">
                        <ul class="pagination">
                        <li class="page-item">
                        </a>
                        </li>
                        `
						// console.log(header_pagination);
						let i = 0
						string_li = ''
						for (i; i < totalPages; i++) {
							string_li += `
                            <li class="page-item"><a class="page-link" href="app-daily-note.html?page=${i +
								1}&date=${dateValue}">${i + 1}</a></li>
								`
						}
						// console.log(string_li);
						footer_pagination = `
							<li class="page-item" >
                        
							`
						// console.log(footer_pagination);
						const nav_pagination = document.createElement('nav')
						const fullString: string =
							header_pagination + string_li + footer_pagination
						nav_pagination.innerHTML = fullString
						totalPagesDiv.innerHTML = ''
						totalPagesDiv.appendChild(nav_pagination)
						// console.log(fullString);
					}
					return
				}
				const owner: string = r.owner
				const id_owner: string = r.id_user
				id_daily = r.id_daily
				if (dailyesResult) {
					mountTable(dailyesResult, daily, owner, id_owner, id_daily)
				}
				id_daily = ''
				return
			})
		})
	}
}

function mountTable(dayliesResult: any, daily: DailyNote, owner: string, id_user: string, id_daily: string) {
	const body = document.createElement('tr');

	if (localStorage.getItem('isAdmin') === 'true' || id_user === localStorage.getItem('id')) {
		body.innerHTML = `<tr>
                <td>${owner}</td>
                <td>${daily.Date.getUTCDate()}/${daily.Date.getUTCMonth() + 1}/${daily.Date.getUTCFullYear()} </td>
                <td>${daily.Yesterday}</td>
                <td>${daily.Today}</td>
                <td>${daily.Impediment}</td>
                <td>
                    <a href="daily-edit.html?id=${id_daily}&owner=${id_user}"
                        class="btn btn-outline-warning btn-sm input-circle pt-2 mr-2" id="edit-daily">
                        <i class="small material-icons" id="teste">edit</i>
                    </a>
                </td>
                </tr>`;
	} else {
		body.innerHTML = `<tr>
                <td>${owner}</td>
                <td>${daily.Date.getUTCDate()}/${daily.Date.getUTCMonth() + 1}/${daily.Date.getUTCFullYear()} </td>
                <td>${daily.Yesterday}</td>
                <td>${daily.Today}</td>
                <td>${daily.Impediment}</td>
                <td>         </td>
                </tr>`;
	}

	dailyesResult.appendChild(body);
}