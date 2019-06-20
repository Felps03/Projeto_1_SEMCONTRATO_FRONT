import $ from 'jquery';

import { HOST } from '../config/index.js'
import { hasNumber, hasSpace, hasSolitaryChar } from '../utils/index.js';

//Validators

//Email
function emailValidator() {
	let status;
	let email = document.querySelector("#email");
	let value = document.querySelector("#email").value;
	let emailmessage = document.querySelector("#emailvalidator");

	let myEmail = value.match(/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/);

	let isEmail = false;

	if (myEmail) isEmail = true;

	if (value == null || hasNumber(value) || !isEmail) {
		status = false;
		email.classList.add("is-invalid");

		emailmessage.classList.add("invalid-feedback");
		emailmessage.textContent = "E-mail inválido e/ou não cadastrado!";
	} else {
		status = true;

		email.classList.remove("is-invalid");
		email.classList.add("is-valid");

		emailmessage.classList.remove("invalid-feedback");
		emailmessage.classList.add("valid-feedback");
		emailmessage.textContent = null;
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
	} else {
		status = true;
		password.classList.remove("is-invalid");
		password.classList.add("is-valid");

		passwordmessage.classList.remove("invalid-feedback");
		passwordmessage.classList.add("valid-feedback");
		passwordmessage.textContent = null;
	}

	return status;
}

export function inputsValidator() {
	emailValidator();
	passwordValidator();
}

export function formValidator() {
	return emailValidator() && passwordValidator();
}

function updatePassValidator() {
	let accmodalpassword = document.querySelector("#modalpassword");
	let modalpassword = document.getElementById('modalpassword').value;
	let modalpasswordmessage = document.querySelector("#modalpasswordvalidator");

	if (modalpassword == null || (modalpassword.length < 6 || modalpassword.length > 8) || hasSpace(modalpassword) || hasSolitaryChar(modalpassword)) {
		accmodalpassword.classList.add("is-invalid");

		modalpasswordmessage.classList.add("invalid-feedback");
		modalpasswordmessage.textContent = "Senha incorreta!";
	} else {
		accmodalpassword.classList.remove("is-invalid");
		accmodalpassword.classList.add("is-valid");

		modalpasswordmessage.classList.remove("invalid-feedback");
		modalpasswordmessage.classList.add("valid-feedback");
		modalpasswordmessage.textContent = null;
	}

	let accmodalnewpassword = document.querySelector("#modalnewpassword");
	let modalnewpassword = document.getElementById('modalnewpassword').value;
	let modalnewpasswordmessage = document.querySelector("#modalnewpasswordvalidator");

	if (modalnewpassword == null || (modalnewpassword.length < 6 || modalnewpassword.length > 8) || hasSpace(modalnewpassword) || hasSolitaryChar(modalnewpassword)) {
		accmodalnewpassword.classList.add("is-invalid");

		modalnewpasswordmessage.classList.add("invalid-feedback");
		modalnewpasswordmessage.textContent = "Senha inválida!";
	} else {
		accmodalnewpassword.classList.remove("is-invalid");
		accmodalnewpassword.classList.add("is-valid");

		modalnewpasswordmessage.classList.remove("invalid-feedback");
		modalnewpasswordmessage.classList.add("valid-feedback");
		modalnewpasswordmessage.textContent = null;
	}

	let accmodalnewpasswordConfirm = document.querySelector("#modalnewpasswordConfirm");
	let modalnewpasswordConfirm = document.getElementById('modalnewpasswordConfirm').value;
	let modalnewpasswordmessageConfirm = document.querySelector("#modalnewpasswordconfirmvalidator");

	if ((modalnewpasswordConfirm != modalnewpassword) || modalnewpasswordConfirm.length == 0) {
		accmodalnewpasswordConfirm.classList.add("is-invalid");

		modalnewpasswordmessageConfirm.classList.add("invalid-feedback");
		modalnewpasswordmessageConfirm.textContent = "As senhas não conferem!";

	} else {
		accmodalnewpasswordConfirm.classList.remove("is-invalid");
		accmodalnewpasswordConfirm.classList.add("is-valid");

		modalnewpasswordmessageConfirm.classList.remove("invalid-feedback");
		modalnewpasswordmessageConfirm.classList.add("valid-feedback");
		modalnewpasswordmessageConfirm.textContent = null;
	}
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

	$.ajax({
		type: "POST",
		url: `${HOST}users/authenticate`,
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

	updatePassValidator();
});