import { HelpCenterAskService } from '../services/index';
import { PostAsk } from '../models/PostAsk';
import { PostAsksView } from "../views/PostAsksView";
import { PostAsks } from '../models/index';
export class HelpCenterAskController {
    constructor() {
        this.postAsksView = new PostAsksView('#post-ask-list');
        this.addComment = document.getElementById('comment');
        const addForm = document.getElementById('comment-form');
        if (addForm)
            addForm.addEventListener('submit', this.add.bind(this));
        this.postAsksView.childrenDidMount((postAsk) => {
            const editForm = document.getElementById(`comment-edit-form-${postAsk.Id}`);
            const deleteBtn = document.getElementById(`comment-del-${postAsk.Id}`);
            if (editForm) {
                editForm.addEventListener('submit', this.update.bind(this, postAsk.Id));
            }
            if (deleteBtn) {
                deleteBtn.addEventListener('click', this.delete.bind(this, postAsk.Id));
            }
        });
    }
    add(event) {
        event.preventDefault();
        const postIdField = document.getElementById('post-meta');
        if (!(postIdField)) {
            return;
        }
        const ID_POST = postIdField.getAttribute('data-id');
        if (!ID_POST) {
            return;
        }
        const postAsk = new PostAsk(ID_POST, this.addComment.value, localStorage.getItem('id') || '');
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.add(postAsk)
            .then(result => {
            return result.json();
        }).then(res => {
            this.listByPost(event);
        })
            .catch(error => {
            console.error(error);
        });
    }
    update(id, event) {
        event.preventDefault();
        const postIdField = document.getElementById('post-meta');
        const textareaEl = document.querySelector(`#comment-edit-form-${id} textarea`);
        if (!textareaEl) {
            return;
        }
        if (!(postIdField)) {
            return;
        }
        const ID_POST = postIdField.getAttribute('data-id');
        if (!ID_POST) {
            return;
        }
        const postAsk = new PostAsk(ID_POST, textareaEl.value, localStorage.getItem('id') || '', id);
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.update(postAsk, id)
            .then(result => {
            return result.json();
        }).then(res => {
            this.listByPost(event);
        })
            .catch(error => {
            console.error(error);
        });
    }
    list(event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.list(1)
            .then(result => {
            return result.json();
        }).then(res => {
        })
            .catch(error => {
            console.error(error);
        });
    }
    listByPost(event) {
        event.preventDefault();
        const postIdField = document.getElementById('post-meta');
        if (!(postIdField)) {
            return;
        }
        const ID_POST = postIdField.getAttribute('data-id');
        if (!ID_POST) {
            return;
        }
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.list(1)
            .then(result => {
            return result.json();
        }).then(res => {
            this.postAsksView.update(PostAsks.from(res.filter((ask) => ask['id_helpCenter'] === ID_POST)));
        })
            .catch(error => {
            console.error(error);
        });
    }
    delete(id, event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.remove(id)
            .then(result => {
            return result.json();
        }).then(res => {
            this.listByPost(event);
        })
            .catch(error => {
            console.error(error);
        });
    }
    findByID(event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.findById('title')
            .then(result => {
            return result.json();
        }).then(res => {
        })
            .catch(error => {
            console.error(error);
        });
    }
}
