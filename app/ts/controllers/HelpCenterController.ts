import { Post, User, Posts } from '../models/index';
import { HelpCenterService, UserService } from '../services/index';

import { validate } from '../helpers/index';
import * as vals from '../validation/helpCenterValidate';
import { noFalse } from '../utils/listCheck';

import { PostsView } from '../views/PostsView';
import { PostView } from '../views/PostView';
import { HelpCenterAskController } from './HelpCenterAskController';
import { MessageView } from '../views/MessageView';
import { PaginationView } from '../views/PaginationView';

export class HelpCenterController {
	private messageView: MessageView;

	private helpCenterAsk: HelpCenterAskController;

	private searchTitle: HTMLInputElement;
	// private searchDesc: HTMLInputElement

	private addTitle: HTMLInputElement;
	private addDesc: HTMLInputElement;

	private editTitle: HTMLInputElement;
	private editDesc: HTMLInputElement;

	private postsView: PostsView;
	private postView: PostView;
	private paginationView: PaginationView;

	private addVals: (() => boolean)[];
	private editVals: (() => boolean)[];

	private currentPage: number;
	private totalPages: number;

	constructor(currentPage: number = 1, totalPages: number = 1) {
		this.searchTitle = <HTMLInputElement>document.getElementById('search-joker');
		// this.searchDesc = <HTMLInputElement>document.getElementById('search-desc')

		this.addTitle = <HTMLInputElement>document.getElementById('add-title');
		this.addDesc = <HTMLInputElement>document.getElementById('add-desc');

		this.postsView = new PostsView('#post-list');
		this.postView = new PostView('#view-view-modal');
		this.paginationView = new PaginationView('#pagination', 'app-help-center.html');

		this.messageView = new MessageView('#message-view');

		this.currentPage = currentPage;

		this.totalPages = totalPages;

		this.paginationView.update(this.currentPage, this.totalPages);

		// init validations

		this.addVals = [validate(this.addTitle, vals.title), validate(this.addDesc, vals.desc)];

		this.postView.didMount(() => {
			this.helpCenterAsk = new HelpCenterAskController();

			this.editTitle = <HTMLInputElement>document.getElementById('edit-title');
			this.editDesc = <HTMLInputElement>document.getElementById('edit-desc');

			const editForm = document.getElementById('edit-form');
			const deleteBtn = document.getElementById('confirm-del-btn');

			if (editForm) {
				editForm.addEventListener('submit', this.update.bind(this));
			}
			if (deleteBtn) {
				deleteBtn.addEventListener('click', this.delete.bind(this));
			}

			// init validations

			// if one exists, both exist
			if (this.editTitle) {
				this.editVals = [validate(this.editTitle, vals.title), validate(this.editDesc, vals.desc)];
			}

			this.helpCenterAsk.listByPost(new Event(''));
		});
	}

	set CurrentPage(page: number) {
		this.currentPage = page;
		this.paginationView.update(this.currentPage, this.totalPages);
	}
	set TotalPages(total: number) {
		this.totalPages = total;
	}

	add(event: Event) {
		event.preventDefault();
		//let idUser = localStorage.getItem('id') || "";

		if (noFalse(this.addVals)) {
			const post = new Post(this.addTitle.value.toString(), this.addDesc.value.toString());

			const helpCenterService = new HelpCenterService();

			helpCenterService
				.add(post)
				.then((result) => {
					// 200, 201, 202, 203...
					if (Math.floor(result.status / 100) === 2) {
						result
							.json()
							.then(() => {
								this.list(event);
								document.getElementById('add-modal-close').click();
								this.messageView.update('Adicionado com sucesso!');
							})
							.catch((error) => {
								console.error(error);
							});
					} else {
						result.json().then((res) => {
							this.list(event);
							this.messageView.update(res.erro);
						});
					}
				})
				.then((res) => {
					// console.log(res);
					// $('#add-modal').modal('hide');
				})
				.then(() => {
					this.list(event);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}

	update(event: Event) {
		event.preventDefault();

		if (noFalse(this.editVals)) {
			//let idUser = localStorage.getItem('id') || "";
			const postIdField = document.getElementById('post-meta');

			if (!(postIdField && this.editTitle && this.editDesc)) {
				return;
			}

			const ID_POST = postIdField.getAttribute('data-id');

			if (!ID_POST) {
				return;
			}

			const post = new Post(this.editTitle.value, this.editDesc.value);

			const helpCenterService = new HelpCenterService();
			helpCenterService
				.update(post, ID_POST)
				.then((result) => {
					return result.json();
				})
				.then((res) => {
					this.list(event);
					//   console.table(res);
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			console.log('vals')
		}
	}

	// here be dragons
	list(event: Event) {
		event.preventDefault();
		const helpCenterService = new HelpCenterService();
		helpCenterService
			.list(this.currentPage)
			.then((result) => {
				return result.json();
			})
			.then((res) => {
				//console.log(res);
				this.TotalPages = res[res.length-1].totalPages;
				this.paginationView.update(this.currentPage, this.totalPages);
				const posts = Posts.from(res.slice(0, -1));
				this.postsView.update(posts, this.totalPages);
				Array.from(document.getElementsByClassName('post-expand')).forEach((el) => {
					const i = el.getAttribute('data-i');
					if (i) {
						el.addEventListener('click', () => {
							this.postView.update(posts.get(+i));
						});
					}
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	delete(event: Event) {
		event.preventDefault();
		const postIdField = document.getElementById('post-meta');

		if (!postIdField) {
			return;
		}

		const ID_POST = postIdField.getAttribute('data-id');

		if (!ID_POST) {
			return;
		}

		const helpCenterService = new HelpCenterService();
		helpCenterService
			.remove(ID_POST)
			.then((result) => {
				if (Math.floor(result.status / 100) === 2) {
					result.json().then((res) => {
						this.list(event);
						document.getElementById('confirm-del-modal-close').click();
						document.getElementById('view-modal-close').click();
						this.messageView.update('Deletado com sucesso.');
					});
				} else {
					result.json().then((res) => {
						this.list(event);
						this.messageView.update(res.erro);
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	findByTitle(event: Event) {
		event.preventDefault();
		let title = this.searchTitle.value;
		const helpCenterService = new HelpCenterService();
		helpCenterService
			.findByJoker(title)
			.then((result) => {
				return result.json();
			})
			.then((res) => {
				const posts = Posts.from(res.slice(0, -1));
				this.postsView.update(posts);
				Array.from(document.getElementsByClassName('post-expand')).forEach((el) => {
					const i = el.getAttribute('data-i');
					if (i) {
						el.addEventListener('click', () => {
							this.postView.update(posts.get(+i));
						});
					}
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	// findByDesc(event: Event) {
	//     event.preventDefault();
	//     let desc = this.searchDesc.value;
	//     const helpCenterService = new HelpCenterService();
	//     helpCenterService.findByDesc(desc)
	//         .then(result => {
	//             return result.json()
	//         }).then(res => {
	//             const posts = Posts.from(res.slice(0, -1))
	//             this.postsView.update(posts)
	//             //   console.log(posts)
	//             Array.from(document.getElementsByClassName('post-expand'))
	//                 .forEach(el => {
	//                     const i = el.getAttribute('data-i')
	//                     if (i) {
	//                         el.addEventListener('click', () => {

	//                             this.postView.update(
	//                                 posts.get(+i)
	//                             )

	//                         })
	//                     }
	//                 })
	//         })
	//         .catch(error => {
	//             console.error(error)
	//         });
	// }
}
