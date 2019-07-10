import { InputWrapper } from '../utils/index'

export function title(title: InputWrapper): string | null {
    if (!(title.value.trim().length > 3)) {
        return 'Título muito pequeno.'
    } else {
        return null
    }
}

export function desc(desc: InputWrapper): string | null {
    if (!(desc.value.trim().length > 3)) {
        return 'Descrição muito pequena.'
    } else {
        return null
    }
}