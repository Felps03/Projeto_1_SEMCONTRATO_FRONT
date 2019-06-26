import { DailyNote, DailyNoteParcial } from '../models/index';
export class DailyNoteService {

    obterDailyNotes(handler: HandlerFunction): Promise<DailyNote[]> {

        //TODO VAI AJAX
    }
}

export interface HandlerFunction {

    (res: Response): Response
}