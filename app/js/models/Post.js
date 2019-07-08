export class Post {
    constructor(title, desc, author) {
        this.title = title;
        this.desc = desc;
        this.author = author;
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
}
