import { InputWrapper } from '../utils/index';
import { DailyNotes } from '../models/DailyNotes';
import { DailyNoteGOB } from '../models/DailyNoteGOB';
import { DailyNotesGOB } from '../models/DailyNotesGOB';
import { RegisteredDaylies } from '../models/RegisteredDaylies';
import { RegisteredDaily } from '../models/RegisteredDaily';
import { DailyNoteGOBService } from '../services/DailyNoteGOBService';
import { DailyStatusView } from '../views/DailyStatusView';
import { DailyNotesGOBView } from '../views/DailyNotesGobView'
import { dateFormatYYYYMMDD } from '../helpers/dateHelper';
import { checkLoggedIn } from '../helpers/chatbot/chatBotProcess';

export class DailyNoteGOBController {

    private yesterday: HTMLInputElement;
    private today: HTMLInputElement;
    private impediment: HTMLInputElement;
    private date: HTMLInputElement;
    private dayliesResult: HTMLInputElement;
    private listDate: HTMLInputElement;
    private dateField: HTMLInputElement;
    private id_daily: string;
    private url = new URLSearchParams(location.search);
    private url_date = this.url.get('date');
    private url_page = this.url.get('page');
    private url_user = this.url.get('user');
    private dailyView: DailyNotesGOBView;


    constructor(totalPages: number = 1){
        this.dateField = <HTMLInputElement>document.querySelector('#date_filter');
        this.listDate = <HTMLInputElement>document.querySelector('#filter');
    }
   
    showAllDailys() {
        if (this.url.get('date') && this.url.get('page')) this.listD(event);
        let date = new Date();
        let today = dateFormatYYYYMMDD(new Date());

        this.dateField.value = this.url_date || today;

        this.listD(event);
    }

    listD(event: Event) {
        event.preventDefault();

        let value = this.dateField.value;

        let dailyNoteGOBService = new DailyNoteGOBService();

        let fullDate = dateFormatYYYYMMDD(new Date)
        
        fullDate = this.dateField.value ;

        this.dateField.value = this.url_date || fullDate;

        
        return dailyNoteGOBService.list(fullDate)
            .then(res => {
                return res.json();
            })
            .then(result => {
                this.dailyView = new DailyNotesGOBView('#dayliesResult');
                let dailyNotesGOB = new DailyNotesGOB();

                result.reverse().forEach((result: any) => {
                    let dailyNoteGOB = new DailyNoteGOB(result['imagem'], result['usuario'], result['data'], result.corpo['ontem'], result.corpo['hoje'], result.corpo['impedimento'])
                    dailyNotesGOB.add(dailyNoteGOB)
                })
                this.dailyView.update(dailyNotesGOB);

                return result
            });
    };
}