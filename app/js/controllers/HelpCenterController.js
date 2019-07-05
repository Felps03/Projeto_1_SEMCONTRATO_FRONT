import { HelpCenterService, UserService } from '../services/index';
import { PostsView } from '../views/PostsView';
export class DailyNoteController {
    constructor() {
        this.searchTitle = document.getElementById('search-title');
        this.searchDesc = document.getElementById('search-desc');
        this.addTitle = document.getElementById('add-title');
        this.addDesc = document.getElementById('add-desc');
        this.postsView = new PostsView('#post-list');
    }
    add(event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterService();
        helpCenterService.add(this.addTitle.value, this.addDesc.value);
    }
    list(event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterService();
        helpCenterService.list()
            .then(res => {
            const userService = new UserService();
        });
    }
}
