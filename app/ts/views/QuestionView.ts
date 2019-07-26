import { View } from './View';
import { Post } from '../models/index';

export class QuestionView extends View<Post> {

    template(model: Post): string {

        return `
            <input type="text" name="title" id="edit-title"
            class="form-control form-control input-circle"
            placeholder="Pesquisar por título" value="${model.Title}">

        `
    }

}