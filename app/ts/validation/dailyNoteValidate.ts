import { InputWrapper } from '../utils/index'

export function yesterday(first: InputWrapper): string | null {
    if (!(first.value.trim().length > 3)) {
        return 'Descrição muito pequena.'
    }
    else if (!first.value.toString().match('([A-ZÀ-Úa-zà-ú])')) {
        return 'Não pode só numeros.'
    }
    else {
        return null
    }
}

export function today(today: InputWrapper): string | null {
    if (!(today.value.trim().length > 3)) {
        return 'Descrição muito pequena.'
    }
    else if (!today.value.toString().match('([A-ZÀ-Úa-zà-ú])')) {
        return 'Não pode só numeros.'
    }
    else {
        return null
    }
}

export function impediment(third: InputWrapper): string | null {
    if (!(third.value.trim().length > 3)) {
        return 'Descrição muito pequena.'
    }
    else if (!third.value.toString().match('([A-ZÀ-Úa-zà-ú])')) {
        return 'Não pode só numeros.'
    }
    else {
        return null
    }
}
