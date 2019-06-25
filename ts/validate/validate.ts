import { InputWrapper } from "./InputWrapper";

export function validate(input: InputWrapper, fn: (input: InputWrapper, ...opts: any) => string, ...opts: any): () => boolean {

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