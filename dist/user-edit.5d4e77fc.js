// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"app\\js\\models\\User.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = exports.User = function () {
    function User(name, lastName, userName, email, password, dateOfBirth) {
        _classCallCheck(this, User);

        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
    }

    _createClass(User, [{
        key: "Name",
        get: function get() {
            return this.name;
        }
    }, {
        key: "LastName",
        get: function get() {
            return this.lastName;
        }
    }, {
        key: "UserName",
        get: function get() {
            return this.userName;
        }
    }, {
        key: "Email",
        get: function get() {
            return this.email;
        }
    }, {
        key: "Password",
        get: function get() {
            return this.password;
        }
    }, {
        key: "DateOfBirth",
        get: function get() {
            return this.dateOfBirth;
        }
    }]);

    return User;
}();
},{}],"app\\js\\config\\index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var HOST = exports.HOST = 'http://localhost:3000/';
},{}],"app\\js\\services\\UserService.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../config/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserService = exports.UserService = function () {
    function UserService() {
        _classCallCheck(this, UserService);
    }

    _createClass(UserService, [{
        key: 'add',
        value: function add(user) {
            return fetch(_index.HOST + 'users/user', {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": user.Name,
                    "lastName": user.LastName,
                    "userName": user.UserName,
                    "email": user.Email,
                    "password": user.Password,
                    "dateOfBirth": user.DateOfBirth
                })
            });
        }
    }, {
        key: 'list',
        value: function list() {
            return fetch(_index.HOST + 'admin/users', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tkn')
                }
            });
        }
    }, {
        key: 'update',
        value: function update(user, ID) {
            var dateOfBirth = user.DateOfBirth.replace(/,/g, '-');
            return fetch(_index.HOST + 'users/user/' + ID, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tkn')
                },
                body: JSON.stringify({
                    "name": user.Name,
                    "lastName": user.LastName,
                    "userName": user.UserName,
                    "email": user.Email,
                    "password": user.Password,
                    "dateOfBirth": dateOfBirth
                })
            });
        }
    }, {
        key: 'remove',
        value: function remove(ID) {
            return fetch(_index.HOST + 'users/user/' + ID, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tkn')
                }
            });
        }
    }, {
        key: 'changePassword',
        value: function changePassword(email, password) {
            return fetch(_index.HOST + 'users/changePassword', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            });
        }
    }, {
        key: 'findByEmail',
        value: function findByEmail(email) {
            return fetch(_index.HOST + 'users/' + email, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tkn')
                }
            });
        }
    }, {
        key: 'getData',
        value: function getData() {
            var email = localStorage.getItem('email');
            return fetch(_index.HOST + 'users/' + email, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tkn')
                }
            });
        }
    }]);

    return UserService;
}();
},{"../config/index":"app\\js\\config\\index.js"}],"app\\js\\utils\\InputWrapper.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputWrapper = exports.InputWrapper = function () {
    function InputWrapper(el) {
        _classCallCheck(this, InputWrapper);

        this.el = el;
        this.msgDiv = el.nextElementSibling;
    }

    _createClass(InputWrapper, [{
        key: 'setValid',
        value: function setValid(valid, msg) {
            this.el.classList.remove('is-valid');
            this.el.classList.remove('is-invalid');
            this.el.classList.add(valid ? 'is-valid' : 'is-invalid');
            this.msgDiv.className = valid ? 'valid-feedback' : 'invalid-feedback';
            if (msg !== undefined) this.setMsg(msg);
        }
    }, {
        key: 'setMsg',
        value: function setMsg(msg) {
            this.msgDiv.textContent = msg;
        }
    }, {
        key: 'value',
        get: function get() {
            return this.el.value;
        }
    }], [{
        key: 'fromId',
        value: function fromId(id) {
            return new InputWrapper(document.getElementById(id));
        }
    }]);

    return InputWrapper;
}();
},{}],"app\\js\\helpers\\validate.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validate = validate;

var _InputWrapper = require('../utils/InputWrapper');

function validate(inputEl, fn) {
    for (var _len = arguments.length, opts = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        opts[_key - 2] = arguments[_key];
    }

    var input = new _InputWrapper.InputWrapper(inputEl);
    var handle = function handle() {
        var msg = fn.apply(undefined, [input].concat(opts));
        if (msg) {
            input.setValid(false, msg);
            return false;
        }
        input.setValid(true, '');
        return true;
    };
    input.el.addEventListener('input', handle);
    return handle;
}
},{"../utils/InputWrapper":"app\\js\\utils\\InputWrapper.js"}],"app\\js\\helpers\\index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validate = require('./validate');

Object.keys(_validate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _validate[key];
    }
  });
});
},{"./validate":"app\\js\\helpers\\validate.js"}],"app\\js\\validation\\userValidate.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.name = name;
exports.lastName = lastName;
exports.username = username;
exports.email = email;
exports.photo = photo;
exports.password = password;
exports.editPassword = editPassword;
exports.passwordConfirm = passwordConfirm;
exports.editPasswordConfirm = editPasswordConfirm;
exports.code = code;
exports.dateOfBirth = dateOfBirth;
function name(name) {
    if (!(name.value.trim().length > 2)) {
        return 'Nome muito curto.';
    } else if (!/[A-Z]([a-z]|\s)+$/.test(name.value)) {
        return 'Nome inválido: Use uma letra maiúscula seguida de letras minúsculas.';
    } else if (/\s\s/.test(name.value)) {
        return 'Nome inválido: Dois ou mais espaços consecutivos.';
    } else if (/\s[A-z]\s/.test(name.value)) {
        return 'Nome inválido: Caracter solitário :(.';
    }
    return null;
}
function lastName(lastName) {
    if (!(lastName.value.trim().length > 2)) {
        return 'Sobrenome muito curto.';
    } else if (!/[A-Z]([a-z]|\s)+$/.test(lastName.value)) {
        return 'Sobren6ome inválido: Use uma letra maiúscula seguida de letras minúsculas.';
    } else if (/\s\s/.test(lastName.value)) {
        return 'Sobrenome inválido: Dois ou mais espaços consecutivos.';
    } else if (/\s[A-z]\s/.test(lastName.value)) {
        return 'Sobrenome inválido: Caracter solitário :(.';
    }
    return null;
}
function username(username) {
    if (!(username.value.trim().length > 2)) {
        return 'Nome de usuário muito curto.';
    } else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(username.value)) {
        return 'Nome de usuário inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
    }
    return null;
}
function email(email) {
    if (!email.value.trim()) {
        return 'Email vazio.';
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9_-])+(\.([a-zA-Z0-9_-])+)+$/.test(email.value)) {
        return 'Email inválido. Exemplo: abc123@def.gh';
    }
    return null;
}
var ALLOWED_EXTS = ['png', 'jpg', 'jpeg'];
function photo(file) {
    if (!file.value) {
        return 'Imagem obrigatória.';
    }
    var fileExt = file.value.split('.').pop();
    if (!fileExt || ALLOWED_EXTS.indexOf(fileExt) === -1) {
        return 'Formato de arquivo de imagem inválido.';
    }
    return null;
}
function password(pw) {
    if (pw.value.trim().length < 6 || pw.value.trim().length > 8) {
        return 'Senha deve ter tamanho entre 6 e 8 dígitos.';
    } else if (pw.value.indexOf(' ') !== -1) {
        return 'Senha não pode conter espaços.';
    }
    return null;
}
function editPassword(pw) {
    if (pw.value) {
        return password(pw);
    }
    return null;
}
function passwordConfirm(pw, confirm) {
    if (!pw.value.trim()) {
        return 'Confirmação obrigatória.';
    } else if (pw.value !== confirm.value) {
        return 'Senhas não batem';
    }
    return null;
}
function editPasswordConfirm(pw, confirm) {
    if (pw.value || confirm.value) {
        return passwordConfirm(pw, confirm);
    }
    return null;
}
function code(code) {
    if (!code.value.trim()) {
        return 'Código obrigatório.';
    }
    return null;
}
function dateOfBirth(date) {
    var inputDate = new Date(date.value.trim());
    var day = inputDate.getDate();
    var month = inputDate.getMonth();
    var year = inputDate.getFullYear();
    var isDate = true;
    if (isNaN(day) || isNaN(month) || isNaN(year)) isDate = false;
    if ((month + 1 == 4 || month + 1 == 6 || month + 1 == 9 || month + 1 == 11) && day > 30) isDate = false;
    if (year % 4 != 0 && month + 1 == 2 && day + 1 > 28) isDate = false;
    if (year % 4 == 0 && month + 1 == 2 && day + 1 > 29) isDate = false;
    if (!isDate) {
        return 'Data inválida.';
    }
    if (inputDate > new Date()) {
        return 'Obrigatório já ter nascido.';
    }
    return null;
}
},{}],"app\\js\\utils\\listCheck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.noFalse = noFalse;
function noFalse(fns) {
    var isValid = true;
    fns.forEach(function (fn) {
        if (!fn()) {
            isValid = false;
        }
    });
    return isValid;
}
},{}],"app\\js\\views\\View.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = exports.View = function () {
    function View(selector) {
        var escape = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, View);

        var temp = document.querySelector(selector);
        if (temp) {
            this._el = temp;
        } else {
            throw new Error('Element ' + selector + ' not found');
        }
        this._escape = escape;
    }

    _createClass(View, [{
        key: 'update',
        value: function update(model) {
            var template = this.template(model);
            if (this._escape) template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
            this._el.innerHTML = template;
        }
    }]);

    return View;
}();
},{}],"app\\js\\views\\MessageView.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MessageView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _View2 = require('./View');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageView = exports.MessageView = function (_View) {
    _inherits(MessageView, _View);

    function MessageView() {
        _classCallCheck(this, MessageView);

        return _possibleConstructorReturn(this, (MessageView.__proto__ || Object.getPrototypeOf(MessageView)).apply(this, arguments));
    }

    _createClass(MessageView, [{
        key: 'template',
        value: function template(model) {
            return '<p class="alert alert-warning">' + model + '</p>';
        }
    }]);

    return MessageView;
}(_View2.View);
},{"./View":"app\\js\\views\\View.js"}],"app\\js\\controllers\\UserController.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _User = require('../models/User');

var _UserService = require('../services/UserService');

var _index = require('../helpers/index');

var _userValidate = require('../validation/userValidate');

var vals = _interopRequireWildcard(_userValidate);

var _listCheck = require('../utils/listCheck');

var _MessageView = require('../views/MessageView');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = exports.UserController = function () {
    function UserController() {
        _classCallCheck(this, UserController);

        this.name = document.querySelector('#name');
        this.lastName = document.querySelector('#lastName');
        this.userName = document.querySelector('#userName');
        this.email = document.querySelector('#email');
        this.password = document.querySelector('#password');
        this.dateOfBirth = document.querySelector('#dateOfBirth');
        this.passwordConfirm = document.querySelector('#passwordConfirm');
        this.id = document.querySelector('#id');
        this.messageView = new _MessageView.MessageView('#message-view');
        this.addVals = [(0, _index.validate)(this.name, vals.name), (0, _index.validate)(this.lastName, vals.lastName), (0, _index.validate)(this.userName, vals.username), (0, _index.validate)(this.email, vals.email), (0, _index.validate)(this.password, vals.password), (0, _index.validate)(this.dateOfBirth, vals.dateOfBirth), (0, _index.validate)(this.passwordConfirm, vals.passwordConfirm, this.password)];
    }

    _createClass(UserController, [{
        key: 'add',
        value: function add(event) {
            var _this = this;

            event.preventDefault();
            if ((0, _listCheck.noFalse)(this.addVals)) {
                var user = new _User.User(this.name.value.toString(), this.lastName.value.toString(), this.userName.value.toString(), this.email.value.toString(), this.password.value.toString(), this.dateOfBirth.value.toString());
                var userService = new _UserService.UserService();
                new Promise(function (resolve, reject) {
                    userService.add(user).then(function (result) {
                        if (result.status === 200) {
                            var token = result.headers.get("Token");
                            if (token != null) {
                                localStorage.setItem('tkn', token);
                            }
                            ;
                            resolve(result.json());
                        } else {
                            reject(result);
                        }
                    });
                }).then(function (res) {
                    localStorage.setItem('email', res.email);
                    localStorage.setItem('id', res._id);
                    window.location.href = "home.html";
                }).catch(function (res) {
                    return res.json();
                }).then(function (res) {
                    console.log(res);
                    if (res.erro) _this.messageView.update(res.erro);
                });
            }
        }
    }, {
        key: 'getUserData',
        value: function getUserData() {
            var _this2 = this;

            if (!localStorage.getItem('tkn')) {
                return false;
            } else {
                var userService = new _UserService.UserService();
                return userService.getData().then(function (res) {
                    return res.json();
                }).then(function (result) {
                    if (!result) {
                        window.location.href = "index.html";
                    }
                    var id = document.querySelector('#id');
                    if (id != null) id.value = result['_id'];
                    new _User.User(_this2.name.value = result['name'], _this2.userName.value = result['userName'], _this2.lastName.value = result['lastName'], _this2.email.value = result['email'], _this2.dateOfBirth.value = result['dateOfBirth'].slice(0, 10), _this2.password.value = "");
                });
            }
        }
    }, {
        key: 'update',
        value: function update(event) {
            event.preventDefault();
            var id = document.querySelector('#id');
            if ((0, _listCheck.noFalse)(this.addVals)) {
                var dataOfBirth = this.dateOfBirth.value.replace(/-/g, ',');
                var user = new _User.User(this.name.value.toString(), this.lastName.value.toString(), this.userName.value.toString(), this.email.value.toString(), this.password.value.toString(), dataOfBirth);
                var userService = new _UserService.UserService();
                userService.update(user, id.value).then(function (result) {
                    return result.json();
                }).then(function (res) {
                    window.location.href = "home.html";
                });
            }
        }
    }]);

    return UserController;
}();
},{"../models/User":"app\\js\\models\\User.js","../services/UserService":"app\\js\\services\\UserService.js","../helpers/index":"app\\js\\helpers\\index.js","../validation/userValidate":"app\\js\\validation\\userValidate.js","../utils/listCheck":"app\\js\\utils\\listCheck.js","../views/MessageView":"app\\js\\views\\MessageView.js"}],"app\\js\\services\\HelpCenterService.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HelpCenterService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../config/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HelpCenterService = exports.HelpCenterService = function () {
    function HelpCenterService() {
        _classCallCheck(this, HelpCenterService);
    }

    _createClass(HelpCenterService, [{
        key: 'add',
        value: function add(post) {
            return fetch(_index.HOST + 'helps/post/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
                    'id_user': localStorage.getItem('id')
                },
                body: JSON.stringify({
                    "title": post.Title,
                    "desc": post.Desc,
                    "id_user": localStorage.getItem('id')
                })
            });
        }
    }, {
        key: 'update',
        value: function update(post, ID) {
            return fetch(_index.HOST + 'helps/post/' + ID, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
                    'id_user': localStorage.getItem('id')
                },
                body: JSON.stringify({
                    "id_user": localStorage.getItem('id'),
                    "title": post.Title,
                    "desc": post.Desc
                })
            });
        }
    }, {
        key: 'list',
        value: function list(page) {
            return fetch(_index.HOST + 'helps/list/post/' + page, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
                    'id_user': localStorage.getItem('id')
                }
            });
        }
    }, {
        key: 'listLastHelp',
        value: function listLastHelp() {
            return fetch(_index.HOST + 'helps/last/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
                    'id_user': localStorage.getItem('id')
                }
            });
        }
    }, {
        key: 'remove',
        value: function remove(ID) {
            return fetch(_index.HOST + 'helps/post/' + ID, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
                    'id_user': localStorage.getItem('id')
                }
            });
        }
    }, {
        key: 'findByJoker',
        value: function findByJoker(joker) {
            return fetch(_index.HOST + 'helps/post/joker/1', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
                    'id_user': localStorage.getItem('id')
                },
                body: JSON.stringify({
                    "joker": joker
                })
            });
        }
    }]);

    return HelpCenterService;
}();
},{"../config/index":"app\\js\\config\\index.js"}],"app\\js\\services\\DailyNoteService.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DailyNoteService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../config/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DailyNoteService = exports.DailyNoteService = function () {
    function DailyNoteService() {
        _classCallCheck(this, DailyNoteService);
    }

    _createClass(DailyNoteService, [{
        key: 'add',
        value: function add(yesterday, today, impediment, date) {
            return fetch(_index.HOST + 'dailys/daily', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem('tkn'),
                    'id_user': localStorage.getItem('id')
                },
                body: JSON.stringify({
                    "yesterday": yesterday,
                    "today": today,
                    "impediment": impediment,
                    "date": new Date().toISOString().slice(0, 10),
                    "email": localStorage.getItem('email')
                })
            });
        }
    }, {
        key: 'update',
        value: function update(daily, ID) {
            console.log(ID);
            return fetch(_index.HOST + 'dailys/daily/' + ID, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
                    'id_user': localStorage.getItem('id')
                },
                body: JSON.stringify({
                    "id_user": localStorage.getItem('id'),
                    "yesterday": daily.Yesterday,
                    "today": daily.Today,
                    "impediment": daily.Impediment,
                    "date": daily.Date
                })
            });
        }
    }, {
        key: 'listDate',
        value: function listDate(data, page) {
            console.log(localStorage.getItem('tkn'));
            return fetch(_index.HOST + 'dailys/daily/' + data + '/1', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem('tkn'),
                    'id_user': localStorage.getItem('id')
                }
            });
        }
    }, {
        key: 'listAll',
        value: function listAll() {
            return fetch(_index.HOST + 'dailys', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('tkn'),
                    'id_user': localStorage.getItem('id')
                }
            });
        }
    }, {
        key: 'listDailyById',
        value: function listDailyById(id) {
            return fetch(_index.HOST + 'dailys/' + id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem('tkn'),
                    'id_user': localStorage.getItem('id')
                }
            });
        }
    }, {
        key: 'registeredDaily',
        value: function registeredDaily(id) {
            return fetch(_index.HOST + 'dailys/user/' + id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem('tkn')
                }
            });
        }
    }]);

    return DailyNoteService;
}();
},{"../config/index":"app\\js\\config\\index.js"}],"app\\js\\views\\UserMenuView.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserMenuView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _View2 = require('./View');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserMenuView = exports.UserMenuView = function (_View) {
    _inherits(UserMenuView, _View);

    function UserMenuView() {
        _classCallCheck(this, UserMenuView);

        return _possibleConstructorReturn(this, (UserMenuView.__proto__ || Object.getPrototypeOf(UserMenuView)).apply(this, arguments));
    }

    _createClass(UserMenuView, [{
        key: 'template',
        value: function template() {
            return localStorage.getItem('tkn') ? '\n            <div class="dropdown mr-n4 txt-user" style="float:right;">\n                <div class="d-flex align-items-center btn" data-toggle="dropdown">\n                    <span id="nameSpan"></span>\n                    <img src="https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png" class="rounded-circle" width="60px">\n                    <i class="material-icons ml-n2">arrow_drop_down</i>\n                </div>\n                <div class="dropdown-menu dropdown-menu-right align-user">\n                    <div class="dropdown-item">    \n                        Usu\xE1rio: <span id="userNameSpan"></span>\n                    </div>\n                    <div class="dropdown-divider"></div>\n\n                    <a class="dropdown-item d-flex align-items-center" href="user-edit.html">\n                        <i class="material-icons mr-2">edit</i>Alterar Cadastro</a>\n                    <a class="dropdown-item d-flex align-items-center" href="home.html">\n                        <i class="material-icons mr-2">home</i>Home</a>\n\n                    <div class="dropdown-divider"></div>\n\n                    <a class="dropdown-item d-flex align-items-center" id="logout">\n                        <i class="material-icons mr-2">power_settings_new</i><strong>Sair</strong></a>\n                </div>\n            </div>\n        ' : '<a href="index.html" class="menu-item"><h5><strong>Login</strong></h5></a>';
        }
    }]);

    return UserMenuView;
}(_View2.View);
},{"./View":"app\\js\\views\\View.js"}],"app\\js\\controllers\\HomeController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HomeController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UserService = require("../services/UserService");

var _HelpCenterService = require("../services/HelpCenterService");

var _DailyNoteService = require("../services/DailyNoteService");

var _UserMenuView = require("../views/UserMenuView");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomeController = exports.HomeController = function () {
    function HomeController() {
        _classCallCheck(this, HomeController);

        this.user = new _UserMenuView.UserMenuView("#user-menu-login-link");
        this.user.update('');
    }

    _createClass(HomeController, [{
        key: "getUser",
        value: function getUser() {
            var data = void 0;
            if (!localStorage.getItem('tkn')) {
                return false;
            } else {
                var userService = new _UserService.UserService();
                return userService.getData().then(function (res) {
                    return res.json();
                }).then(function (result) {
                    var data = {
                        name: result['name'],
                        userName: result['userName']
                    };
                    return data;
                });
            }
        }
    }, {
        key: "listLastHelp",
        value: function listLastHelp(event) {
            event.preventDefault();
            var helpCenterService = new _HelpCenterService.HelpCenterService();
            helpCenterService.listLastHelp().then(function (result) {
                return result.json();
            }).then(function (result) {
                var row = document.querySelector('#last-helps');
                for (var i = 0; i < result.docs.length; i++) {
                    console.log(result.docs[i]);
                    row.innerHTML += "\n                    <div class=\"card d-flex flex-row justify-content-center align-items-stretch row mb-3\">\n                        <div class=\"col-md-3 col-12 text-center d-flex align-items-stretch\">\n                            <div class=\"d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100\">\n                                <div>\n                                    <h5 class=\"mt-2 mb-2 ml-4\">Usu\xE1rio</h5>\n                                    <button type=\"button\" name=\"view\"\n                                        class=\"btn btn-outline-info btn-sm input-circle pt-2 ml-4\" id=\"resp-view\"\n                                        data-toggle=\"modal\" data-target=\"#respModal\">\n                                        <i class=\"small material-icons\">description</i>\n                                    </button>\n                                </div>  \n                            </div>\n                        </div>\n                        <div class=\"col-md-9 col-12 card-body\">\n                            <div class=\"card mb-2\">\n                                <div class=\"card-body\">\n                                    <h5>" + result.docs[i]['title'] + "</h5>\n                                    <p>" + result.docs[i]['desc'] + "</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    ";
                }
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, {
        key: "listDailyDate",
        value: function listDailyDate(event) {
            event.preventDefault();
            var date = new Date().toLocaleDateString('pt-BR').slice(0, 10);
            var dailyNoteService = new _DailyNoteService.DailyNoteService();
            var year = date.slice(6, 10);
            var month = date.slice(3, 5);
            var day = date.slice(0, 2);
            var fullDate = year + "-" + month + "-" + day;
            dailyNoteService.listDate(fullDate, 1).then(function (result) {
                return result.json();
            }).then(function (result) {
                var row = document.querySelector('#all-dailys');
                for (var i = 0; i < result.length - 1; i++) {
                    row.innerHTML += "\n                    <tr>\n                        <td>" + result[i]['owner'] + "</td>\n                        <td>" + result[i]['yesterday'] + "</td>\n                        <td>" + result[i]['today'] + "</td>\n                        <td>" + result[i]['impediment'] + "</td>\n                    </tr>\n                    ";
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }]);

    return HomeController;
}();
},{"../services/UserService":"app\\js\\services\\UserService.js","../services/HelpCenterService":"app\\js\\services\\HelpCenterService.js","../services/DailyNoteService":"app\\js\\services\\DailyNoteService.js","../views/UserMenuView":"app\\js\\views\\UserMenuView.js"}],"app\\js\\utils\\userData.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUser = getUser;

var _HomeController = require('../controllers/HomeController');

function getUser() {
    var homeController = new _HomeController.HomeController();
    var data = homeController.getUser();
    if (data) {
        data.then(function (data) {
            var userData = { name: data.name, userName: data.userName };
            return userData;
        }).then(function (userData) {
            document.querySelector('#nameSpan').innerHTML = userData.name;
            document.querySelector('#userNameSpan').innerHTML = userData.userName;
        });
    }
}
},{"../controllers/HomeController":"app\\js\\controllers\\HomeController.js"}],"app\\js\\user-edit.js":[function(require,module,exports) {
"use strict";

var _UserController = require("./controllers/UserController");

var _userData = require("./utils/userData");

var user = (0, _userData.getUser)();
var update = document.getElementById("user-edit");
if (update) {
    var _userController = new _UserController.UserController();
    update.addEventListener('submit', _userController.update.bind(_userController));
}
var userController = new _UserController.UserController().getUserData();
},{"./controllers/UserController":"app\\js\\controllers\\UserController.js","./utils/userData":"app\\js\\utils\\userData.js"}],"node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '53702' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","app\\js\\user-edit.js"], null)
//# sourceMappingURL=/user-edit.5d4e77fc.map