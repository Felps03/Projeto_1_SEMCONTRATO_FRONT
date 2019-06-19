function hasNumber(value) {
	for (let aux = 0; aux <= value.length; aux++) {
		if (value.charAt(aux).match(/^[0-9]$/)) {
			return true;
		}
	}
}

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

//Validator test
let recovery = document.getElementById('recovery');

recovery.addEventListener('click', function (event) {
	event.preventDefault();

	emailValidator();

	if (emailValidator()) {
		location.replace("recovery.html");
	}
});