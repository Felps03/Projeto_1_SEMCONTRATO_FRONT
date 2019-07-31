export class RegisteredDaily {

    private id_daily: string;
    private id_user: string;
    private yesterday: string;
    private today: string;
    private impediment: string;
    private date: Date;
    private owner: string;

    constructor(id_daily: string, id_user: string, yesterday: string, today: string, impediment: string, date: Date, owner: string) {
        this.id_daily = id_daily;
        this.id_user = id_user;
        this.yesterday = yesterday;
        this.today = today;
        this.impediment = impediment;
        this.date = new Date(date);
        this.owner = owner;
    }

    get Id_daily() {
        return this.id_daily;
    }

    get Id_user() {
        return this.id_user;
    }

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

    get Owner() {
        return this.owner;
    }
}