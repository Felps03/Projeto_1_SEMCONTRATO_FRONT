import { InputWrapper } from "../utils/InputWrapper";

export function validate(inputEl: HTMLInputElement, fn: (input: InputWrapper, ...opts: any[]) => string | null, ...opts: any[]): () => boolean {

    const input = new InputWrapper(inputEl)

    const handle = function () {
        const msg = fn(input, ...opts)

        if (msg) {
            input.setValid(false, msg)

            return false
        }

        input.setValid(true, '')
        return true
    }

    input.el.addEventListener('input', handle)

    return handle
}

export function clean(inputEl: HTMLInputElement) {
    inputEl.value = '';
    inputEl.classList.remove('is-valid');
    inputEl.classList.remove('is-invalid');
}