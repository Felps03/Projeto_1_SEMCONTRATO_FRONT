import { InputWrapper } from './validate/index'

export function date(date: InputWrapper): string {
    const inputDate = new Date(date.value)

    const day = inputDate.getDate()
    const month = inputDate.getMonth()
    const year = inputDate.getFullYear()

    let isDate = true

    if (isNaN(day) || isNaN(month) || isNaN(year)) isDate = false
    if (month + 1 == 4 || month + 1 == 6 || month + 1 == 9 || month + 1 == 11 && day + 1 > 30) isDate = false
    if ((year % 4) != 0 && month + 1 == 2 && day + 1 > 28) isDate = false
    if ((year % 4) == 0 && month + 1 == 2 && day + 1 > 29) isDate = false

    if (!isDate) {
        return 'Data inválida.'
    }

    if (inputDate > new Date()) {
        return 'Obrigatório já ter nascido.'
    }

    return null
}

export function email(email: InputWrapper): string {
    if (!email.value) {
        return 'Email vazio.'
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9_-])+(\.([a-zA-Z0-9_-])+)+$/.test(email.value)) {
        return 'Email inválido. Exemplo: abc123@def.gh'
    }
}

export function lastName(lastName: InputWrapper): string {
    if (!(lastName.value.length > 2)) {
        return 'Sobrenome muito curto.'
    } else if (!/[A-Z]([a-z]|\s)+$/.test(lastName.value)) {
        return 'Sobrenome inválido: Use uma letra maiúscula seguida de letras minúsculas.'
    } else if (/\s\s/.test(lastName.value)) {
        return 'Sobrenome inválido: Dois ou mais espaços consecutivos.'
    } else if (/\s[A-z]\s/.test(lastName.value)) {
        return 'Sobrenome inválido: Caracter solitário :(.'
    }

    return null
}

export function name(name: InputWrapper): string {
    if (!(name.value.length > 2)) {
        return 'Nome muito curto.'
    } else if (!/[A-Z]([a-z]|\s)+$/.test(name.value)) {
        return 'Nome inválido: Use uma letra maiúscula seguida de letras minúsculas.'
    } else if (/\s\s/.test(name.value)) {
        return 'Nome inválido: Dois ou mais espaços consecutivos.'
    } else if (/\s[A-z]\s/.test(name.value)) {
        return 'Nome inválido: Caracter solitário :(.'
    }

    return null
}

export function password(pw: InputWrapper): string {
    if (pw.value.length < 6 || pw.value.length > 8) {
        return 'Senha deve ter tamanho entre 6 e 8 dígitos.'
    } else if (pw.value.indexOf(' ') !== -1) {
        return 'Senha não pode conter espaços.'
    }

    return null
}

export function passwordConfirm(pw: InputWrapper, confirm: InputWrapper): string {
    if (!pw.value) {
        return 'Confirmação obrigatória.'
    } else if (pw.value !== confirm.value) {
        return 'Senhas não batem'
    }

    return null
}

const ALLOWED_EXTS = ['png', 'jpg', 'jpeg']
export function photo(file: InputWrapper): string {
    if (!file.value) {
        return 'Imagem obrigatória.'
    }

    const fileExt = file.value.split('.').pop()

    if (ALLOWED_EXTS.indexOf(fileExt) === -1) {
        return 'Formato de arquivo de imagem inválido.'
    } else {
        return null
    }
}

export function username(username: InputWrapper): string {
    if (!(username.value.length > 2)) {
        return 'Nome de usuário muito curto.'
    } else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(username.value)) {
        return 'Nome de usuário inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".'
    }
}