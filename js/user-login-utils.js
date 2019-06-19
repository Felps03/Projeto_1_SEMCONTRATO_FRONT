function hasNumber(value) {
	for(let aux = 0; aux <= value.length; aux++) {
		if(value.charAt(aux).match(/^[0-9]$/)) {
			return true;
		}
	}
}

function hasSpace(value) {
	for(let aux = 0; aux <= value.length; aux++) {
		if(value.charAt(aux).match(/^\s$/)) {
			return true;
		}
	}
};

function hasSolitaryChar(value) {
	for(let aux = 0; aux <= value.length; aux++) {
		if(value.charAt(aux-1).match(/^\s$/) && value.charAt(aux).match(/^[a-z0.9]$/) && value.charAt(aux+1).match(/^\s$/)) {
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

	if(cltEmail || bolsEmail) isEmail = true;

	if(value == null || hasNumber(value) || !isEmail) {
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

		if(errors[0] === "<strong>E-mail</strong> deve conter 'nome.sobrenome' ou 'nome.sobrenome_bols' seguido do domínio Compasso.")
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

	if(value == null || (value.length < 6 || value.length > 8) || hasSpace(value) || hasSolitaryChar(value)) {
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

		if(errors[1] === "<strong>Senha</strong> deve conter de 6 a 8 caracteres.")
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

	 	for(let aux=0; aux < errors.length; aux++) {
			if(!errors[aux] == "" || errors[aux] == null) {
				errorsView += `${errors[aux]}<br>`;
			}
		}
		
		errorsView += `</div>`;
	
	document.querySelector("#error").innerHTML = errorsView;
}

function inputsValidator() {
	emailValidator();
	passwordValidator();
}

function formValidator() {
	return emailValidator() && passwordValidator();
}

//Integration
let access = document.getElementById('access');

access.addEventListener('click', function(event) {
    event.preventDefault();

    inputsValidator();
    
    if(formValidator()) {
        let email = document.getElementById('email').value;  
        let password = document.getElementById('password').value;  
	}

    let Login = {
        email, 
        password
    }

    console.log(Login);

    const URL = 'http://localhost:3000/users/authenticate';

    $.ajax({
        type: "POST",
        url: URL,
        data: User,
        success: function(data) {
            console.log(data);
            location.replace("user-login.html");
        },
         error: function (request, status, error) {
            //alert(request.responseText);
        }
    });
});