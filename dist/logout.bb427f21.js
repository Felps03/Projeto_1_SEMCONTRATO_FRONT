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
})({"app/js/config/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var HOST = exports.HOST = 'http://localhost:3000/';
},{}],"app/js/services/AuthenticateService.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthenticateService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../config/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthenticateService = exports.AuthenticateService = function () {
    function AuthenticateService() {
        _classCallCheck(this, AuthenticateService);
    }

    _createClass(AuthenticateService, [{
        key: 'authenticate',
        value: function authenticate(email, password) {
            return fetch(_index.HOST + 'users/authenticate', {
                method: 'POST',
                mode: 'cors',
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
        key: 'resetPassword',
        value: function resetPassword(email) {
            return fetch(_index.HOST + 'users/user/recover', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email
                })
            });
        }
    }, {
        key: 'verifyCode',
        value: function verifyCode(emailCode, email, password) {
            return fetch(_index.HOST + 'users/code/verify', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "emailCode": emailCode,
                    "email": email
                })
            });
        }
    }, {
        key: 'logout',
        value: function logout() {
            return fetch(_index.HOST + 'users/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("tkn")
                }
            });
        }
    }]);

    return AuthenticateService;
}();
},{"../config/index":"app/js/config/index.js"}],"app/js/utils/InputWrapper.js":[function(require,module,exports) {
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
},{}],"app/js/helpers/validate.js":[function(require,module,exports) {
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
},{"../utils/InputWrapper":"app/js/utils/InputWrapper.js"}],"app/js/helpers/index.js":[function(require,module,exports) {
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
},{"./validate":"app/js/helpers/validate.js"}],"app/js/validation/userValidate.js":[function(require,module,exports) {
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
},{}],"app/js/utils/listCheck.js":[function(require,module,exports) {
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
},{}],"app/js/services/UserService.js":[function(require,module,exports) {
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
},{"../config/index":"app/js/config/index.js"}],"app/js/controllers/AuthenticateController.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthenticateController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AuthenticateService = require('../services/AuthenticateService');

var _index = require('../helpers/index');

var _userValidate = require('../validation/userValidate');

var vals = _interopRequireWildcard(_userValidate);

var _listCheck = require('../utils/listCheck');

var _UserService = require('../services/UserService');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthenticateController = exports.AuthenticateController = function () {
    function AuthenticateController() {
        _classCallCheck(this, AuthenticateController);

        this.email = document.getElementById('email');
        this.password = document.getElementById('password');
        this.emailRec = document.getElementById('email_rec');
        try {
            this.authVals = [(0, _index.validate)(this.email, vals.email), (0, _index.validate)(this.password, vals.password)];
            this.passRecVals = [(0, _index.validate)(this.emailRec, vals.email)];
        } catch (e) {
            console.log("passo no catch");
        }
    }

    _createClass(AuthenticateController, [{
        key: 'authenticate',
        value: function authenticate(event) {
            if ((0, _listCheck.noFalse)(this.authVals)) {
                var authenticateService = new _AuthenticateService.AuthenticateService();
                console.log(this.email.value);
                authenticateService.authenticate(this.email.value.toString(), this.password.value.toString()).then(function (res) {
                    var token = res.headers.get("Token");
                    if (token != null) {
                        localStorage.setItem('tkn', token);
                    }
                    return res.json();
                }).then(function (result) {
                    localStorage.setItem('email', result[0]['email']);
                    localStorage.setItem('id', result[0]['_id']);
                    window.location.href = "home.html";
                });
            }
            event.preventDefault();
        }
    }, {
        key: 'resetPassword',
        value: function resetPassword(event) {
            event.preventDefault();
            if ((0, _listCheck.noFalse)(this.passRecVals)) {
                var userService = new _UserService.UserService();
                var authenticateService = new _AuthenticateService.AuthenticateService();
                authenticateService.resetPassword(this.email.value.toString()).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    console.log(res);
                    window.location.href = 'index.html';
                });
            }
        }
    }, {
        key: 'logout',
        value: function logout(event) {
            event.preventDefault();
            var authenticateService = new _AuthenticateService.AuthenticateService();
            authenticateService.logout().then(function (res) {
                if (res.status == 400) {
                    alert("Houve um erro ao Deslogar");
                }
                if (res.status == 200) {
                    localStorage.removeItem("tkn");
                    localStorage.removeItem("email");
                    localStorage.removeItem("id");
                    window.location.href = 'index.html';
                }
            }).catch(function (error) {
                console.log("error: ", error);
                return error;
            });
        }
    }]);

    return AuthenticateController;
}();
},{"../services/AuthenticateService":"app/js/services/AuthenticateService.js","../helpers/index":"app/js/helpers/index.js","../validation/userValidate":"app/js/validation/userValidate.js","../utils/listCheck":"app/js/utils/listCheck.js","../services/UserService":"app/js/services/UserService.js"}],"app/js/logout.js":[function(require,module,exports) {
"use strict";

var _AuthenticateController = require("./controllers/AuthenticateController");

var controller = new _AuthenticateController.AuthenticateController();
var logout = document.querySelector("#logout");
if (logout) {
    logout.addEventListener('click', controller.logout.bind(controller));
}
},{"./controllers/AuthenticateController":"app/js/controllers/AuthenticateController.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '43677' + '/');
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app/js/logout.js"], null)
//# sourceMappingURL=/logout.bb427f21.map