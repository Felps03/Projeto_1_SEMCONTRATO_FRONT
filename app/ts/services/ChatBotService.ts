import { DailyNote } from '../models/index';
import { HOST } from '../config/index';
import { today } from '../validation/dailyNoteValidate';

export class ChatBotService {

    used() {
        return fetch(`${HOST}score/usechatbot/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            }
        })
    }

    feedback(good: boolean, action: string) {
        return fetch(`${HOST}score/rating/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            },
            body: JSON.stringify({
                evaluation: good,
                action
            })
        })
    }

}