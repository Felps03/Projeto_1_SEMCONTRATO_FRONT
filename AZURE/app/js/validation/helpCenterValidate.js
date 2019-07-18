export function title(title) {
    if (!(title.value.trim().length > 3)) {
        return 'Título muito pequeno.';
    }
    else {
        return null;
    }
}
export function desc(desc) {
    if (!(desc.value.trim().length > 3)) {
        return 'Descrição muito pequena.';
    }
    else {
        return null;
    }
}
