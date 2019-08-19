export class DailyNoteGOB {

    constructor(private photo: string, private user: string, private date: Date, private yesterday: string, private today: string, private impediment: string, private id?: string) {}

    get Photo() {
        return this.photo;
    }

    get User() {
        return this.user;
    }

    get Date() {
        return this.date;
    }

    get Yesterday() {
        return this.yesterday;
    }

    get Today(){
        return this.today;
    }

    get Impediment(){
        return this.impediment;
    }
    
    get Id(){
        return this.id;
    }
}