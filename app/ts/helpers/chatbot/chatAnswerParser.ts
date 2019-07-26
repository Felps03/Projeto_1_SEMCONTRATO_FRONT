import * as templates from './chatAnswerTemplates'

const TEMPLATES: { [key: string]: Function } = {
    button: templates.button,
    options: templates.options,
    link: templates.link,
    placeholder: templates.placeholder,
    helpView: templates.helpView
}

// parse e.g. $list_daily_note_date to e.g. 2019-07-19
export function parseState(state: Map<string, any>, raw: string) {
    let response = raw
    response = response
        .replace(/([^\\])\$(\w+)/g, (match: string, p1: string, p2: string) => {
            const stateItem = state.get(p2)
            return p1 + (typeof stateItem === 'string' ? stateItem : JSON.stringify(stateItem).replace(/,/g, '\\,'))
        })
        .replace(/\\$/g, '$')
    return response
}

export function parseView(raw: string) {
    let response = raw
    const matches = raw.match(/{{(.*?)}}/g)

    if (!matches) return response

    matches.forEach(match => {
        const call = /{{(.*?)}}/.exec(match)[1]
        const template = call.replace(/\s*\(.*\)/, '')

        if (TEMPLATES[template]) {
            const args = /\((.*)\)/.exec(call.replace(template, ''))[1]
                // https://stackoverflow.com/a/7330150
                .replace(/([^\\]),/g, '$1\u000B')
                .split('\u000B')
                .map(arg => arg.trim().replace(/\\,/g, ','))

            response = response.replace(match, TEMPLATES[template](...args))
        }
    })

    return response
}

// export function parseView(raw: string) {
//     let response = raw
//     const matches = raw.match(/{{[^}}]*}}/g)

//     if (!matches) return response

//     matches.forEach(match => {
//         const call = match.replace(/^{{\s*/, '').replace(/\s*}}$/, '')
//         const template = call.replace(/\s*\(.*\)/, '')

//         if (TEMPLATES[template]) {
//             const args = call
//                 .replace(template, '')
//                 .replace(/^\(/, '')
//                 .replace(/\)$/, '')
//                 // https://stackoverflow.com/a/7330150
//                 .replace(/([^\\]),/g, '$1\u000B')
//                 .split('\u000B')
//                 .map(arg => arg.trim().replace('\\,', ','))

//             response = response.replace(match, TEMPLATES[template](...args))
//         }
//     })

//     return response
// }