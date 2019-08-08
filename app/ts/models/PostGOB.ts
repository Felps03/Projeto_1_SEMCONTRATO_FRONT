import { User } from "./index";

export class PostGOB {
    constructor(
        // titulo
        private title: string,
        // corpo
        private desc: string,
        // username
        private authorName?: string,
        // data (ALREADY FORMATTED)
        private date?: string,
        // photo url tail
        private photo?: string,
        // numeroLikes
        private likes?: number,
        // tags
        private tags?: string,
        // resolvido
        private solved?: boolean,
        // _id
        private id?: string
    ) { }

    get Title() {
        return this.title
    }

    get Desc() {
        return this.desc
    }

    get AuthorName() {
        return this.authorName
    }

    get Date() {
        return this.date
    }

    get Photo() {
        return this.photo
    }

    get Likes() {
        return this.likes
    }

    get Tags() {
        return this.tags
    }

    get Solved() {
        return this.solved
    }

    get Id() {
        return this.id
    }
}