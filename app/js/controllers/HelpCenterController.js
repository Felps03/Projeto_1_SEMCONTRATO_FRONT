import { Post } from '../models/index';
import { HelpCenterService } from '../services/index';
export class HelpCenterController {
    constructor() {
        this.searchTitle = document.getElementById('search-title');
        this.searchDesc = document.getElementById('search-desc');
        this.addTitle = document.getElementById('add-title');
        this.addDesc = document.getElementById('add-desc');
    }
    add(event) {
        event.preventDefault();
        let idUser = localStorage.getItem('id') || "";
        const post = new Post(this.addTitle.value.toString(), this.addDesc.value.toString(), idUser);
        const helpCenterService = new HelpCenterService();
        helpCenterService.add(post)
            .then(result => {
            return result.json();
        }).then(res => {
            console.table(res);
        })
            .catch(error => {
            console.error(error);
        });
    }
    update(event) {
        event.preventDefault();
        let idUser = localStorage.getItem('id') || "";
        let ID_POST = "VAI O ID DO POST";
        const post = new Post(this.addTitle.value.toString(), this.addDesc.value.toString(), idUser);
        const helpCenterService = new HelpCenterService();
        helpCenterService.update(post, ID_POST)
            .then(result => {
            return result.json();
        }).then(res => {
            console.table(res);
        })
            .catch(error => {
            console.error(error);
        });
    }
    list(event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterService();
        helpCenterService.list()
            .then(result => {
            return result.json();
        }).then(res => {
            console.log(res);
        })
            .catch(error => {
            console.error(error);
        });
    }
    delete(event) {
        event.preventDefault();
        let id = "esta função esta ok";
        const helpCenterService = new HelpCenterService();
        helpCenterService.remove(id)
            .then(result => {
            return result.json();
        }).then(res => {
            console.log(res);
        })
            .catch(error => {
            console.error(error);
        });
    }
    findByTitle(event) {
        event.preventDefault();
        let title = "esta função esta ok";
        const helpCenterService = new HelpCenterService();
        helpCenterService.findByTitle(title)
            .then(result => {
            return result.json();
        }).then(res => {
            console.log(res);
        })
            .catch(error => {
            console.error(error);
        });
    }
    findByDesc(event) {
        event.preventDefault();
        let desc = "esta função esta ok";
        const helpCenterService = new HelpCenterService();
        helpCenterService.findByDesc(desc)
            .then(result => {
            return result.json();
        }).then(res => {
            console.log(res);
        })
            .catch(error => {
            console.error(error);
        });
    }
}
