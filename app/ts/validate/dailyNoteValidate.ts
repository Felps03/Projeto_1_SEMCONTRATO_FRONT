import { InputWrapper } from '../app/ts/validate/index'

export function yesterday(first: InputWrapper): string {
    if (!(first.value.length > 3)) {
        return 'Descrição muito pequena.'
    } else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(first.value)) {
        return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".'
    }

    return null
}

export function today(today: InputWrapper): string {
    if (!(today.value.length > 3)) {
        return 'Descrição muito pequena.'
    } else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(today.value)) {
        return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".'
    }

    return null
}

export function impediment(third: InputWrapper): string {
    if (!(third.value.length > 3)) {
        return 'Descrição muito pequena.'
    } else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(third.value)) {
        return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".'
    }

    return null
}