import { InputWrapper } from "../utils/InputWrapper";
export function validate(inputEl, fn, ...opts) {
    const input = new InputWrapper(inputEl);
    const handle = function () {
        const msg = fn(input, ...opts);
        if (msg) {
            input.setValid(false, msg);
            return false;
        }
        input.setValid(true, '');
        return true;
    };
    input.el.addEventListener('input', handle);
    return handle;
}
