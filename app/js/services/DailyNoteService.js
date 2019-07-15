import { HOST } from '../config/index';
export class DailyNoteService {
    add(yesterday, today, impediment, date) {
        return fetch(`${HOST}dailys/daily`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`
            },
            body: JSON.stringify({
                "yesterday": yesterday,
                "today": today,
                "impediment": impediment,
                "date": new Date().toISOString().slice(0, 10),
                "email": localStorage.getItem('email')
            })
        });
    }
    update(daily, ID) {
        console.log(ID);
        return fetch(`${HOST}dailys/daily/${ID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
            body: JSON.stringify({
                "id_user": localStorage.getItem('id'),
                "yesterday": daily.Yesterday,
                "today": daily.Today,
                "impediment": daily.Impediment,
                "date": daily.Date
            })
        });
    }
    ;
    listDate(data, page) {
        console.log(`${HOST}dailys/daily/${data}/1`);
        return fetch(`${HOST}dailys/daily/${data}/1`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }
    listAll() {
        return fetch(`${HOST}dailys`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }
    listDailyById(id) {
        return fetch(`${HOST}dailys/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }
    registeredDaily(id) {
        return fetch(`${HOST}/dailys/user/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }
}
