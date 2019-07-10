import { HelpCenterAskService } from '../services/index';
import { PostAsk } from '../models/PostAsk';
export class HelpCenterAscController {
    add(event) {
        event.preventDefault();
        const postAsk = new PostAsk("teste", "teste", "teste");
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.add(postAsk)
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
        const postAsk = new PostAsk("teste", "teste", "teste");
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.update(postAsk, '1')
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
        const helpCenterService = new HelpCenterAskService();
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
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.remove('id')
            .then(result => {
            return result.json();
        }).then(res => {
            console.log(res);
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
            console.log(res);
        })
            .catch(error => {
            console.error(error);
        });
    }
}
