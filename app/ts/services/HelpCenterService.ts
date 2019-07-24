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

    list(page: number) {
        return fetch(`${HOST}helps/list/post/${page}`, {
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
        return fetch(`${HOST}helps/list/post/1`, {
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

    findByJoker(joker: string) {
        return fetch(`${HOST}helps/post/joker/1`, {
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