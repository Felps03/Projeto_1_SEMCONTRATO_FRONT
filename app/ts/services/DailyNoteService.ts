import { DailyNote } from '../models/index';
import { HOST } from '../config/index';

export class DailyNoteService {
    add(yesterday: string, today: string, impediment: string, date: Date) {
        fetch(`${HOST}dailys/daily`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${localStorage.getItem('tkn')}`
            },
            body: JSON.stringify({
                "yesterday": yesterday, 
                "today": today, 
                "impediment": impediment, 
                "email" : localStorage.getItem('email')
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.status == 200){
                    console.log("funcionou");
                }
            })
            //.then(res => console.log(res));
    }

    /**
     * 
     * @param id para alterar dados do usuário dessa id
     */
   
     update(daily: DailyNote, ID: string) {
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
    };

    /**
     * 
     * @param data para buscar a daily da data informada
     */
    listDate(date: Date) {
        return fetch(`${HOST}dailys/daily/${date}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
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
}