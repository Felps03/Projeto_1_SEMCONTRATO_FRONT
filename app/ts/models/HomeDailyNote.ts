export class HomeDailyNote {

    private author: string;
    private yesterday: string;
    private today: string;
    private impediment: string;

    constructor(author: string, yesterday: string, today: string, impediment: string) {

        this.author = author;
        this.yesterday = yesterday;
        this.today = today;
        this.impediment = impediment;
    }

    get Author() {
        return this.author;
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
}