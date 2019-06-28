// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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
      localRequire.cache = {};

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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/dist/validate/validate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function validate(input, fn) {
  var opts = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    opts[_i - 2] = arguments[_i];
  }

  var handle = function handle() {
    var msg = fn.apply(void 0, [input].concat(opts));

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

exports.validate = validate;
},{}],"js/dist/validate/InputWrapper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var InputWrapper = function () {
  function InputWrapper(el) {
    this.el = el;
    this.msgDiv = el.nextElementSibling;
  }

  InputWrapper.prototype.setValid = function (valid, msg) {
    this.el.classList.remove('is-valid');
    this.el.classList.remove('is-invalid');
    this.el.classList.add(valid ? 'is-valid' : 'is-invalid');
    this.msgDiv.className = valid ? 'valid-feedback' : 'invalid-feedback';
    if (msg !== undefined) this.setMsg(msg);
  };

  InputWrapper.prototype.setMsg = function (msg) {
    this.msgDiv.textContent = msg;
  };

  Object.defineProperty(InputWrapper.prototype, "value", {
    get: function get() {
      return this.el.value;
    },
    enumerable: true,
    configurable: true
  });

  InputWrapper.fromId = function (id) {
    return new InputWrapper(document.getElementById(id));
  };

  return InputWrapper;
}();

exports.InputWrapper = InputWrapper;
},{}],"js/dist/validate/index.js":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./validate"));

__export(require("./InputWrapper"));
},{"./validate":"js/dist/validate/validate.js","./InputWrapper":"js/dist/validate/InputWrapper.js"}],"js/dist/config/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HOST = 'https://100contrato.azurewebsites.net/';
},{}],"js/dist/validate-fns.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function code(code) {
  if (!code.value) {
    return 'Código obrigatório.';
  }

  return null;
}

exports.code = code;

function date(date) {
  var inputDate = new Date(date.value);
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

exports.date = date;

function email(email) {
  if (!email.value) {
    return 'Email vazio.';
  } else if (!/^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9_-])+(\.([a-zA-Z0-9_-])+)+$/.test(email.value)) {
    return 'Email inválido. Exemplo: abc123@def.gh';
  }
}

exports.email = email;

function lastName(lastName) {
  if (!(lastName.value.length > 2)) {
    return 'Sobrenome muito curto.';
  } else if (!/[A-Z]([a-z]|\s)+$/.test(lastName.value)) {
    return 'Sobrenome inválido: Use uma letra maiúscula seguida de letras minúsculas.';
  } else if (/\s\s/.test(lastName.value)) {
    return 'Sobrenome inválido: Dois ou mais espaços consecutivos.';
  } else if (/\s[A-z]\s/.test(lastName.value)) {
    return 'Sobrenome inválido: Caracter solitário :(.';
  }

  return null;
}

exports.lastName = lastName;

function name(name) {
  if (!(name.value.length > 2)) {
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

exports.name = name;

function password(pw) {
  if (pw.value.length < 6 || pw.value.length > 8) {
    return 'Senha deve ter tamanho entre 6 e 8 dígitos.';
  } else if (pw.value.indexOf(' ') !== -1) {
    return 'Senha não pode conter espaços.';
  }

  return null;
}

exports.password = password;

function passwordConfirm(pw, confirm) {
  if (!pw.value) {
    return 'Confirmação obrigatória.';
  } else if (pw.value !== confirm.value) {
    return 'Senhas não batem';
  }

  return null;
}

exports.passwordConfirm = passwordConfirm;
var ALLOWED_EXTS = ['png', 'jpg', 'jpeg'];

function photo(file) {
  if (!file.value) {
    return 'Imagem obrigatória.';
  }

  var fileExt = file.value.split('.').pop();

  if (ALLOWED_EXTS.indexOf(fileExt) === -1) {
    return 'Formato de arquivo de imagem inválido.';
  } else {
    return null;
  }
}

exports.photo = photo;

function username(username) {
  if (!(username.value.length > 2)) {
    return 'Nome de usuário muito curto.';
  } else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(username.value)) {
    return 'Nome de usuário inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
  }
}

exports.username = username;

function yesterday(first) {
  if (!(first.value.length > 3)) {
    return 'Descrição muito pequena.';
  } else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(first.value)) {
    return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
  }
}

exports.yesterday = yesterday;

function today(today) {
  if (!(today.value.length > 3)) {
    return 'Descrição muito pequena.';
  } else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(today.value)) {
    return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
  }
}

exports.today = today;

function impediment(third) {
  if (!(third.value.length > 3)) {
    return 'Descrição muito pequena.';
  } else if (!/^([a-zA-Z0-9]|_|\$|@|\-|\.)+$/.test(third.value)) {
    return 'Nome de daily inválido: Somente são permitidos caracteres alfanuméricos e os especiais "_$@-.".';
  }
}

exports.impediment = impediment;
},{}],"js/dist/utils/listCheck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function noFalse(fns) {
  var isValid = true;
  fns.forEach(function (fn) {
    if (!fn()) {
      isValid = false;
    }
  });
  return isValid;
}

exports.noFalse = noFalse;
},{}],"js/dist/user-register-utils.js":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = require("./validate/index");

var index_2 = require("./config/index");

var val = __importStar(require("./validate-fns"));

var listCheck_1 = require("./utils/listCheck");

var dateInput = index_1.InputWrapper.fromId('birthdate');
var emailInput = index_1.InputWrapper.fromId('email');
var lastNameInput = index_1.InputWrapper.fromId('lastname');
var nameInput = index_1.InputWrapper.fromId('name');
var passwordInput = index_1.InputWrapper.fromId('password');
var passwordConfirmInput = index_1.InputWrapper.fromId('passwordConfirm');
var photoInput = index_1.InputWrapper.fromId('photo');
var usernameInput = index_1.InputWrapper.fromId('username');
var valFns = [index_1.validate(dateInput, val.date), index_1.validate(emailInput, val.email), index_1.validate(lastNameInput, val.lastName), index_1.validate(nameInput, val.name), index_1.validate(passwordInput, val.password), index_1.validate(passwordConfirmInput, val.passwordConfirm, passwordInput), index_1.validate(photoInput, val.photo), index_1.validate(usernameInput, val.username)];
var send = document.getElementById("file_send");
var customTxt = document.getElementById("custom-text");
send.addEventListener("click", function () {
  photoInput.el.click();
});
photoInput.el.addEventListener("change", function () {
  if (photoInput.value) {
    customTxt.innerHTML = photoInput.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
  } else {
    customTxt.innerHTML = "Nenhuma imagem selecionada.";
  }
});
var form = document.getElementById('user-register');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (listCheck_1.noFalse(valFns)) {
    grecaptcha.ready(function () {
      grecaptcha.execute('6LemuakUAAAAALHHE5_7NL8FwKzEvCXLXzUUqahn', {
        action: 'user_register'
      }).then(function (token) {
        var formData = new FormData(form);
        formData.append('recaptchaToken', token);
        fetch(index_2.HOST + "users/user", {
          method: 'POST',
          body: formData
        }).then(function (res) {
          return res.json();
        }).then(function (data) {
          console.log(data);
          location.replace("index.html");
        }).catch(console.log);
      });
    });
  }
});
},{"./validate/index":"js/dist/validate/index.js","./config/index":"js/dist/config/index.js","./validate-fns":"js/dist/validate-fns.js","./utils/listCheck":"js/dist/utils/listCheck.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55900" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/dist/user-register-utils.js"], null)
//# sourceMappingURL=/user-register-utils.e6754db8.js.map