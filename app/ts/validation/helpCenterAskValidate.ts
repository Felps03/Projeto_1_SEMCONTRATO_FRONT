import { InputWrapper } from '../utils/index'

export function comment(comment: InputWrapper): string | null {
    if (!(comment.value.trim().length > 3)) {
        return 'Resposta muito curta.'
    } else {
        return null
    }
}