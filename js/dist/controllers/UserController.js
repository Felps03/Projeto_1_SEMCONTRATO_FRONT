var UserController = (function () {
    function UserController() {
        this._name = document.querySelector('#name');
        this._lastName = document.querySelector('#lastName');
        this._userName = document.querySelector('#userName');
        this._email = document.querySelector('#email');
        this._password = document.querySelector('#password');
        this._dateOfBirth = document.querySelector('#dateOfBirth');
    }
    UserController.prototype.adiciona = function (event) {
        event.preventDefault();
        var user = new User(this._name.value, this._lastName.value, this._userName.value, this._email, this._password.value, new Date(this._dateOfBirth.value));
        console.log(user);
    };
    return UserController;
}());
//# sourceMappingURL=UserController.js.map