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
            }})
            .then(res => {
            if (res.status == 200) {
                console.log("funcionou");
            }
        })
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
    
    // listDate(date) {
    //     return fetch(`${HOST}dailys/daily/${date}`, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('tkn')}`
    //         }
    //     });
    // }
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
