export function noFalse(fns: (() => boolean)[]): boolean {
    let isValid = true

    fns.forEach(fn => {
        if (!fn()) {
            isValid = false
        }
    })

    return isValid
}