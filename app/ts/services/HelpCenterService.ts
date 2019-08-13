import { HOST } from "../config/index";
import { Post } from "../models/Post";

export class HelpCenterService {

    add(post: Post) {
        // the author will always be the logged user
        return fetch(`${HOST}helps/post/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            },
            body: JSON.stringify({
                "title": post.Title,
                "desc": post.Desc,
                "id_user": localStorage.getItem('id')
            })
        });
    };

    update(post: Post, ID: string) {
        return fetch(`${HOST}helps/post/${ID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            },
            body: JSON.stringify({
                "id_user": localStorage.getItem('id'),
                "title": post.Title,
                "desc": post.Desc
            })
        });
    };

    list(page: number, ID: string) {
        let url;
        if (!ID) {
            url = `${HOST}helps/list/post/${page}`;
        }
        else {
            url = `${HOST}helps/answer/${ID}/${page}`;
        }

        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            }
        })
    }

    //FIXME
    listLastHelp() {
        return fetch(`${HOST}helps/last`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            }
        })
    }

    remove(ID: string) {
        return fetch(`${HOST}helps/post/${ID}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            }
        })
    }

    findByJoker(joker: string, page: number) {
        return fetch(`${HOST}helps/list/joker/${page}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            },
            body: JSON.stringify({
                "joker": joker
            })
        });
    }

    listByID(ID: string) {
        return fetch(`${HOST}helps/list/${ID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
                'id_user': localStorage.getItem('id')
            }
        })
    }

    // listQuestionAndAnswer(ID: string, page: number) {

    //     return fetch(`${HOST}helps/answer/${ID}/${page}`, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('tkn')}`,
    //             'id_user': localStorage.getItem('id')
    //         }
    //     })
    // }



    // findByDesc(desc: string) {
    //     return fetch(`${HOST}helps/post/desc/1`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('tkn')}`
    //         },
    //         body: JSON.stringify({
    //             "desc": desc
    //         })
    //     });
    // }
}