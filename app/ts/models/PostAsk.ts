import { User } from "./index";

export class PostAsk {
    constructor(
        private id_helpCenter: string,
        private desc: string,
        private id_user: string,
        private authorName?: string,
        private id?: string,
        private date?: Date
        
    ) { }

    get helpCenter() {
        return this.id_helpCenter
    }

    get Desc() {
        return this.desc
    }

    get Author() {
        return this.id_user
    }

    get Id() {
        return this.id
    }

    get AuthorName() {
        return this.authorName
    }

    get Id_user(){
        return this.id_user
    }

    get Date() {
        let hoje = new Date(this.date);
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };       
        return  hoje.toLocaleDateString('pt-BR', options)
    }

}