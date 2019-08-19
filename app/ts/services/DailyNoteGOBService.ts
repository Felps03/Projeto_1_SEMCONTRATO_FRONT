import { DailyNote } from '../models/index';
import { GOB_HOST } from '../config/index';
import { today } from '../validation/dailyNoteValidate';
import {dateGOB} from '../utils/dateGOB'

export class DailyNoteGOBService{
    list(date: string) {
        return fetch(`${GOB_HOST}daily/data`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "filtro": dateGOB(date)
            })
        })
    }
}