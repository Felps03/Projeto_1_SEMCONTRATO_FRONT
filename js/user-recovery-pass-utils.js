import $ from 'jquery';

import { HOST } from '../config/index.js'
import { hasNumber } from '../utils/index.js';

//Validators

//Email
function emailValidator_rec() {
	let status;
	let email = document.querySelector("#email_rec");
	let value = document.querySelector("#email_rec").value;
	let emailmessage = document.querySelector("#emailvalidator_rec");

	let myEmail = value.match(/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/);

	let isEmail = false;

	if (myEmail) isEmail = true;

	if (value == null || hasNumber(value) || !isEmail) {
		status = false;
		email.classList.add("is-invalid");

		emailmessage.classList.add("invalid-feedback");
		emailmessage.textContent = "E-mail inválido e/ou não encontrado!";
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

function codeValidator() {
	let code = document.querySelector("#code");
	let value = document.querySelector("#code").value;
	let codemessage = document.querySelector("#codevalidator");

	if (value.length == 0) {
		email.classList.add("is-invalid");

		emailmessage.classList.add("invalid-feedback");
		emailmessage.textContent = "Código inválido!";
	} else {
		email.classList.remove("is-invalid");
		email.classList.add("is-valid");

		emailmessage.classList.remove("invalid-feedback");
		emailmessage.classList.add("valid-feedback");
		emailmessage.textContent = null;
	}
}

//Integration - insert email

let recovery = document.getElementById('recovery-pass');

recovery.addEventListener('click', function (event) {

	
	event.preventDefault();

	// emailValidator_rec();

	// if (emailValidator_rec()) {
		var email = document.getElementById('email_rec').value;
	// }

	alert(email);
		
	

	$.ajax({
		type: "POST",
		url: `${HOST}users/user/recover`,
		data: {
			"email": email
		},
		success: function (data) {
			console.log('data: ', data);
			window.location.href = "recovery.html";
		},
		error: function (request, status, error) {
			console.log(error);
			alert(request.responseText);
		}
	});
});

//Integration - insert code


let recoveryCode = document.getElementById('recoverycodeF');
recoveryCode.addEventListener('click', function (event) {
	event.preventDefault();

	alert('aqui');

	// codeValidator();
	
	// if (codeValidator()) {
		var code = document.getElementById('code').value;
		var email = document.getElementById('email_rec').value;
		var senha = document.getElementById('password_rec').value;
		
		//obter email
	// }

	$.ajax({
		type: "POST",
		url: `${HOST}users/code/verify`,
		data: {
			"email" : email,
			"emailCode" : code,
			"senha" : senha
		},
		success: function (data) {
			alert("Senha trocada com sucesso");
			//qual local ir?
			window.location.href = "index.html";
		},
		error: function (request, status, error) {
			console.log(error);
			alert(request.responseText);
			alert(erro);
		}
	});
});