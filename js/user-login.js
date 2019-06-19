import $ from 'jquery';

let access = document.getElementById('access');

access.addEventListener('click', function(event) {
    event.preventDefault();

    // inputsValidator();
    
    //if(formValidator()) {
        let email = document.getElementById('email').value;  
        let password = document.getElementById('password').value;  
	//}

    let Login = {
        email, 
        password
    }    

    $.ajax({
        type: "POST",
        url: 'https://semcontrato.herokuapp.com/users/authenticate',
        data: Login,
        success: function(data) {
            console.log('data: ', data);
            location.replace("home.html");
        },
         error: function (request, status, error) {
             console.log(error);
            alert(request.responseText);
        }
    });
    
});