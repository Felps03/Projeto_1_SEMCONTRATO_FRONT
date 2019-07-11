import { DailyNote } from '../models/index';
import { HOST } from '../config/index';

export class DailyNoteService {
    add(yesterday: string, today: string, impediment: string, date: Date) {
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
            .then(res => {
                if (res.status == 200) {
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
        console.log(`${HOST}dailys/daily/${data}/1`);
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

}