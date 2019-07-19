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
})({"app/js/config/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HOST = void 0;
var HOST = 'http://localhost:3000/';
exports.HOST = HOST;
},{}],"app/js/services/DailyNoteService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyNoteService = void 0;

var _index = require("../config/index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DailyNoteService =
/*#__PURE__*/
function () {
  function DailyNoteService() {
    _classCallCheck(this, DailyNoteService);
  }

  _createClass(DailyNoteService, [{
    key: "add",
    value: function add(yesterday, today, impediment, date) {
      fetch("".concat(_index.HOST, "dailys/daily"), {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          "Authorization": "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
        },
        body: JSON.stringify({
          "yesterday": yesterday,
          "today": today,
          "impediment": impediment,
          "date": new Date().toISOString().slice(0, 10),
          "email": localStorage.getItem('email')
        })
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        if (res.status == 200) {
          console.log("funcionou");
        }
      });
    }
  }, {
    key: "update",
    value: function update(daily, ID) {
      console.log(ID);
      return fetch("".concat(_index.HOST, "dailys/daily/").concat(ID), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
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
    key: "listDate",
    value: function listDate(data, page) {
      console.log("".concat(_index.HOST, "dailys/daily/").concat(data, "/1"));
      return fetch("".concat(_index.HOST, "dailys/daily/").concat(data, "/1"), {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          "Authorization": "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
        }
      });
    }
  }, {
    key: "listAll",
    value: function listAll() {
      return fetch("".concat(_index.HOST, "dailys"), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
        }
      });
    }
  }, {
    key: "listDailyById",
    value: function listDailyById(id) {
      return fetch("".concat(_index.HOST, "dailys/").concat(id), {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          "Authorization": "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
        }
      });
    }
  }]);

  return DailyNoteService;
}();

exports.DailyNoteService = DailyNoteService;
},{"../config/index":"app/js/config/index.js"}],"app/js/models/DailyNote.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyNote = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DailyNote =
/*#__PURE__*/
function () {
  function DailyNote(yesterday, today, impediment, date) {
    _classCallCheck(this, DailyNote);

    this.yesterday = yesterday;
    this.today = today;
    this.impediment = impediment;
    this.date = date;
  }

  _createClass(DailyNote, [{
    key: "Yesterday",
    get: function get() {
      return this.yesterday;
    }
  }, {
    key: "Today",
    get: function get() {
      return this.today;
    }
  }, {
    key: "Impediment",
    get: function get() {
      return this.impediment;
    }
  }, {
    key: "Date",
    get: function get() {
      return this.date;
    }
  }]);

  return DailyNote;
}();

exports.DailyNote = DailyNote;
},{}],"app/js/utils/InputWrapper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputWrapper = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputWrapper =
/*#__PURE__*/
function () {
  function InputWrapper(el) {
    _classCallCheck(this, InputWrapper);

    this.el = el;
    this.msgDiv = el.nextElementSibling;
  }

  _createClass(InputWrapper, [{
    key: "setValid",
    value: function setValid(valid, msg) {
      this.el.classList.remove('is-valid');
      this.el.classList.remove('is-invalid');
      this.el.classList.add(valid ? 'is-valid' : 'is-invalid');
      this.msgDiv.className = valid ? 'valid-feedback' : 'invalid-feedback';
      if (msg !== undefined) this.setMsg(msg);
    }
  }, {
    key: "setMsg",
    value: function setMsg(msg) {
      this.msgDiv.textContent = msg;
    }
  }, {
    key: "value",
    get: function get() {
      return this.el.value;
    }
  }], [{
    key: "fromId",
    value: function fromId(id) {
      return new InputWrapper(document.getElementById(id));
    }
  }]);

  return InputWrapper;
}();

exports.InputWrapper = InputWrapper;
},{}],"app/js/helpers/validate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;

var _InputWrapper = require("../utils/InputWrapper");

function validate(inputEl, fn) {
  for (var _len = arguments.length, opts = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    opts[_key - 2] = arguments[_key];
  }

  var input = new _InputWrapper.InputWrapper(inputEl);

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
},{"../utils/InputWrapper":"app/js/utils/InputWrapper.js"}],"app/js/helpers/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validate = require("./validate");

Object.keys(_validate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _validate[key];
    }
  });
});
},{"./validate":"app/js/helpers/validate.js"}],"app/js/validation/dailyNoteValidate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yesterday = yesterday;
exports.today = today;
exports.impediment = impediment;

function yesterday(first) {
  if (!(first.value.trim().length > 3)) {
    return 'Descrição muito pequena.';
  } else {
    return null;
  }
}

function today(today) {
  if (!(today.value.trim().length > 3)) {
    return 'Descrição muito pequena.';
  } else {
    return null;
  }
}

function impediment(third) {
  if (!(third.value.trim().length > 3)) {
    return 'Descrição muito pequena.';
  } else {
    return null;
  }
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
},{}],"app/js/controllers/EditDailyController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditDailyController = void 0;

var _DailyNoteService = require("../services/DailyNoteService");

var _DailyNote = require("../models/DailyNote");

var _index = require("../helpers/index");

var vals = _interopRequireWildcard(require("../validation/dailyNoteValidate"));

var _listCheck = require("../utils/listCheck");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EditDailyController =
/*#__PURE__*/
function () {
  function EditDailyController() {
    _classCallCheck(this, EditDailyController);

    this.yesterday = document.querySelector('#edit-yesterday');
    this.today = document.querySelector('#edit-today');
    this.impediment = document.querySelector('#edit-impediment');
    this.idDaily = document.querySelector('#idDaily');
    this.addVals = [(0, _index.validate)(this.yesterday, vals.yesterday), (0, _index.validate)(this.today, vals.today), (0, _index.validate)(this.impediment, vals.impediment)];
  }

  _createClass(EditDailyController, [{
    key: "getDailyData",
    value: function getDailyData(id) {
      var _this = this;

      var dailyService = new _DailyNoteService.DailyNoteService();
      return dailyService.listDailyById(id).then(function (res) {
        return res.json();
      }).then(function (result) {
        _this.yesterday.value = result.yesterday;
        _this.today.value = result.today;
        _this.impediment.value = result.impediment;
        _this.idDaily.value = result._id;
      });
    }
  }, {
    key: "update",
    value: function update(event) {
      event.preventDefault();
      var id = document.querySelector('#idDaily');

      if ((0, _listCheck.noFalse)(this.addVals)) {
        var daily = new _DailyNote.DailyNote(this.yesterday.value.toString(), this.today.value.toString(), this.impediment.value.toString(), new Date());
        var dailyService = new _DailyNoteService.DailyNoteService();
        return dailyService.update(daily, this.idDaily.value.toString());
      }
    }
  }]);

  return EditDailyController;
}();

exports.EditDailyController = EditDailyController;
},{"../services/DailyNoteService":"app/js/services/DailyNoteService.js","../models/DailyNote":"app/js/models/DailyNote.js","../helpers/index":"app/js/helpers/index.js","../validation/dailyNoteValidate":"app/js/validation/dailyNoteValidate.js","../utils/listCheck":"app/js/utils/listCheck.js"}],"app/js/services/UserService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserService = void 0;

var _index = require("../config/index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserService =
/*#__PURE__*/
function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, [{
    key: "add",
    value: function add(user) {
      return fetch("".concat(_index.HOST, "users/user"), {
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
    key: "list",
    value: function list() {
      return fetch("".concat(_index.HOST, "admin/users"), {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
        }
      });
    }
  }, {
    key: "update",
    value: function update(user, ID) {
      var dateOfBirth = user.DateOfBirth.replace(/,/g, '-');
      return fetch("".concat(_index.HOST, "users/user/").concat(ID), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
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
    key: "remove",
    value: function remove(ID) {
      return fetch("".concat(_index.HOST, "users/user/").concat(ID), {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
        }
      });
    }
  }, {
    key: "changePassword",
    value: function changePassword(email, password) {
      return fetch("".concat(_index.HOST, "users/changePassword"), {
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
    key: "findByEmail",
    value: function findByEmail(email) {
      return fetch("".concat(_index.HOST, "users/").concat(email), {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
        }
      });
    }
  }, {
    key: "getData",
    value: function getData() {
      var email = localStorage.getItem('email');
      return fetch("".concat(_index.HOST, "users/").concat(email), {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
        }
      });
    }
  }]);

  return UserService;
}();

exports.UserService = UserService;
},{"../config/index":"app/js/config/index.js"}],"app/js/services/HelpCenterService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpCenterService = void 0;

var _index = require("../config/index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HelpCenterService =
/*#__PURE__*/
function () {
  function HelpCenterService() {
    _classCallCheck(this, HelpCenterService);
  }

  _createClass(HelpCenterService, [{
    key: "add",
    value: function add(post) {
      return fetch("".concat(_index.HOST, "helps/post/"), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
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
    key: "update",
    value: function update(post, ID) {
      return fetch("".concat(_index.HOST, "helps/post/").concat(ID), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
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
    key: "list",
    value: function list(page) {
      return fetch("".concat(_index.HOST, "helps/list/post/").concat(page), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
        }
      });
    }
  }, {
    key: "listLastHelp",
    value: function listLastHelp() {
      return fetch("".concat(_index.HOST, "helps/last/"), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
        }
      });
    }
  }, {
    key: "remove",
    value: function remove(ID) {
      return fetch("".concat(_index.HOST, "helps/post/").concat(ID), {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
        }
      });
    }
  }, {
    key: "findByJoker",
    value: function findByJoker(joker) {
      return fetch("".concat(_index.HOST, "helps/post/joker/1"), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
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

exports.HelpCenterService = HelpCenterService;
},{"../config/index":"app/js/config/index.js"}],"app/js/views/View.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View =
/*#__PURE__*/
function () {
  function View(selector) {
    var escape = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, View);

    var temp = document.querySelector(selector);

    if (temp) {
      this._el = temp;
    } else {
      throw new Error("Element ".concat(selector, " not found"));
    }

    this._escape = escape;
  }

  _createClass(View, [{
    key: "update",
    value: function update(model) {
      var template = this.template(model);
      if (this._escape) template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
      this._el.innerHTML = template;
    }
  }]);

  return View;
}();

exports.View = View;
},{}],"app/js/views/UserMenuView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMenuView = void 0;

var _View2 = require("./View");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var UserMenuView =
/*#__PURE__*/
function (_View) {
  _inherits(UserMenuView, _View);

  function UserMenuView() {
    _classCallCheck(this, UserMenuView);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserMenuView).apply(this, arguments));
  }

  _createClass(UserMenuView, [{
    key: "template",
    value: function template() {
      return localStorage.getItem('tkn') ? "\n            <div class=\"dropdown mr-n4 txt-user\" style=\"float:right;\">\n                <div class=\"d-flex align-items-center btn\" data-toggle=\"dropdown\">\n                    <span id=\"nameSpan\"></span>\n                    <img src=\"https://www.pngkit.com/png/detail/281-2812821_user-account-management-logo-user-icon-png.png\" class=\"rounded-circle\" width=\"60px\">\n                    <i class=\"material-icons ml-n2\">arrow_drop_down</i>\n                </div>\n                <div class=\"dropdown-menu dropdown-menu-right align-user\">\n                    <div class=\"dropdown-item\">    \n                        Usu\xE1rio: <span id=\"userNameSpan\"></span>\n                    </div>\n                    <div class=\"dropdown-divider\"></div>\n\n                    <a class=\"dropdown-item d-flex align-items-center\" href=\"user-edit.html\">\n                        <i class=\"material-icons mr-2\">edit</i>Alterar Cadastro</a>\n                    <a class=\"dropdown-item d-flex align-items-center\" href=\"home.html\">\n                        <i class=\"material-icons mr-2\">home</i>Home</a>\n\n                    <div class=\"dropdown-divider\"></div>\n\n                    <a class=\"dropdown-item d-flex align-items-center\" id=\"logout\">\n                        <i class=\"material-icons mr-2\">power_settings_new</i><strong>Sair</strong></a>\n                </div>\n            </div>\n        " : "<a href=\"index.html\" class=\"menu-item\"><h5><strong>Login</strong></h5></a>";
    }
  }]);

  return UserMenuView;
}(_View2.View);

exports.UserMenuView = UserMenuView;
},{"./View":"app/js/views/View.js"}],"app/js/controllers/HomeController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeController = void 0;

var _UserService = require("../services/UserService");

var _HelpCenterService = require("../services/HelpCenterService");

var _DailyNoteService = require("../services/DailyNoteService");

var _UserMenuView = require("../views/UserMenuView");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HomeController =
/*#__PURE__*/
function () {
  function HomeController() {
    _classCallCheck(this, HomeController);

    this.user = new _UserMenuView.UserMenuView("#user-menu-login-link");
    this.user.update('');
  }

  _createClass(HomeController, [{
    key: "getUser",
    value: function getUser() {
      var data;

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
          row.innerHTML += "\n                    <div class=\"card d-flex flex-row justify-content-center align-items-stretch row mb-3\">\n                        <div class=\"col-md-3 col-12 text-center d-flex align-items-stretch\">\n                            <div class=\"d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100\">\n                                <div>\n                                    <h5 class=\"mt-2 mb-2 ml-4\">Usu\xE1rio</h5>\n                                    <button type=\"button\" name=\"view\"\n                                        class=\"btn btn-outline-info btn-sm input-circle pt-2 ml-4\" id=\"resp-view\"\n                                        data-toggle=\"modal\" data-target=\"#respModal\">\n                                        <i class=\"small material-icons\">description</i>\n                                    </button>\n                                </div>  \n                            </div>\n                        </div>\n                        <div class=\"col-md-9 col-12 card-body\">\n                            <div class=\"card mb-2\">\n                                <div class=\"card-body\">\n                                    <h5>".concat(result.docs[i]['title'], "</h5>\n                                    <p>").concat(result.docs[i]['desc'], "</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    ");
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
      var fullDate = "".concat(year, "-").concat(month, "-").concat(day);
      dailyNoteService.listDate(fullDate, 1).then(function (result) {
        return result.json();
      }).then(function (result) {
        var row = document.querySelector('#all-dailys');

        for (var i = 0; i < result.length - 1; i++) {
          row.innerHTML += "\n                    <tr>\n                        <td>".concat(result[i]['owner'], "</td>\n                        <td>").concat(result[i]['yesterday'], "</td>\n                        <td>").concat(result[i]['today'], "</td>\n                        <td>").concat(result[i]['impediment'], "</td>\n                    </tr>\n                    ");
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }]);

  return HomeController;
}();

exports.HomeController = HomeController;
},{"../services/UserService":"app/js/services/UserService.js","../services/HelpCenterService":"app/js/services/HelpCenterService.js","../services/DailyNoteService":"app/js/services/DailyNoteService.js","../views/UserMenuView":"app/js/views/UserMenuView.js"}],"app/js/utils/userData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = getUser;

var _HomeController = require("../controllers/HomeController");

function getUser() {
  var homeController = new _HomeController.HomeController();
  var data = homeController.getUser();

  if (data) {
    data.then(function (data) {
      var userData = {
        name: data.name,
        userName: data.userName
      };
      return userData;
    }).then(function (userData) {
      document.querySelector('#nameSpan').innerHTML = userData.name;
      document.querySelector('#userNameSpan').innerHTML = userData.userName;
    });
  }
}
},{"../controllers/HomeController":"app/js/controllers/HomeController.js"}],"app/js/daily-edit.js":[function(require,module,exports) {
"use strict";

var _EditDailyController = require("./controllers/EditDailyController");

var _userData = require("./utils/userData");

var url = new URLSearchParams(location.search);
var url_owner = url.get('owner');
var url_daily = url.get('id');
var idResult = document.querySelector('#editResult');
var userData = (0, _userData.getUser)();

if (localStorage.getItem('isAdmin') == 'true' || localStorage.getItem('id') === url_owner) {
  var update = document.getElementById('editdaily-form');

  if (update) {
    var editController = new _EditDailyController.EditDailyController();
    update.addEventListener("submit", function (e) {
      editController.update(e).then(function (res) {
        if (res.status === 200) {
          idResult.textContent = "Daily Editada com sucesso";
          idResult.className = "alert alert-info";
        }
      });
    });
  }

  var editDailyController = new _EditDailyController.EditDailyController().getDailyData(url_daily);
} else {
  window.location.href = "index.html";
}
},{"./controllers/EditDailyController":"app/js/controllers/EditDailyController.js","./utils/userData":"app/js/utils/userData.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61111" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app/js/daily-edit.js"], null)
//# sourceMappingURL=/daily-edit.4c296a73.js.map