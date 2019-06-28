"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(name, lastName, userName, email, password, dateOfBirth) {
        this._name = name;
        this._lastName = lastName;
        this._userName = userName;
        this._email = email;
        this._password = password;
        this._dateOfBirth = dateOfBirth;
    }
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "lastName", {
        get: function () {
            return this._lastName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "userName", {
        get: function () {
            return this._userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this._password;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "dateOfBirth", {
        get: function () {
            return this._dateOfBirth;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map