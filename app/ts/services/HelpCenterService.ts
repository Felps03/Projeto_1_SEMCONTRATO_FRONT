import { HOST } from "../config/index";

export class HelpCenterService {
    add(title: string, desc: string) {
        fetch(`${HOST}help/post`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: `{
                "title": ${title},
                "desc": ${desc},
                "user_id": ${localStorage.getItem('id')}
            }`
        })
            .then(res => res.json())
            .then(console.log)
            .catch(console.log);
    }

    list() {
        return new Promise((resolve, reject) => {
            fetch(`${HOST}helps/post`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        })
    }
}