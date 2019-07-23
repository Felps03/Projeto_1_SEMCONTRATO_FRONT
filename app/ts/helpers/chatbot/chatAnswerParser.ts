import * as templates from './chatAnswerTemplates'

const TEMPLATES: { [key: string]: Function } = {
    button: templates.button,
    options: templates.options,
    link: templates.link
}

// parse e.g. $list_daily_note_date to e.g. 2019-7-19
export function parseState(state: Map<string, string>, raw: string) {
    let response = raw
    response = response
        .replace(/([^\\])\$(\w+)/, (match: string, p1: string, p2: string) => {
            console.log(match, p1, p2)
            console.log(state)
            console.log(p1 + state.get(p2))
            return p1 + state.get(p2)
        })
        .replace('\\$', '$')
    return response
}

export function parseView(raw: string) {
    let response = raw
    const matches = raw.match(/{{[^}}]*}}/g)

    if (!matches) return response

    matches.forEach(match => {
        const call = match.replace(/^{{\s*/, '').replace(/\s*}}$/, '')
        const template = call.replace(/\s*\(.*\)/, '')

        if (TEMPLATES[template]) {
            const args = call
                .replace(template, '')
                .replace(/^\(/, '')
                .replace(/\)$/, '')
                // https://stackoverflow.com/a/7330150
                .replace(/([^\\]),/g, '$1\u000B')
                .split('\u000B')
                .map(arg => arg.trim().replace('\\,', ','))

            response = response.replace(match, TEMPLATES[template](...args))
        }
    })

    return response
}
