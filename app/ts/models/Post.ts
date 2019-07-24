import { User } from "./index";

export class Post {
    constructor(
        private title: string,
        private desc: string,
        private authorId?: string,
        private authorName?: string,
        private date?: Date,
        private id?: string
    ) { }

    get Title() {
        return this.title
    }

    get Desc() {
        return this.desc
    }

    get AuthorId() {
        return this.authorId
    }

    get AuthorName() {
        return this.authorName
    }

    get Date() {
        let hoje = new Date(this.date);
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };       
        return  hoje.toLocaleDateString('pt-BR', options)
    }

    get Id() {
        return this.id
    }
}