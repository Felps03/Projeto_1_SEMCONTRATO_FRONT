export class Post {
    constructor(title, desc, author, date) {
        this.title = title;
        this.desc = desc;
        this.author = author;
        this.date = date;
    }
    get Title() {
        return this.title;
    }
    get Desc() {
        return this.desc;
    }
    get Author() {
        return this.author;
    }
    get Date() {
        return this.date;
    }
}
