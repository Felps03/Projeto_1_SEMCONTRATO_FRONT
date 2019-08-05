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
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
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
        return fetch(`${HOST}dailys/daily/${ID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                // 'id_user': localStorage.getItem('id')
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
        return fetch(`${HOST}dailys/list/${data}/${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            }
        })
    }

    listUser(username: string, page: number) {
        return fetch(`${HOST}dailys/list/user/${username}/${page}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('tkn')}`,
                id_user: localStorage.getItem('id')
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
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            }
        })
    }

    listDailyById(id: string) {
        return fetch(`${HOST}dailys/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            }
        })
    }

    registeredDaily(id: string) {
        return fetch(`${HOST}dailys/user/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            }
        })
    }

}