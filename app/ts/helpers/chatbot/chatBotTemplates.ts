export const button = (text: string, value: string) => `
<button type="button" class="btn btn-primary btn-sm m-1" data-value="${value}">${text}</button>
`

export const options = (content: { [text: string]: string }) => {
    let html = '\n<div class="chatbot-options d-flex flex-row mt-1">'

    for (const key in content) {
        html += button(key, content[key])
    }

    html += '</div>'

    return html
}