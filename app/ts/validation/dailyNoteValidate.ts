import { InputWrapper } from '../utils/index'

export function yesterday(first: InputWrapper): string | null {
    if (!(first.value.trim().length > 3)) {
        return 'Descrição muito pequena.'
    } else {
        return null
    }
}

export function today(today: InputWrapper): string | null {
    if (!(today.value.trim().length > 3)) {
        return 'Descrição muito pequena.'
    } else {
        return null
    }
}

export function impediment(third: InputWrapper): string | null {
    if (!(third.value.trim().length > 3)) {
        return 'Descrição muito pequena.'
    } else {
        return null
    }

}
