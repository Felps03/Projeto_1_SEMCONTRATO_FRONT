export class Post {
    constructor(title, desc, authorId, authorName, id) {
        this.title = title;
        this.desc = desc;
        this.authorId = authorId;
        this.authorName = authorName;
        this.id = id;
    }
    get Title() {
        return this.title;
    }
    get Desc() {
        return this.desc;
    }
    get AuthorId() {
        return this.authorId;
    }
    get AuthorName() {
        return this.authorName;
    }
    get Id() {
        return this.id;
    }
}
