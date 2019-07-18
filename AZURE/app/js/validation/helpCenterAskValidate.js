export function comment(comment) {
    if (!(comment.value.trim().length > 3)) {
        return 'Comentário muito pequeno.';
    }
    else {
        return null;
    }
}
