export function yesterday(first) {
    if (!(first.value.length > 3)) {
        return 'Descrição muito pequena.';
    }
    else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.|\s)+$/.test(first.value)) {
        return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
    }
    else {
        return null;
    }
}
export function today(today) {
    if (!(today.value.length > 3)) {
        return 'Descrição muito pequena.';
    }
    else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.|\s)+$/.test(today.value)) {
        return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
    }
    else {
        return null;
    }
}
export function impediment(third) {
    if (!(third.value.length > 3)) {
        return 'Descrição muito pequena.';
    }
    else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.|\s)+$/.test(third.value)) {
        return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
    }
    else {
        return null;
    }
}
