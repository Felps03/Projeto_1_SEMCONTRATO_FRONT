import { Post, User, Posts } from '../models/index';
import { HelpCenterService, UserService } from '../services/index';

import { validate, clean } from '../helpers/index';
import * as vals from '../validation/helpCenterValidate';
import { noFalse } from '../utils/listCheck';

import { PostsView } from '../views/PostsView';
import { PostView } from '../views/PostView';
import { HelpCenterAskController } from './HelpCenterAskController';
import { MessageView } from '../views/MessageView';
import { PaginationView } from '../views/PaginationView';
import { QuestionView } from '../views/QuestionView';

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

	private type: number;

	private protected: boolean;

	constructor(currentPage: number = 1, totalPages: number = 1) {
		this.searchTitle = <HTMLInputElement>document.getElementById('search-joker');
		// this.searchDesc = <HTMLInputElement>document.getElementById('search-desc')

		this.addTitle = <HTMLInputElement>document.getElementById('add-title');
		this.addDesc = <HTMLInputElement>document.getElementById('add-desc');

		this.postsView = new PostsView('#post-list');
		this.postView = new PostView('#view-view-modal');
		// this.paginationView = new PaginationView('#pagination', 'app-help-center.html');

		this.messageView = new MessageView('#message-view');

		this.currentPage = currentPage;

		this.totalPages = totalPages;
		this.type = 1;
		// this.paginationView.update(this.currentPage, this.totalPages, this.type);

		// init validations

		this.addVals = [validate(this.addTitle, vals.title), validate(this.addDesc, vals.desc)];

		this.postsView.didMount(() => {
			Array.from(document.querySelectorAll('a.can-delete')).forEach(button => {
				const id = button.getAttribute('data-id')
				button.addEventListener('click', this.delete.bind(this, id))
			})
		})

		// prevent search submit  (enter)
		document.getElementById('search-form').addEventListener('submit', e => e.preventDefault())

		this.protected = true
	}

	set CurrentSearch(term: string) {
		this.searchTitle.value = term
	}


	cancel(event: Event) {
		event.preventDefault();

		clean(<HTMLInputElement>document.querySelector('#add-title'));
		clean(<HTMLInputElement>document.querySelector('#add-desc'));
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
					if (Math.floor(result.status / 100) === 2) {
						result
							.json()
							.then(() => {
								this.list(event);
								document.getElementById('add-modal-close').click();
								this.messageView.update('Pergunta publicada com sucesso!');

								let title = <HTMLInputElement>document.getElementById('add-title');
								let desc = <HTMLInputElement>document.getElementById('add-desc');

								title.value = '';
								desc.value = '';

								clean(title);
								clean(desc);

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

	set CurrentPage(page: number) {
		this.currentPage = page;
		this.paginationView = new PaginationView('#pagination', 'app-help-center.html');
		this.paginationView.update(this.currentPage, this.totalPages, this.type);
	}
	set TotalPages(total: number) {
		this.totalPages = total;
	}

	// here be dragons
	list(event: Event) {
		event.preventDefault();

		// let buttonAddHC = document.getElementById('help-add-ocult');

		// if (localStorage.getItem('email')) {
		// 	buttonAddHC.classList.remove('display-none');
		// } else {
		// 	buttonAddHC.classList.add('display-none');
		// }

		console.log('listando whatever')

		const helpCenterService = new HelpCenterService();
		helpCenterService
			.list(this.currentPage, null)
			.then((result) => {
				if (result.status == 200) {
					document.getElementById('load-view').setAttribute('hidden', 'true');
				}
				return result.json();
			})
			.then((res) => {

				this.TotalPages = res[res.length - 1].totalPages;
				let totalQuestions = res[res.length - 1].totalDocs;
				let pages = res[res.length - 1].page;

				res.pop();

				const posts = Posts.from(res.slice(0, 10));

				// this.paginationView.update(this.currentPage, this.totalPages, this.type);
				// this.postsView.update(posts, this.totalPages);

				if (posts.toArray().length != 0) {
					document.getElementById('response').textContent = `Total de ${totalQuestions} pergunta${totalQuestions == 1 ? '' : 's'} registrada${totalQuestions == 1 ? '' : 's'}. (página ${res[res.length - 1] === undefined ? '' : pages})`;
					this.paginationView = new PaginationView('#pagination', 'app-help-center.html');
					this.paginationView.update(this.currentPage, this.totalPages, this.type);
				} else {
					document.getElementById('response').textContent = '';
					// this.paginationView.update(this.currentPage, this.totalPages, this.type);
					document.getElementById('pagination').textContent = '';
				}

				this.postsView.update(posts, this.totalPages);

				Array.from(document.getElementsByClassName('post-expand')).forEach((el) => {
					const i = el.getAttribute('data-i');
					if (i) {
						'	'
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

	// listQuestionAndAnswer(event: Event) {
	// 	event.preventDefault();
	// 	const helpCenterService = new HelpCenterService();
	// 	helpCenterService
	// 		.list(this.currentPage)
	// 		.then((result) => {
	// 			return result.json();
	// 		})
	// 		.then((res) => {
	// 			// console.log(res);

	// 			const posts = Posts.from(res.slice(0, -1));
	// 			this.postsView.update(posts);
	// 			Array.from(document.getElementsByClassName('post-expand')).forEach((el) => {
	// 				const i = el.getAttribute('data-i');
	// 				if (i) {
	// 					el.addEventListener('click', () => {
	// 						this.postView.update(posts.get(+i));
	// 					});
	// 				}
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
	// }

	delete(id: string, event: Event) {
		event.preventDefault();

		const helpCenterService = new HelpCenterService();
		helpCenterService
			.remove(id)
			.then((result) => {
				if (Math.floor(result.status / 100) === 2) {
					result.json().then((res) => {
						this.list(event);
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

	findByJoker(event: Event) {
		event.preventDefault();

		console.log('jokando')

		let title = this.searchTitle.value;
		if (!title) {
			this.list(event)
			return false
		}

		console.log('realmente jokando')

		const helpCenterService = new HelpCenterService();
		helpCenterService
			.findByJoker(title, this.currentPage)
			.then((result) => {
				if (result.status == 200) {
					document.getElementById('load-view').setAttribute('hidden', 'true');
				}
				return result.json();
			})
			.then((res) => {

				if (this.protected) {
					this.currentPage = this.currentPage || 1
					this.protected = false
				} else {
					this.currentPage = 1
				}

				// for some reason it's coming fractional
				this.totalPages = Math.floor(res[res.length - 1].totalPages)

				console.log(res)

				this.paginationView.update(this.currentPage, this.totalPages, this.type);
				const posts = Posts.from(res.slice(0, -1));
				this.postsView.update(posts, this.totalPages);

				//this.postsView.update(posts, this.totalPages);

				let aux = <HTMLInputElement>document.getElementById('search-joker');
				let response = <HTMLInputElement>document.getElementById('response_search');

				if (aux.value === '') {
					response.textContent = '';
				} else {
					response.textContent = `Aproximadamente ${res.length - 1} pergunta${res.length - 1 === 1 ? '' : 's'}.`;
				}

				if (this.totalPages === 1) {
					this.clearPagination(event)
				} else {
					this.paginationView.update(this.currentPage, this.totalPages, this.type);
					Array.from(document.getElementsByClassName('page-link')).forEach((el: HTMLAnchorElement) => {
						el.href = el.href + '&q=' + encodeURI(this.searchTitle.value)
					})
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	logout(event: Event) {
		event.preventDefault();

		localStorage.clear();
		window.location.href = 'index.html';
	}

	cancelar(event: Event) {
		event.preventDefault();
		this.limpar();
	}

	limpar() {
		let title = <HTMLInputElement>document.querySelector('#add-title');
		let desc = <HTMLInputElement>document.querySelector('#add-desc');

		title.value = "";
		desc.value = "";

		clean(title);
		clean(desc);
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

	clearPagination(event: Event) {
		event.preventDefault()
		document.getElementById('pagination').innerHTML = ''
		console.log('clearng')
	}
}
