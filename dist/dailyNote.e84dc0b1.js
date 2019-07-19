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
})({"app/js/models/DailyNote.js":[function(require,module,exports) {
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
},{}],"app/js/config/index.js":[function(require,module,exports) {
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
          "Authorization": "Bearer ".concat(localStorage.getItem('tkn'))
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
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
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
          "Authorization": "Bearer ".concat(localStorage.getItem('tkn'))
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
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
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
          "Authorization": "Bearer ".concat(localStorage.getItem('tkn'))
        }
      });
    }
  }]);

  return DailyNoteService;
}();

exports.DailyNoteService = DailyNoteService;
},{"../config/index":"app/js/config/index.js"}],"app/js/utils/InputWrapper.js":[function(require,module,exports) {
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
},{}],"app/js/controllers/DailyNoteController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyNoteController = void 0;

var _DailyNote = require("../models/DailyNote");

var _DailyNoteService = require("../services/DailyNoteService");

var _index = require("../helpers/index");

var vals = _interopRequireWildcard(require("../validation/dailyNoteValidate"));

var _listCheck = require("../utils/listCheck");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DailyNoteController =
/*#__PURE__*/
function () {
  function DailyNoteController() {
    _classCallCheck(this, DailyNoteController);

    this.yesterday = document.querySelector('#yesterday');
    this.today = document.querySelector('#today');
    this.impediment = document.querySelector('#impediment');
    this.date = document.querySelector('#date');
    this.listDate = document.querySelector('#filter');
    this.editYesterday = document.querySelector('#edit-yesterday');
    this.editToday = document.querySelector('#edit-today');
    this.editImpediment = document.querySelector('#edit-impediment');
    this.addVals = [(0, _index.validate)(this.yesterday, vals.yesterday), (0, _index.validate)(this.today, vals.today), (0, _index.validate)(this.impediment, vals.impediment)];
    this.editVals = [(0, _index.validate)(this.editYesterday, vals.yesterday), (0, _index.validate)(this.editToday, vals.today), (0, _index.validate)(this.editImpediment, vals.impediment)];
  }

  _createClass(DailyNoteController, [{
    key: "add",
    value: function add(event) {
      event.preventDefault();

      if ((0, _listCheck.noFalse)(this.addVals)) {
        var dailyNote = new _DailyNote.DailyNote(this.yesterday.value.toString(), this.today.value.toString(), this.impediment.value.toString(), new Date());
        var dailyNoteService = new _DailyNoteService.DailyNoteService();
        var dailyNoteAux = dailyNoteService.add(this.yesterday.value, this.today.value, this.impediment.value, new Date());
      }
    }
  }, {
    key: "listD",
    value: function listD(event) {
      event.preventDefault();
      var date = document.querySelector('#date_filter');
      var urlDate = new URLSearchParams(location.search).get('date');
      var value = date.value || urlDate;
      var url_page = new URLSearchParams(location.search).get('page');
      var page = parseInt(url_page) || 1;
      var dailyNoteService = new _DailyNoteService.DailyNoteService();
      var year = date.value.slice(0, 4);
      var month = date.value.slice(6, 7);
      var day = date.value.slice(8, 10);
      day = ("00" + day).slice(-2);
      month = ("00" + month).slice(-2);
      var fullDate = "".concat(year, "-").concat(month, "-").concat(day);
      return dailyNoteService.listDate(fullDate, page).then(function (res) {
        return res.json();
      }).then(function (result) {
        return result;
      });
    }
  }]);

  return DailyNoteController;
}();

exports.DailyNoteController = DailyNoteController;
},{"../models/DailyNote":"app/js/models/DailyNote.js","../services/DailyNoteService":"app/js/services/DailyNoteService.js","../helpers/index":"app/js/helpers/index.js","../validation/dailyNoteValidate":"app/js/validation/dailyNoteValidate.js","../utils/listCheck":"app/js/utils/listCheck.js"}],"app/js/models/Authenticate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Authenticate = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Authenticate =
/*#__PURE__*/
function () {
  function Authenticate(email, password) {
    _classCallCheck(this, Authenticate);

    this.email = email;
    this.password = password;
  }

  _createClass(Authenticate, [{
    key: "Email",
    get: function get() {
      return this.email;
    }
  }, {
    key: "Password",
    get: function get() {
      return this.password;
    }
  }]);

  return Authenticate;
}();

exports.Authenticate = Authenticate;
},{}],"app/js/models/User.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
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

exports.User = User;
},{}],"app/js/models/Post.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Post =
/*#__PURE__*/
function () {
  function Post(title, desc, authorId, authorName, id) {
    _classCallCheck(this, Post);

    this.title = title;
    this.desc = desc;
    this.authorId = authorId;
    this.authorName = authorName;
    this.id = id;
  }

  _createClass(Post, [{
    key: "Title",
    get: function get() {
      return this.title;
    }
  }, {
    key: "Desc",
    get: function get() {
      return this.desc;
    }
  }, {
    key: "AuthorId",
    get: function get() {
      return this.authorId;
    }
  }, {
    key: "AuthorName",
    get: function get() {
      return this.authorName;
    }
  }, {
    key: "Id",
    get: function get() {
      return this.id;
    }
  }]);

  return Post;
}();

exports.Post = Post;
},{}],"app/js/models/Posts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Posts = void 0;

var _index = require("./index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Posts =
/*#__PURE__*/
function () {
  function Posts() {
    _classCallCheck(this, Posts);

    this._posts = [];
  }

  _createClass(Posts, [{
    key: "add",
    value: function add(post) {
      this._posts.push(post);
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [].concat(this._posts);
    }
  }, {
    key: "get",
    value: function get(i) {
      return this._posts[i];
    }
  }], [{
    key: "from",
    value: function from(arr) {
      var newPosts = new Posts();
      arr.forEach(function (val) {
        newPosts.add(new _index.Post(val.title, val.desc, val.id_user, val.owner, val._id));
      });
      return newPosts;
    }
  }]);

  return Posts;
}();

exports.Posts = Posts;
},{"./index":"app/js/models/index.js"}],"app/js/models/PostAsk.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostAsk = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PostAsk =
/*#__PURE__*/
function () {
  function PostAsk(id_helpCenter, desc, id_user, authorName, id) {
    _classCallCheck(this, PostAsk);

    this.id_helpCenter = id_helpCenter;
    this.desc = desc;
    this.id_user = id_user;
    this.authorName = authorName;
    this.id = id;
  }

  _createClass(PostAsk, [{
    key: "helpCenter",
    get: function get() {
      return this.id_helpCenter;
    }
  }, {
    key: "Desc",
    get: function get() {
      return this.desc;
    }
  }, {
    key: "Author",
    get: function get() {
      return this.id_user;
    }
  }, {
    key: "Id",
    get: function get() {
      return this.id;
    }
  }, {
    key: "AuthorName",
    get: function get() {
      return this.authorName;
    }
  }]);

  return PostAsk;
}();

exports.PostAsk = PostAsk;
},{}],"app/js/models/PostAsks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostAsks = void 0;

var _index = require("./index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PostAsks =
/*#__PURE__*/
function () {
  function PostAsks() {
    _classCallCheck(this, PostAsks);

    this._postAsks = [];
  }

  _createClass(PostAsks, [{
    key: "add",
    value: function add(postAsk) {
      this._postAsks.push(postAsk);
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [].concat(this._postAsks);
    }
  }], [{
    key: "from",
    value: function from(arr) {
      var newPostAsks = new PostAsks();
      arr.forEach(function (val) {
        newPostAsks.add(new _index.PostAsk(val.id_helpCenter, val.desc, val.id_user, val.owner, val._id));
      });
      return newPostAsks;
    }
  }]);

  return PostAsks;
}();

exports.PostAsks = PostAsks;
},{"./index":"app/js/models/index.js"}],"app/js/models/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Authenticate = require("./Authenticate");

Object.keys(_Authenticate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Authenticate[key];
    }
  });
});

var _User = require("./User");

Object.keys(_User).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _User[key];
    }
  });
});

var _DailyNote = require("./DailyNote");

Object.keys(_DailyNote).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _DailyNote[key];
    }
  });
});

var _Post = require("./Post");

Object.keys(_Post).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Post[key];
    }
  });
});

var _Posts = require("./Posts");

Object.keys(_Posts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Posts[key];
    }
  });
});

var _PostAsk = require("./PostAsk");

Object.keys(_PostAsk).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _PostAsk[key];
    }
  });
});

var _PostAsks = require("./PostAsks");

Object.keys(_PostAsks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _PostAsks[key];
    }
  });
});
},{"./Authenticate":"app/js/models/Authenticate.js","./User":"app/js/models/User.js","./DailyNote":"app/js/models/DailyNote.js","./Post":"app/js/models/Post.js","./Posts":"app/js/models/Posts.js","./PostAsk":"app/js/models/PostAsk.js","./PostAsks":"app/js/models/PostAsks.js"}],"app/js/dailyNote.js":[function(require,module,exports) {
"use strict";

var _DailyNoteController = require("./controllers/DailyNoteController");

var _index = require("./models/index");

var dailyesResult = document.querySelector("#dayliesResult");
var totalPagesDiv = document.querySelector("#pages");
var id_daily;
var url = new URLSearchParams(location.search);
var url_date = url.get('date');
var dateField = document.querySelector('#date_filter');
var dateValue = dateField.value || url_date;
var controller = new _DailyNoteController.DailyNoteController();
var cadastrar = document.querySelector("#daily-form");

if (cadastrar) {
  cadastrar.addEventListener('submit', controller.add.bind(controller));
}

var listDate = document.querySelector("#filter");

if (listDate) {
  if (dailyesResult) {
    listDate.addEventListener('click', listDateDaily);
  }
}

window.addEventListener("load", function () {
  if (url.get('date') && url.get('page')) {
    listDateDaily(event);
  }
});

function listDateDaily(event) {
  dailyesResult.innerHTML = '';
  var result = controller.listD(event);

  if (result) {
    result.then(function (result) {
      result.forEach(function (r) {
        var daily = new _index.DailyNote(r.yesterday, r.today, r.impediment, new Date(r.date));
        var totalPages;

        if (r.hasOwnProperty('totalPages')) {
          totalPages = parseInt(r.totalPages);
          var header_pagination = '';
          ;
          var string_li = '';
          var footer_pagination = '';

          if (totalPagesDiv) {
            header_pagination = "\n                        <nav aria-label=\"daily-nav\" class=\"float-right\">\n                        <ul class=\"pagination\">\n                        <li class=\"page-item\">\n                        </a>\n                        </li>\n                        ";
            var i = 0;
            string_li = '';

            for (i; i < totalPages; i++) {
              string_li += "\n                            <li class=\"page-item\"><a class=\"page-link\" href=\"app-daily-note.html?page=".concat(i + 1, "&date=").concat(dateValue, "\">").concat(i + 1, "</a></li>\n                            ");
            }

            footer_pagination = "\n                        <li class=\"page-item\" >\n                        \n                        ";
            var nav_pagination = document.createElement('nav');
            var fullString = header_pagination + string_li + footer_pagination;
            nav_pagination.innerHTML = fullString;
            totalPagesDiv.innerHTML = '';
            totalPagesDiv.append(nav_pagination);
          }

          return;
        }

        var owner = r.owner;
        var id_owner = r.id_user;
        id_daily = r.id_daily;

        if (dailyesResult) {
          mountTable(dailyesResult, daily, owner, id_owner, id_daily);
        }

        id_daily = '';
        return;
      });
    });
  }
}

function mountTable(dayliesResult, daily, owner, id_user, id_daily) {
  var body = document.createElement('tr');

  if (localStorage.getItem('isAdmin') === 'true' || id_user === localStorage.getItem('id')) {
    body.innerHTML = "<tr>\n                <td>".concat(owner, "</td>\n                <td>").concat(daily.Date.getUTCDate(), "/").concat(daily.Date.getUTCMonth() + 1, "/").concat(daily.Date.getUTCFullYear(), " </td>\n                <td>").concat(daily.Yesterday, "</td>\n                <td>").concat(daily.Today, "</td>\n                <td>").concat(daily.Impediment, "</td>\n                <td>\n                    <a href=\"daily-edit.html?id=").concat(id_daily, "&owner=").concat(id_user, "\"\n                        class=\"btn btn-outline-warning btn-sm input-circle pt-2 mr-2\" id=\"edit-daily\">\n                        <i class=\"small material-icons\" id=\"teste\">edit</i>\n                    </a>\n                </td>\n                </tr>");
  } else {
    body.innerHTML = "<tr>\n                <td>".concat(owner, "</td>\n                <td>").concat(daily.Date.getUTCDate(), "/").concat(daily.Date.getUTCMonth() + 1, "/").concat(daily.Date.getUTCFullYear(), " </td>\n                <td>").concat(daily.Yesterday, "</td>\n                <td>").concat(daily.Today, "</td>\n                <td>").concat(daily.Impediment, "</td>\n                <td>         </td>\n                </tr>");
  }

  dailyesResult.append(body);
}
},{"./controllers/DailyNoteController":"app/js/controllers/DailyNoteController.js","./models/index":"app/js/models/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54293" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app/js/dailyNote.js"], null)
//# sourceMappingURL=/dailyNote.e84dc0b1.js.map