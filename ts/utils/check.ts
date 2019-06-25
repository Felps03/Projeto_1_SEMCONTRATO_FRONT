export function any(fns: (() => boolean)[]): boolean {
    fns.forEach(fn => {
        if (fn()) {
            return true
        }
    })

    return false
}

export function noFalse(fns: (() => boolean)[]): boolean {
    let isValid = true

    fns.forEach(fn => {
        if (!fn()) {
            isValid = false
        }
    })

    return isValid
}