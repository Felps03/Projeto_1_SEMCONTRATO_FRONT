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

//Integration

let recovery = document.getElementById('recovery');

recovery.addEventListener('click', function (event) {
	event.preventDefault();

	emailValidator_rec();

	if (emailValidator_rec()) {
		var email = document.getElementById('email_rec').value;
	}

	let Recovery = {
		email
	}

	$.ajax({
		type: "POST",
		url: `${HOST}users/user/recover`,
		data: Recovery,
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