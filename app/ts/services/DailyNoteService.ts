import { DailyNote } from '../models/index';
import { HOST } from '../config/index';
import { today } from '../validation/dailyNoteValidate';

export class DailyNoteService {
    add(yesterday: string, today: string, impediment: string, date: Date) {
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
        })
    }

    /**
     * 
     * @param id para alterar dados do usuário dessa id
     */

    update(daily: DailyNote, ID: string) {
        console.log(ID)
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
    };

    /**
     * 
     * @param date para buscar a daily da data informada
     */
    listDate(data: string, page: number) {
        //console.log(`${HOST}dailys/daily/${data}/1`);
        return fetch(`${HOST}dailys/daily/${data}/1`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`
            }
        })
    }

    /**
     * 
     * listar todas as dailys
     */
    listAll() {
        return fetch(`${HOST}dailys`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        })
    }

    listDailyById(id: string) {
        return fetch(`${HOST}dailys/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`
            }
        })
    }

    registeredDaily(id: string) {
    
        // let year = `${new Date().getFullYear()}`;
        // let month = `${new Date().getMonth()+1}`;
        // let day = `${new Date().getDate()}`;

        // if (month.length < 2 ) month = "0" + month;
        // if (day.length < 2 ) day = "0" + day;

        // let today = `${year}-${month}-${day}`
        // console.log(`${HOST}/dailys/user/${id}`)
        return fetch(`${HOST}dailys/user/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`
            }
        })
    }

}