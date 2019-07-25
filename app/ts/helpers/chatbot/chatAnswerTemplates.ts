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

export const view = (view: string, model: string) => { }