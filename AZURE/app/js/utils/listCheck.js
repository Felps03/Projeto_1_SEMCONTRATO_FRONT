export function noFalse(fns) {
    let isValid = true;
    fns.forEach(fn => {
        if (!fn()) {
            isValid = false;
        }
    });
    return isValid;
}
