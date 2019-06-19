function hasNumber(value) {
	for(let aux = 0; aux <= value.length; aux++) {
		if(value.charAt(aux).match(/^[0-9]$/)) {
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
	
	let cltEmail = value.match(/^[a-z]+.[a-z]+@+compasso+\.+com+\.+br$/);
	let bolsEmail = value.match(/^[a-z]+.[a-z]+_bols+@+compasso+\.+com+\.+br$/);
	
	let isEmail = false;

	if(cltEmail || bolsEmail) isEmail = true;

	if(value == null || hasNumber(value) || !isEmail) {
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

recovery.addEventListener('click', function(event) {
    event.preventDefault();

	emailValidator();

	if(emailValidator()) {
		location.replace("recovery.html");
	}
});