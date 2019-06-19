import $ from 'jquery';


function hasNumber(value) {
	for (let aux = 0; aux <= value.length; aux++) {
		if (value.charAt(aux).match(/^[0-9]$/)) {
			return true;
		}
	}
}

function hasSpace(value) {
	for (let aux = 0; aux <= value.length; aux++) {
		if (value.charAt(aux).match(/^\s$/)) {
			return true;
		}
	}
};

function hasSolitaryChar(value) {
	for (let aux = 0; aux <= value.length; aux++) {
		if (value.charAt(aux - 1).match(/^\s$/) && value.charAt(aux).match(/^[a-z0.9]$/) && value.charAt(aux + 1).match(/^\s$/)) {
			return true;
		}
	}
};

//Validators
var errors = [];

//Email
function emailValidator() {
	let status;
	let email = document.querySelector("#email");
	let value = document.querySelector("#email").value;
	let emailmessage = document.querySelector("#emailvalidator");

	let cltEmail = value.match(/^[a-z]+.[a-z]+@+compasso+\.+com+\.+br$/);
	let bolsEmail = value.match(/^[a-z]+.[a-z]+_bols+@+compasso+\.+com+\.+br$/);

	let isEmail = false;

	if (cltEmail || bolsEmail) isEmail = true;

	if (value == null || hasNumber(value) || !isEmail) {
		status = false;
		email.classList.add("is-invalid");

		emailmessage.classList.add("invalid-feedback");
		emailmessage.textContent = "E-mail inválido e/ou não cadastrado!";

		errors[0] = "<strong>E-mail</strong> deve conter 'nome.sobrenome' ou 'nome.sobrenome_bols' seguido do domínio Compasso.";
		headerError();
	} else {
		status = true;

		email.classList.remove("is-invalid");
		email.classList.add("is-valid");

		emailmessage.classList.remove("invalid-feedback");
		emailmessage.classList.add("valid-feedback");
		emailmessage.textContent = "E-mail válido!";

		if (errors[0] === "<strong>E-mail</strong> deve conter 'nome.sobrenome' ou 'nome.sobrenome_bols' seguido do domínio Compasso.")
			errors[0] = "";
		headerError();
	}

	return status;
}

//Password
function passwordValidator() {
	let status;
	let password = document.querySelector("#password");
	let value = document.querySelector("#password").value;
	let passwordmessage = document.querySelector("#passwordvalidator");

	if (value == null || (value.length < 6 || value.length > 8) || hasSpace(value) || hasSolitaryChar(value)) {
		status = false;
		password.classList.add("is-invalid");

		passwordmessage.classList.add("invalid-feedback");
		passwordmessage.textContent = "Senha inválida e/ou não encontrada!";

		errors[1] = "<strong>Senha</strong> deve conter de 6 a 8 caracteres.";
		headerError();
	} else {
		status = true;
		password.classList.remove("is-invalid");
		password.classList.add("is-valid");

		passwordmessage.classList.remove("invalid-feedback");
		passwordmessage.classList.add("valid-feedback");
		passwordmessage.textContent = "Senha válida!";

		if (errors[1] === "<strong>Senha</strong> deve conter de 6 a 8 caracteres.")
			errors[1] = "";
		headerError();
	}

	return status;
}

function headerError() {
	let errorsView = `
		<div class="alert alert-danger alert-dismissible mt-4 border-0 input-circle" id="error">
			<button type="button" class="close" data-dismiss="alert">&times;</button>
		`;

	for (let aux = 0; aux < errors.length; aux++) {
		if (!errors[aux] == "" || errors[aux] == null) {
			errorsView += `${errors[aux]}<br>`;
		}
	}

	errorsView += `</div>`;

	document.querySelector("#error").innerHTML = errorsView;
}

export function inputsValidator() {
	emailValidator();
	passwordValidator();
}

export function formValidator() {
	return emailValidator() && passwordValidator();
}

//Integration

let access = document.getElementById('access');

access.addEventListener('click', function (event) {
	event.preventDefault();

	inputsValidator();

	if (formValidator()) {
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
	}

	let Login = {
		email,
		password
	}

	var URL = 'https://semcontrato.herokuapp.com/users/authenticate'

	$.ajax({
		type: "POST",
		url: URL,
		data: Login,
		success: function (data) {
			console.log('data: ', data);
			window.location.href = "home.html";
		},
		error: function (request, status, error) {
			console.log(error);
			alert(request.responseText);
		}
	});
});

let alterar = document.getElementById('alterar');

alterar.addEventListener('click', function (event) {
	event.preventDefault();

	let accmodalpassword = document.querySelector("#modalpassword");
	let modalpassword = document.getElementById('modalpassword').value;
	let modalpasswordmessage = document.querySelector("#modalpasswordvalidator");
	console.log(modalpassword);


	if (modalpassword == null || (modalpassword.length < 6 || modalpassword.length > 8) || hasSpace(modalpassword) || hasSolitaryChar(modalpassword)) {
		accmodalpassword.classList.add("is-invalid");

		modalpasswordmessage.classList.add("invalid-feedback");
		modalpasswordmessage.textContent = "Senha inválida e/ou não encontrada!";
	} else {
		accmodalpassword.classList.remove("is-invalid");
		accmodalpassword.classList.add("is-valid");

		modalpasswordmessage.classList.remove("invalid-feedback");
		modalpasswordmessage.classList.add("valid-feedback");
		modalpasswordmessage.textContent = "Senha válida!";
	}

	let accmodalnewpassword = document.querySelector("#modalnewpassword");
	let modalnewpassword = document.getElementById('modalnewpassword').value;
	let modalnewpasswordmessage = document.querySelector("#modalnewpasswordvalidator");
	console.log(modalpassword);

	if (modalnewpassword == null || (modalnewpassword.length < 6 || modalnewpassword.length > 8) || hasSpace(modalnewpassword) || hasSolitaryChar(modalnewpassword)) {
		accmodalnewpassword.classList.add("is-invalid");

		modalnewpasswordmessage.classList.add("invalid-feedback");
		modalnewpasswordmessage.textContent = "Senha inválida e/ou não encontrada!";
	} else {
		accmodalnewpassword.classList.remove("is-invalid");
		accmodalnewpassword.classList.add("is-valid");

		modalnewpasswordmessage.classList.remove("invalid-feedback");
		modalnewpasswordmessage.classList.add("valid-feedback");
		modalnewpasswordmessage.textContent = "Senha válida!";
	}


	let accmodalnewpasswordConfirm = document.querySelector("#modalnewpasswordConfirm");
	let modalnewpasswordConfirm = document.getElementById('modalnewpasswordConfirm').value;
	let modalnewpasswordmessageConfirm = document.querySelector("#modalnewpasswordvalidatorConfirm");
	console.log(modalpassword);

	if (modalnewpassword == modalnewpasswordConfirm) {
		accmodalnewpasswordConfirm.classList.add("is-invalid");

		modalnewpasswordmessageConfirm.classList.add("invalid-feedback");
		modalnewpasswordmessageConfirm.textContent = "As senhas conferem!";
	} else {
		accmodalnewpasswordConfirm.classList.remove("is-invalid");
		accmodalnewpasswordConfirm.classList.add("is-valid");

		modalnewpasswordmessageConfirm.classList.remove("invalid-feedback");
		modalnewpasswordmessageConfirm.classList.add("valid-feedback");
		modalnewpasswordmessageConfirm.textContent = "As senhas não conferem!";
	}

	grecaptcha.ready(function () {

		grecaptcha.execute('6LemuakUAAAAALHHE5_7NL8FwKzEvCXLXzUUqahn', { action: 'user_login' })
			.then(function (token) {
				//
			});
	});
});