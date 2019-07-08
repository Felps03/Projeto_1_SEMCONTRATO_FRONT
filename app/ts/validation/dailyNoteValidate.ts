import { InputWrapper } from '../utils/index'

export function yesterday(first: InputWrapper): string | null {
    if (!(first.value.length > 0)) {
        return 'Descrição muito pequena.'
    }else {
        return null
    }
}

export function today(today: InputWrapper): string | null {
    if (!(today.value.length > 0)) {
        return 'Descrição muito pequena.'
    }else {
        return null
    }
}

export function impediment(third: InputWrapper): string | null {
    if (!(third.value.length > 0)) {
        return 'Descrição muito pequena.'
    }else {
        return null
    }

}
