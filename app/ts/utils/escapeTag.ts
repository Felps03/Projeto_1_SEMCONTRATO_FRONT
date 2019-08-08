export function escapeTag(txt: string) {
    return txt.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}