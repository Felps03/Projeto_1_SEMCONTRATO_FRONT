import { InputWrapper } from '../utils/index'

export function yesterday(first: InputWrapper): string | null {
    if (!(first.value.length > 3)) {
        return 'Descrição muito pequena.'
    } else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.|\s)+$/.test(first.value)) {
        return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".'
    } else {
        return null
    }
}

export function today(today: InputWrapper): string | null {
    if (!(today.value.length > 3)) {
        return 'Descrição muito pequena.'
    } else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.|\s)+$/.test(today.value)) {
        return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".'
    } else {
        return null
    }
}

export function impediment(third: InputWrapper): string | null {
    if (!(third.value.length > 3)) {
        return 'Descrição muito pequena.'
    } else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.|\s)+$/.test(third.value)) {
        return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".'
    } else {
        return null
    }

}
