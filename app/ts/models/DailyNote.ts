export class DailyNote {

    // private yesterday: string;
    // private today: string;
    // private impediment: string;
    // private date: Date;
    // private id?: string

    constructor(private yesterday: string, private today: string, private date: Date, private impediment?: string, private id?: string) { }

    get Yesterday() {
        return this.yesterday;
    }
    get Today() {
        return this.today;
    }
    get Impediment() {
        return this.impediment;
    }
    get Date() {
        return this.date;
    }

    get Id() {
        return this.id
    }

}