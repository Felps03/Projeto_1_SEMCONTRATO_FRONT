import { HOST } from '../config/index';
export class DailyNoteService {
    add(yesterday, today, impediment, date) {
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
                "email": localStorage.getItem('email')
            })
        })
            .then(res => res.json())
            .then(res => {
            if (res.status == 200) {
                console.log("funcionou");
            }
        });
    }
    update(daily, ID) {
        return fetch(`${HOST}dailys/daily/${ID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            },
            body: JSON.stringify({
                "yesterday": daily.Yesterday,
                "today": daily.Today,
                "impediment": daily.Impediment,
                "date": daily.Date
            })
        });
    }
    ;
    listDate(date) {
        let year = JSON.stringify(date.getFullYear());
        let month = JSON.stringify(date.getMonth() + 1);
        let day = JSON.stringify(date.getDate());
        if (month.length < 2)
            month = `0` + month;
        if (day.length < 2)
            day = `0` + day;
        let fullDate = `${year}-${month}-${day}`;
        return fetch(`${HOST}dailys/daily/${fullDate}/1`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
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
}
