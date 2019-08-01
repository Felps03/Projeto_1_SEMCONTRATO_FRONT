import { InputWrapper } from '../utils/index'

export function name(name: InputWrapper): string | null {
    if (name.value == '') {
        return 'Nome inválido: Campo vazio'
    } else if (name.value.trim() == '') {
        return 'Nome inválido: Apenas espaços'
    }

    return null
}

export function lastName(lastname: InputWrapper): string | null {
    if (lastname.value.toString() == '') {
        return 'Sobrenome inválido: Campo vazio'
    } else if (lastname.value.trim().toString() == '') {
        return 'Sobrenome inválido: Apenas espaços'
    }

    return null
}

export function username(username: InputWrapper): string | null {
    if (username.value.toString() == '') {
        return 'Nome de usuário inválido: Campo vazio'
    } else if (username.value.trim().toString() == '') {
        return 'Nome de usuário inválido: Apenas espaços'
    } else if (!/^([A-Za-z0-9]|_|\-|\.)+$/.test(username.value)) {
        return 'Nome de usuário inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_-."'
    }

    return null
}

export function email(email: InputWrapper): string | null {
    if (email.value.trim().toString() == '') {
        return 'Email inválido: Campo vazio'
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9_-])+(\.([a-zA-Z0-9_-])+)+$/.test(email.value)) {
        return 'Email inválido (Exemplo: abc123@def.gh)'
    }

    return null
}

const ALLOWED_EXTS = ['png', 'jpg', 'jpeg']
export function photo(file: InputWrapper): string | null {
    if (!file.value) {
        return 'Imagem obrigatória'
    }

    const fileExt = file.value.split('.').pop()

    if (!fileExt || ALLOWED_EXTS.indexOf(fileExt) === -1) {
        return 'Formato de arquivo de imagem inválido'
    }

    return null
}

export function password(pw: InputWrapper): string | null {
    if (pw.value.trim().length < 6 || pw.value.trim().length > 8) {
        return 'Senha deve ter tamanho entre 6 e 8 dígitos'
    } else if (pw.value.indexOf(' ') !== -1) {
        return 'Senha não pode conter espaços'
    }

    return null
}

export function editPassword(pw: InputWrapper): string | null {
    if (pw.value || pw.el.getAttribute('disabled') == null) {
        return password(pw);
    }

    return null;
}

export function passwordConfirm(pw: InputWrapper, confirm: HTMLInputElement): string | null {
    if (!pw.value.trim()) {
        return 'Confirmação obrigatória'
    } else if (pw.value !== confirm.value) {
        return 'Senhas não batem'
    }

    return null
}

export function editPasswordConfirm(pw: InputWrapper, confirm: HTMLInputElement): string | null {
    if (pw.value && confirm.value || (pw.el.getAttribute('disabled') == null && confirm.getAttribute('disabled') == null)) {
        return passwordConfirm(pw, confirm);
    }

    return null
}

export function code(code: InputWrapper): string | null {
    if (!code.value.trim()) {
        return 'Código obrigatório'
    }

    return null
}

export function dateOfBirth(date: InputWrapper): string | null {
    const inputDate = new Date(date.value.trim())

    const day = inputDate.getDate()
    const month = inputDate.getMonth()
    const year = inputDate.getFullYear()

    let isDate = true

    if (isNaN(day) || isNaN(month) || isNaN(year)) isDate = false
    if ((month + 1 == 4 || month + 1 == 6 || month + 1 == 9 || month + 1 == 11) && day > 30) isDate = false
    if ((year % 4) != 0 && month + 1 == 2 && day + 1 > 28) isDate = false
    if ((year % 4) == 0 && month + 1 == 2 && day + 1 > 29) isDate = false

    if (!isDate) {
        return 'Data inválida'
    }

    if (inputDate > new Date()) {
        return 'Obrigatório já ter nascido'
    }

    return null
}
