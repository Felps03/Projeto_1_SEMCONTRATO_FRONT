import { HOST } from '../config/index';
export class DailyNoteService {
    add(yesterday, today, impediment, date) {
        console.log(new Date().toISOString().slice(0, 10));
        fetch(`${HOST}dailys/daily`, {
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
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }
    listDate(data, page = 1) {
        let year = JSON.stringify(data.getFullYear());
        let month = JSON.stringify(data.getMonth() + 1);
        let day = JSON.stringify(data.getDate() + 1);
        if (month.length < 2)
            month = `0` + month;
        if (day.length < 2)
            day = `0` + day;
        let dateFilter = `${year}-${month}-${day}`;
        return fetch(`${HOST}dailys/daily/${dateFilter}/${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }
    listAll(page) {
        return fetch(`${HOST}dailys/${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`
            }
        });
    }
}
