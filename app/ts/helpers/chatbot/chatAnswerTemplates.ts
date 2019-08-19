import { PostsView } from "../../views/PostsView";
import { PostView } from "../../views/PostView";
import { PaginationView } from "../../views/PaginationView";
import { Posts } from "../../models/Posts";


// data-value in case we need to differentiate it from the textContent at some point
export const button = (text: string) =>
    // `<button type="button" class="btn btn-sm m-1 bg-thrid" data-value="${text}">${text}</button>`
    `<button type="button" class="btn btn-sm btn-outline-warning float-right m-1 input-circle" data-value="${text}">${text}</button>`

export const options = (...content: string[]) => {
    let html = '\n<div class="chatbot-options d-flex flex-row mt-1">'

    content.forEach(option => {
        html += button(option)
    })

    html += '</div>'

    return html
}

export const link = (text: string, href: string) =>
    `<a href="${href}" target="_blank">${text}</a>`

export const placeholder = (id: string) =>
    `<div id=${id}></div>`

// export const helpView = async (id: string, model: string) => {
//     setTimeout(() => {
//         const postsView = new PostsView('#' + id)
//         const parsedModel = JSON.parse(model)

//         const posts = Posts.from(parsedModel.slice(0, -1));
//         postsView.update(posts)

//     }, 0)
// }

export const helpView = (id: string, model: string) => {
    // deferring
    setTimeout(() => {
        const postsView = new PostsView('#' + id)
        const parsedModel = JSON.parse(model)

        const posts = Posts.from(parsedModel.slice(0, -1));
        // postsView.update(posts)

        // ad-hoc
        const chatBotHistory = document.getElementById('chatbot-history')
        chatBotHistory.scrollTo(0, chatBotHistory.scrollHeight)
    }, 0)
    return `<div id=${id}></div>`
}