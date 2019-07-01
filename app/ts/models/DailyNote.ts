export class DailyNote {

    private yesterday: string;
    private today: string;
    private impediment: string;
    private date: Date;

    constructor( yesterday: string,  today: string,  impediment: string,  date: Date) {

        this.yesterday = yesterday;
        this.today = today;
        this.impediment = impediment;
        this.date = date;

    }

    get Yesterday(){
        return this.yesterday;
    }
    get Today(){
        return this.today;
    }
    get Impediment(){
        return this.impediment;
    }
    get Date(){
        return this.date;
    }

}