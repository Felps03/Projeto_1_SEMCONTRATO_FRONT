import { HOST } from '../config/index';

export class ConfigurationService {
     listAll() {
        return fetch(`${HOST}configuration`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`
            }
        })
    }
}