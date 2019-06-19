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

function hasMoreSpace(value) {
	for (let aux = 0; aux <= value.length; aux++) {
		if (value.charAt(aux).match(/^\s$/) && value.charAt(aux - 1).match(/^\s$/)) {
			return true;
		}
	}
}

function hasSolitaryChar(value) {
	for (let aux = 0; aux <= value.length; aux++) {
		if (value.charAt(aux - 1).match(/^\s$/) && value.charAt(aux).match(/^[a-z0.9]$/) && value.charAt(aux + 1).match(/^\s$/)) {
			return true;
		}
	}
};

//Validators

//Name validator
function nameValidator() {
	let status;
	let name = document.querySelector("#name");
	let value = document.querySelector("#name").value;
	let namemessage = document.querySelector("#namevalidator");

	if (value == null || value.length < 2 || hasNumber(value) || hasMoreSpace(value) || hasSolitaryChar(value)) {
		status = false;

		name.classList.add("is-invalid");

		namemessage.classList.add("invalid-feedback");
		namemessage.textContent = "Nome inválido!";
	} else {
		status = true;

		name.classList.remove("is-invalid");
		name.classList.add("is-valid");

		namemessage.classList.remove("invalid-feedback");
		namemessage.classList.add("valid-feedback");
		namemessage.textContent = null;
	}

	return status;
}

//Lastname
function lastnameValidator() {
	let status;
	let lastname = document.querySelector("#lastname");
	let value = document.querySelector("#lastname").value;
	let lastnamemessage = document.querySelector("#lastnamevalidator");

	if (value == null || value.length < 2 || hasNumber(value) || hasMoreSpace(value) || hasSolitaryChar(value)) {
		status = false;
		lastname.classList.add("is-invalid");

		lastnamemessage.classList.add("invalid-feedback");
		lastnamemessage.textContent = "Sobrenome inválido!";
	} else {
		status = true;
		lastname.classList.remove("is-invalid");
		lastname.classList.add("is-valid");

		lastnamemessage.classList.remove("invalid-feedback");
		lastnamemessage.classList.add("valid-feedback");
		lastnamemessage.textContent = null;
	}

	return status;
}

//Birthdate
function birthdateValidator() {
	let status;
	let birthdate = document.querySelector("#birthdate");
	let value = document.querySelector("#birthdate").value;
	let birthdatemessage = document.querySelector("#birthdatevalidator");

	let birthdateValue = new Date(value);
	let nowValue = new Date(Date.now());

	let day = birthdateValue.getDate();
	let month = birthdateValue.getMonth();
	let year = birthdateValue.getFullYear();

	let isDate = true;

	if (isNaN(day) || isNaN(month) || isNaN(year)) isDate = false;
	if (month + 1 == 4 || month + 1 == 6 || month + 1 == 9 || month + 1 == 11 && day + 1 > 30) isDate = false;
	if ((year % 4) != 0 && month + 1 == 2 && day + 1 > 28) isDate = false;
	if ((year % 4) == 0 && month + 1 == 2 && day + 1 > 29) isDate = false;

	birthdate.classList.remove("ext-placeholder");

	if (!isDate || (birthdateValue.getTime() >= nowValue.getTime())) {
		status = false;
		birthdate.classList.add("is-invalid");

		birthdatemessage.classList.add("invalid-feedback");
		birthdatemessage.textContent = "Data de nascimento inválida!";
	} else {
		status = true;
		birthdate.classList.remove("is-invalid");
		birthdate.classList.add("is-valid");

		birthdatemessage.classList.remove("invalid-feedback");
		birthdatemessage.classList.add("valid-feedback");
		birthdatemessage.textContent = null;
	}

	return status;
}

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
		emailmessage.textContent = "E-mail inválido!";
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

//Photo
function photoValidator() {
	let status;
	let photo = document.querySelector("#photo");
	let value = document.querySelector("#photo").value;
	let photomessage = document.querySelector("#photovalidator");

	let archive = value.split(".");
	let extension = archive[1];
	let isExtension = false;

	if (extension != 'png' || extension != 'jpg' || extension != 'jpeg') isExtension = true;

	// if (value == null || !isExtension || extension == undefined) {
	// 	status = false;
	// 	photo.classList.add("is-invalid");

	// 	photomessage.classList.add("invalid-feedback");
	// 	photomessage.textContent = "Arquivo inválido!";
	// } else {
	// 	status = true;
	// 	photo.classList.remove("is-invalid");
	// 	photo.classList.add("is-valid");

	// 	photomessage.classList.remove("invalid-feedback");
	// 	photomessage.classList.add("valid-feedback");

	// 	photomessage.textContent = null;
	// }

	return status;
}

//Username
function usernameValidator() {
	let status;
	let username = document.querySelector("#username");
	let value = document.querySelector("#username").value;
	let usernamemessage = document.querySelector("#usernamevalidator");

	if (value == null || value.length < 2 || hasSpace(value) || hasSolitaryChar(value)) {
		status = false;
		username.classList.add("is-invalid");

		usernamemessage.classList.add("invalid-feedback");
		usernamemessage.textContent = "Nome de usuário inválido!";
	} else {
		status = true;
		username.classList.remove("is-invalid");
		username.classList.add("is-valid");

		usernamemessage.classList.remove("invalid-feedback");
		usernamemessage.classList.add("valid-feedback");

		usernamemessage.textContent = null;
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
		passwordmessage.textContent = "Senha inválida!";
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

//Password Confirm
function passwordConfirmValidator() {
	let status;
	let password = document.querySelector("#passwordConfirm");
	let value = document.querySelector("#passwordConfirm").value;
	let passwordConfirmmessage = document.querySelector("#passwordconfirmvalidator");
	let getPassword = document.querySelector("#password").value;

	if (value == null || (value.length < 6 || value.length > 8) || !value === getPassword || hasSpace(value) || hasSolitaryChar(value)) {
		status = false;
		password.classList.add("is-invalid");

		passwordConfirmmessage.classList.add("invalid-feedback");
		passwordConfirmmessage.textContent = "As senhas não conferem!";
	} else {
		status = true;
		password.classList.remove("is-invalid");
		password.classList.add("is-valid");

		passwordConfirmmessage.classList.remove("invalid-feedback");
		passwordConfirmmessage.classList.add("valid-feedback");
		passwordConfirmmessage.textContent = null;
	}

	return status;
}

function inputsValidator() {
	nameValidator();
	lastnameValidator();
	birthdateValidator();
	emailValidator();
	photoValidator();
	usernameValidator();
	passwordValidator();
	passwordConfirmValidator();
}

function formValidator() {
	return nameValidator() && lastnameValidator() && birthdateValidator() && emailValidator()
		&& photoValidator() && usernameValidator() && passwordValidator() && passwordConfirmValidator();
}

//Integration
let register = document.getElementById('register-new-user');
register.addEventListener('click', function (event) {
	event.preventDefault();

	inputsValidator();

	if (formValidator()) {
		var name = document.getElementById('name').value;
		var lastName = document.getElementById('lastname').value;
		var dateOfBirth = document.getElementById('birthdate').value;
		var email = document.getElementById('email').value;
		var file_photo = document.getElementById('photo').value;
		var userName = document.getElementById('username').value;
		var password = document.getElementById('password').value;
	}

	let User = {
		name,
		lastName,
		userName,
		email,
		password,
		file_photo,
		dateOfBirth
	}


	let dataForm = document.getElementById("user-register");

	const URL = 'http://semcontrato.herokuapp.com/users/user'

	let formData = new FormData(dataForm);

	$.ajax({
		type: 'POST',
		url: URL,
		contentType: false,
		data: formData,
		success: function (data) {
			console.log(data);
			location.replace("index.html");
		},
		cache: false,
		processData: false,
		error: function (request, status, error) {
			console.log("error: ", error);
			console.log("resquest: ", request.responseText);
		}
	});
});

//File
const photo = document.getElementById("photo");
const send = document.getElementById("file_send");
const customTxt = document.getElementById("custom-text");

send.addEventListener("click", function() {
  photo.click();
});

photo.addEventListener("change", function() {
  if (photo.value) {
    customTxt.innerHTML = photo.value.match(
      /[\/\\]([\w\d\s\.\-\(\)]+)$/
    )[1];
  } else {
    customTxt.innerHTML = "Nenhuma imagem selecionada.";
  }
});
