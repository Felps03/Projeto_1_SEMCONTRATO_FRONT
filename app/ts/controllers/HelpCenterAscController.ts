
import { HelpCenterAskService } from '../services/index';
import { PostAsk } from '../models/PostAsk';

export class HelpCenterAscController {
    add(event: Event) {
        event.preventDefault();

        const postAsk = new PostAsk("teste", "teste", "teste"); 
            
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.add(postAsk)
        .then(result => {
            return result.json()
        }).then(res => {
            console.table(res);
            // $('#add-modal').modal('hide');
        })
        .catch(error => {
            console.error(error)
        })
    }

    
    update(event: Event) {
        event.preventDefault();

        const postAsk = new PostAsk("teste", "teste", "teste");             
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.update(postAsk, '1')
        .then(result => {
            return result.json()
        }).then(res => {
            console.table(res);
            // $('#add-modal').modal('hide');
        })
        .catch(error => {
            console.error(error)
        })
    }

    list(event: Event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.list()
        .then(result => {
            return result.json()
        }).then(res => {
            console.log(res);
        })
        .catch(error => {
            console.error(error)
        })
    }

    delete(event: Event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.remove('id')
        .then(result => {
            return result.json()
        }).then(res => {
            console.log(res);
        })
        .catch(error => {
            console.error(error)
        });
    }

    findByID(event: Event) {
        event.preventDefault();
        const helpCenterService = new HelpCenterAskService();
        helpCenterService.findById('title')
        .then(result => {
            return result.json()
        }).then(res => {
            console.log(res);
        })
        .catch(error => {
            console.error(error)
        });
    } 
}