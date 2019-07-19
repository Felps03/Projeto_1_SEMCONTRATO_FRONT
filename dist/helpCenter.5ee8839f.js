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
})({"app/js/models/Authenticate.js":[function(require,module,exports) {
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
},{}],"app/js/models/DailyNote.js":[function(require,module,exports) {
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
},{"./Authenticate":"app/js/models/Authenticate.js","./User":"app/js/models/User.js","./DailyNote":"app/js/models/DailyNote.js","./Post":"app/js/models/Post.js","./Posts":"app/js/models/Posts.js","./PostAsk":"app/js/models/PostAsk.js","./PostAsks":"app/js/models/PostAsks.js"}],"app/js/config/index.js":[function(require,module,exports) {
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
<<<<<<< HEAD
          "Authorization": "Bearer ".concat(localStorage.getItem('tkn'))
=======
          "Authorization": "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
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
<<<<<<< HEAD
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
=======
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
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
<<<<<<< HEAD
          "Authorization": "Bearer ".concat(localStorage.getItem('tkn'))
=======
          "Authorization": "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
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
<<<<<<< HEAD
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
=======
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
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
<<<<<<< HEAD
          "Authorization": "Bearer ".concat(localStorage.getItem('tkn'))
=======
          "Authorization": "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
        }
      });
    }
  }]);

  return DailyNoteService;
}();

exports.DailyNoteService = DailyNoteService;
},{"../config/index":"app/js/config/index.js"}],"app/js/services/AuthenticateService.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateService = void 0;

var _index = require("../config/index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthenticateService =
/*#__PURE__*/
function () {
  function AuthenticateService() {
    _classCallCheck(this, AuthenticateService);
  }

  _createClass(AuthenticateService, [{
    key: "authenticate",
    value: function authenticate(email, password) {
<<<<<<< HEAD
      return fetch("".concat(_index.HOST, "users/authenticate"), {
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
      }).then(function (res) {
        var token = res.headers.get("Token");

        if (token != null) {
          localStorage.setItem('tkn', token);
        }

        return res.json();
      }).then(function (result) {
        console.log(result);
        localStorage.setItem('email', result[0]['email']);
        localStorage.setItem('id', result[0]['_id']);
        localStorage.setItem('isAdmin', result[0]['isAdmin']);
        window.location.href = "home.html";
=======
      return new Promise(function (resolve, reject) {
        fetch("".concat(_index.HOST, "users/authenticate"), {
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
        }).then(function (res) {
          if (res.status !== 200) {
            return reject(res);
          }

          var token = res.headers.get("Token");

          if (token != null) {
            localStorage.setItem('tkn', token);
          }

          res.json().then(function (result) {
            localStorage.setItem('email', result[0]['email']);
            localStorage.setItem('id', result[0]['_id']);
            localStorage.setItem('isAdmin', result[0]['isAdmin']);
            window.location.href = "home.html";
            resolve();
          });
        });
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
      });
    }
  }, {
    key: "resetPassword",
    value: function resetPassword(email) {
      return fetch("".concat(_index.HOST, "users/user/recover"), {
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
    key: "verifyCode",
    value: function verifyCode(emailCode, email, password) {
      return fetch("".concat(_index.HOST, "users/code/verify"), {
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
    key: "logout",
    value: function logout() {
      return fetch("".concat(_index.HOST, "users/logout"), {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem("tkn"))
        }
<<<<<<< HEAD
=======
      }).then(function (res) {
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
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
      });
    }
  }]);

  return AuthenticateService;
}();

exports.AuthenticateService = AuthenticateService;
},{"../config/index":"app/js/config/index.js"}],"app/js/services/UserService.js":[function(require,module,exports) {
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
<<<<<<< HEAD
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
=======
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
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
<<<<<<< HEAD
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
=======
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
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
<<<<<<< HEAD
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
=======
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
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
<<<<<<< HEAD
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
=======
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
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
<<<<<<< HEAD
    key: "findByTitle",
    value: function findByTitle(title) {
      return fetch("".concat(_index.HOST, "helps/post/title/1"), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
        },
        body: JSON.stringify({
          "title": title
        })
      });
    }
  }, {
    key: "findByDesc",
    value: function findByDesc(desc) {
      return fetch("".concat(_index.HOST, "helps/post/desc/1"), {
=======
    key: "findByJoker",
    value: function findByJoker(joker) {
      return fetch("".concat(_index.HOST, "helps/post/joker/1"), {
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
<<<<<<< HEAD
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
        },
        body: JSON.stringify({
          "desc": desc
=======
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
        },
        body: JSON.stringify({
          "joker": joker
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
        })
      });
    }
  }]);

  return HelpCenterService;
}();

exports.HelpCenterService = HelpCenterService;
},{"../config/index":"app/js/config/index.js"}],"app/js/services/HelpCenterServiceAsk.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpCenterAskService = void 0;

var _index = require("../config/index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HelpCenterAskService =
/*#__PURE__*/
function () {
  function HelpCenterAskService() {
    _classCallCheck(this, HelpCenterAskService);
  }

  _createClass(HelpCenterAskService, [{
    key: "add",
    value: function add(post) {
      console.log(post);
      return fetch("".concat(_index.HOST, "helps/ask/"), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
<<<<<<< HEAD
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
=======
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
        },
        body: JSON.stringify({
          "id_user": post.Author,
          "desc": post.Desc,
          "id_helpCenter": post.helpCenter
        })
      });
    }
  }, {
    key: "update",
    value: function update(post, ID) {
      return fetch("".concat(_index.HOST, "helps/ask/").concat(ID), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
<<<<<<< HEAD
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
=======
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
        },
        body: JSON.stringify({
          "id_user": post.Author,
          "desc": post.Desc,
          "id_helpCenter": post.helpCenter
        })
      });
    }
  }, {
    key: "list",
    value: function list(page) {
      return fetch("".concat(_index.HOST, "helps/list/ask/").concat(page), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
<<<<<<< HEAD
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
=======
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
        }
      });
    }
  }, {
    key: "remove",
    value: function remove(ID) {
      return fetch("".concat(_index.HOST, "helps/ask/").concat(ID), {
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
    key: "findById",
    value: function findById(ID) {
      return fetch("".concat(_index.HOST, "helps/ask/").concat(ID), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
<<<<<<< HEAD
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn'))
=======
          'Authorization': "Bearer ".concat(localStorage.getItem('tkn')),
          'id_user': localStorage.getItem('id')
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
        }
      });
    }
  }]);

  return HelpCenterAskService;
}();

exports.HelpCenterAskService = HelpCenterAskService;
},{"../config/index":"app/js/config/index.js"}],"app/js/services/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DailyNoteService = require("./DailyNoteService");

Object.keys(_DailyNoteService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _DailyNoteService[key];
    }
  });
});

var _AuthenticateService = require("./AuthenticateService");

Object.keys(_AuthenticateService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AuthenticateService[key];
    }
  });
});

var _UserService = require("./UserService");

Object.keys(_UserService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _UserService[key];
    }
  });
});

var _HelpCenterService = require("./HelpCenterService");

Object.keys(_HelpCenterService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _HelpCenterService[key];
    }
  });
});

var _HelpCenterServiceAsk = require("./HelpCenterServiceAsk");

Object.keys(_HelpCenterServiceAsk).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _HelpCenterServiceAsk[key];
    }
  });
});
},{"./DailyNoteService":"app/js/services/DailyNoteService.js","./AuthenticateService":"app/js/services/AuthenticateService.js","./UserService":"app/js/services/UserService.js","./HelpCenterService":"app/js/services/HelpCenterService.js","./HelpCenterServiceAsk":"app/js/services/HelpCenterServiceAsk.js"}],"app/js/utils/InputWrapper.js":[function(require,module,exports) {
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
},{"./validate":"app/js/helpers/validate.js"}],"app/js/validation/helpCenterValidate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.title = title;
exports.desc = desc;

function title(title) {
  if (!(title.value.trim().length > 3)) {
    return 'Título muito pequeno.';
  } else {
    return null;
  }
}

function desc(desc) {
  if (!(desc.value.trim().length > 3)) {
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
},{}],"app/js/views/View.js":[function(require,module,exports) {
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
<<<<<<< HEAD
      console.log('>>>>~~~~ ', model);
=======
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
      var template = this.template(model);
      if (this._escape) template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
      this._el.innerHTML = template;
    }
  }]);

  return View;
}();

exports.View = View;
},{}],"app/js/views/PostsView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostsView = void 0;

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

var PostsView =
/*#__PURE__*/
function (_View) {
  _inherits(PostsView, _View);

  function PostsView() {
    _classCallCheck(this, PostsView);

    return _possibleConstructorReturn(this, _getPrototypeOf(PostsView).apply(this, arguments));
  }

  _createClass(PostsView, [{
    key: "template",
    value: function template(model) {
      return "\n        <div class=\"container\">\n            ".concat(model.toArray().map(function (post, i) {
        return "\n            <div class=\"card d-flex flex-row justify-content-center align-items-stretch row mb-3\">\n                <div class=\"col-md-3 col-12 text-center d-flex align-items-stretch\">\n                    <div class=\"d-flex flex-row flex-md-column align-items-center justify-content-around p-3 w-100\">\n                        <div>\n                            <!-- <img class=\"rounded-circle\" width=\"70\" src=\"app/img/teste.jpg\" alt=\"Card image cap\"> -->\n                            <h5 class=\"mt-2 mb-2\">".concat(post.AuthorName ? post.AuthorName : "", "</h5>\n                        </div>\n                        <button\n                            class=\"btn btn-lg btn-outline-success d-flex justify-content-center align-items-center post-expand\"\n                            data-toggle=\"modal\" data-target=\"#view-modal\" data-i=\"").concat(i, "\"><i\n                                class=\"material-icons\">remove_red_eye</i></button>\n                    </div>\n                </div>\n                <div class=\"col-md-9 col-12 card-body\">\n                    <div class=\"card mb-2\">\n                        <div class=\"card-body\">\n\n                            <h5>").concat(post.Title, "</h5>\n                            <p>").concat(post.Desc, "</p>\n                        </div>\n                    </div>\n\n                </div>\n            </div>\n            ");
      }).join(''), "\n        </div>\n        ");
    }
  }]);

  return PostsView;
}(_View2.View);

exports.PostsView = PostsView;
},{"./View":"app/js/views/View.js"}],"app/js/views/PostView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostView = void 0;

var _View2 = require("./View");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PostView =
/*#__PURE__*/
function (_View) {
  _inherits(PostView, _View);

  function PostView(selector) {
    var _this;

    var escape = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, PostView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostView).call(this, selector, escape));
    _this.editing = false;
    _this.lastModel = null;
    return _this;
  }

  _createClass(PostView, [{
    key: "template",
    value: function template(model) {
      this.lastModel = model;
<<<<<<< HEAD
      return "\n            \n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <h5 class=\"modal-title\">Pergunta</h5>\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                </div>\n                <div class=\"modal-body\">\n\n                    <div id=\"post-meta\" data-id=\"".concat(model.Id, "\"></div>\n\n                    <form action=\"\" id=\"edit-form\">\n                        ").concat(model.AuthorId ? model.AuthorId === localStorage.getItem('id') && this.editing ? "\n                        <div class=\"form-group\">\n                            <label for=\"edit-title\">T\xEDtulo:</label>\n                            <div class=\"input-group\">\n                                <input type=\"text\" name=\"title\" id=\"edit-title\"\n                                    class=\"form-control form-control input-circle\"\n                                    placeholder=\"Pesquisar por t\xEDtulo\" value=\"".concat(model.Title, "\">\n                                <div id=\"edit-titlevalidator\"></div>\n                            </div>\n                        </div>") : "\n                        <div class=\"d-flex align-items-center\">\n                            <h2>".concat(model.Title, "</h2>\n                            <!-- <img class=\"rounded-circle\" width=\"70\" src=\"app/img/teste.jpg\" alt=\"Card image cap\"> -->\n                        </div>") : '', "\n\n                        ").concat(model.AuthorId ? model.AuthorId === localStorage.getItem('id') && this.editing ? "\n                        <div class=\"form-group\">\n                            <label for=\"edit-desc\">Descri\xE7\xE3o:</label>\n                            <div class=\"input-group\">\n                                <textarea name=\"desc\" class=\"form-control input-circle\" id=\"edit-desc\"\n                                    placeholder=\"Pesquisar por descri\xE7\xE3o\" autofocus>".concat(model.Desc, "</textarea>\n                                <div id=\"edit-descvalidator\"></div>\n                            </div>\n                        </div>") : "\n                        <p>".concat(model.Desc.replace('\n', '<br>'), "</p>") : '', "\n\n                        ").concat(model.AuthorId ? model.AuthorId === localStorage.getItem('id') && this.editing ? "\n                        <button type=\"submit\"\n                            class=\"btn btn-warning d-flex align-items-center\">Enviar <i\n                                class=\"material-icons ml-2\">send</i></button>\n                        " : '' : '', "\n\n                    </form>\n\n                </div>\n\n                <div id=\"post-ask-list\"></div>\n\n                <div class=\"container border-top p-3\">\n\n                    <form action=\"\" id=\"comment-form\">\n                        <div class=\"form-group\">\n                            <label for=\"first\">Comentar:</label>\n                            <textarea name=\"first\" class=\"form-control form-control-sm input-circle\"\n                                id=\"comment\" placeholder=\"Sugira solu\xE7\xF5es ou contribua \xE0 discuss\xE3o\"\n                                autofocus></textarea>\n                            <div id=\"commentvalidator\"></div>\n                        </div>\n\n                        <div class=\"d-inline-flex d-row justify-content-start align-items-center ").concat(model.AuthorId ? model.AuthorId === localStorage.getItem('id') ? '' : 'invisible' : 'invisible', " \">\n                            <button type=\"button\" id=\"delete-btn\" class=\"btn btn-outline-danger btn-sm pt-2 ml-1\" data-toggle=\"modal\" data-target=\"#confirm-del-modal\">\n                                <i class=\"small material-icons\">delete</i>\n                            </button>\n                            <button type=\"button\" id=\"edit-btn\" class=\"btn btn-outline-warning btn-sm pt-2 ml-1\">\n                                <i class=\"small material-icons\">edit</i>\n                            </button>\n                        </div>\n                        \n                        <div class=\"d-inline-flex d-row justify-content-end align-items-center float-right\">\n                            <button type=\"button\" class=\"btn btn-secondary m-1\"\n                                data-dismiss=\"modal\">Cancelar</button>\n                            <button type=\"submit\"\n                                class=\"btn btn-primary d-flex align-items-center\">Enviar <i\n                                    class=\"material-icons ml-2\">send</i></button>\n                        </div>\n                    </form>\n\n                </div>\n            </div>\n\n        ");
=======
      var canEdit = model.AuthorId === localStorage.getItem('id') || localStorage.getItem('isAdmin') === 'true';
      return "\n            \n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <h5 class=\"modal-title\">Pergunta</h5>\n                    <button id=\"view-modal-close\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                </div>\n                <div class=\"modal-body\">\n\n                    <div id=\"post-meta\" data-id=\"".concat(model.Id, "\"></div>\n\n                    <form action=\"\" id=\"edit-form\">\n                        ").concat(model.AuthorId ? canEdit && this.editing ? "\n                        <div class=\"form-group\">\n                            <label for=\"edit-title\">T\xEDtulo:</label>\n                            <div class=\"input-group\">\n                                <input type=\"text\" name=\"title\" id=\"edit-title\"\n                                    class=\"form-control form-control input-circle\"\n                                    placeholder=\"Pesquisar por t\xEDtulo\" value=\"".concat(model.Title, "\">\n                                <div id=\"edit-titlevalidator\"></div>\n                            </div>\n                        </div>") : "\n                        <div class=\"d-flex align-items-center\">\n                            <h2>".concat(model.Title, "</h2>\n                            <!-- <img class=\"rounded-circle\" width=\"70\" src=\"app/img/teste.jpg\" alt=\"Card image cap\"> -->\n                        </div>") : '', "\n\n                        ").concat(model.AuthorId ? canEdit && this.editing ? "\n                        <div class=\"form-group\">\n                            <label for=\"edit-desc\">Descri\xE7\xE3o:</label>\n                            <div class=\"input-group\">\n                                <textarea name=\"desc\" class=\"form-control input-circle\" id=\"edit-desc\"\n                                    placeholder=\"Pesquisar por descri\xE7\xE3o\" autofocus>".concat(model.Desc, "</textarea>\n                                <div id=\"edit-descvalidator\"></div>\n                            </div>\n                        </div>") : "\n                        <p>".concat(model.Desc.replace('\n', '<br>'), "</p>") : '', "\n\n                        ").concat(model.AuthorId ? canEdit && this.editing ? "\n                        <button type=\"submit\"\n                            class=\"btn btn-warning d-flex align-items-center\">Enviar <i\n                                class=\"material-icons ml-2\">send</i></button>\n                        " : '' : '', "\n\n                    </form>\n\n                </div>\n\n                <div id=\"post-ask-list\"></div>\n\n                <div class=\"container border-top p-3\">\n\n                    <form action=\"\" id=\"comment-form\">\n                        <div class=\"form-group\">\n                            <label for=\"first\">Comentar:</label>\n                            <textarea name=\"first\" class=\"form-control form-control-sm input-circle\"\n                                id=\"comment\" placeholder=\"Sugira solu\xE7\xF5es ou contribua \xE0 discuss\xE3o\"\n                                autofocus></textarea>\n                            <div id=\"commentvalidator\"></div>\n                        </div>\n\n                        <div class=\"d-inline-flex d-row justify-content-start align-items-center ").concat(model.AuthorId ? canEdit ? '' : 'invisible' : 'invisible', " \">\n                            <button type=\"button\" id=\"delete-btn\" class=\"btn btn-outline-danger btn-sm pt-2 ml-1\" data-toggle=\"modal\" data-target=\"#confirm-del-modal\">\n                                <i class=\"small material-icons\">delete</i>\n                            </button>\n                            <button type=\"button\" id=\"edit-btn\" class=\"btn btn-outline-warning btn-sm pt-2 ml-1\">\n                                <i class=\"small material-icons\">edit</i>\n                            </button>\n                        </div>\n                        \n                        <div class=\"d-inline-flex d-row justify-content-end align-items-center float-right\">\n                            <button type=\"button\" class=\"btn btn-secondary m-1\"\n                                data-dismiss=\"modal\">Cancelar</button>\n                            <button type=\"submit\"\n                                class=\"btn btn-primary d-flex align-items-center\">Enviar <i\n                                    class=\"material-icons ml-2\">send</i></button>\n                        </div>\n                    </form>\n\n                </div>\n            </div>\n\n        ");
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
    }
  }, {
    key: "update",
    value: function update(model) {
      _get(_getPrototypeOf(PostView.prototype), "update", this).call(this, model);

      if (this.lastModel) {
        var editBtn = document.getElementById('edit-btn');

        if (editBtn) {
          editBtn.addEventListener('click', this.toggleEditing.bind(this));
        }
      }

      if (this.didMountFn) this.didMountFn();
    }
  }, {
    key: "toggleEditing",
    value: function toggleEditing() {
      this.editing = !this.editing;

      if (this.lastModel) {
        this.update(this.lastModel);
      }
    }
  }, {
    key: "didMount",
    value: function didMount(cb) {
      this.didMountFn = cb;
    }
  }]);

  return PostView;
}(_View2.View);

exports.PostView = PostView;
},{"./View":"app/js/views/View.js"}],"app/js/views/PostAskView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostAskView = void 0;

var _View2 = require("./View");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PostAskView =
/*#__PURE__*/
function (_View) {
  _inherits(PostAskView, _View);

  function PostAskView(selector) {
    var _this;

    var escape = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, PostAskView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostAskView).call(this, selector, escape));
    _this.editing = false;
    _this.lastModel = null;
    return _this;
  }

  _createClass(PostAskView, [{
    key: "template",
    value: function template(model) {
      this.lastModel = model;
<<<<<<< HEAD
      return "\n            <div class=\"card mb-2\">\n                <div class=\"card-body inline-block\">\n                    <h5>".concat(model.AuthorName, "</h5>\n                    <form action=\"\" class=\"comment-edit\" id=\"comment-edit-form-").concat(model.Id, "\">\n\n                    ").concat(this.editing ? "\n                    <div class=\"form-group\">\n                        <textarea name=\"first\" class=\"form-control form-control-sm input-circle\"\n                            id=\"comment\" placeholder=\"Sugira solu\xE7\xF5es ou contribua \xE0 discuss\xE3o\"\n                            autofocus>".concat(model.Desc, "</textarea>\n                        <div id=\"comment-editvalidator\"></div>\n                    </div>\n                    ") : "<p>".concat(model.Desc, "</p>"), "\n\n                    ").concat(this.editing ? "\n                    <button type=\"submit\"\n                        class=\"btn btn-warning d-flex align-items-center\">Enviar <i\n                            class=\"material-icons ml-2\">send</i></button>\n                    " : '', "\n\n                    </form>\n                </div>\n                \n                <div class=\"d-inline-flex d-row justify-content-end align-items-center float-right ").concat(model.Author ? model.Author === localStorage.getItem('id') ? '' : 'invisible' : 'invisible', "\">\n                    <button type=\"button\" id=\"comment-del-").concat(model.Id, "\" class=\"btn btn-outline-danger btn-sm pt-2 ml-1\">\n                        <i class=\"small material-icons\">delete</i>\n                    </button>\n                    <button type=\"button\" class=\"btn btn-outline-warning btn-sm pt-2 ml-1\" id=\"edit-comment-").concat(model.Id, "\">\n                        <i class=\"small material-icons\">edit</i>\n                    </button>\n                </div>\n            </div>\n        ");
=======
      var canEdit = model.Author === localStorage.getItem('id') || localStorage.getItem('isAdmin') === 'true';
      return "\n            <div class=\"card mb-2\">\n                <div class=\"card-body inline-block\">\n                    <h5>".concat(model.AuthorName, "</h5>\n                    <form action=\"\" class=\"comment-edit\" id=\"comment-edit-form-").concat(model.Id, "\">\n\n                    ").concat(model.Author ? canEdit && this.editing ? "\n                    <div class=\"form-group\">\n                        <textarea name=\"first\" class=\"form-control form-control-sm input-circle\"\n                            id=\"comment-edit-".concat(model.Id, "\" placeholder=\"Sugira solu\xE7\xF5es ou contribua \xE0 discuss\xE3o\"\n                            autofocus>").concat(model.Desc, "</textarea>\n                        <div id=\"comment-editvalidator\"></div>\n                    </div>\n                    ") : "<p>".concat(model.Desc, "</p>") : '', "\n\n                    ").concat(model.Author ? canEdit && this.editing ? "\n                    <button type=\"submit\"\n                        class=\"btn btn-warning d-flex align-items-center\">Enviar <i\n                            class=\"material-icons ml-2\">send</i></button>\n                    " : '' : '', "\n\n                    </form>\n                </div>\n                \n                <div class=\"d-inline-flex d-row justify-content-end align-items-center float-right ").concat(model.Author ? canEdit ? '' : 'invisible' : 'invisible', "\">\n                    <button type=\"button\" id=\"comment-del-").concat(model.Id, "\" class=\"btn btn-outline-danger btn-sm pt-2 ml-1\">\n                        <i class=\"small material-icons\">delete</i>\n                    </button>\n                    <button type=\"button\" class=\"btn btn-outline-warning btn-sm pt-2 ml-1\" id=\"edit-comment-").concat(model.Id, "\">\n                        <i class=\"small material-icons\">edit</i>\n                    </button>\n                </div>\n            </div>\n        ");
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
    }
  }, {
    key: "update",
    value: function update(model) {
      _get(_getPrototypeOf(PostAskView.prototype), "update", this).call(this, model);

      if (this.lastModel) {
        var editBtn = document.getElementById("edit-comment-".concat(model.Id));

        if (editBtn) {
          editBtn.addEventListener('click', this.toggleEditing.bind(this));
        }
      }

      if (this.didMountFn) this.didMountFn(model);
    }
  }, {
    key: "toggleEditing",
    value: function toggleEditing() {
      this.editing = !this.editing;

      if (this.lastModel) {
        this.update(this.lastModel);
      }
    }
  }, {
    key: "didMount",
    value: function didMount(cb) {
      this.didMountFn = cb;
    }
  }]);

  return PostAskView;
}(_View2.View);

exports.PostAskView = PostAskView;
},{"./View":"app/js/views/View.js"}],"app/js/views/PostAsksView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostAsksView = void 0;

var _View2 = require("./View");

var _PostAskView = require("./PostAskView");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PostAsksView =
/*#__PURE__*/
function (_View) {
  _inherits(PostAsksView, _View);

  function PostAsksView(selector) {
    var escape = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, PostAsksView);

    return _possibleConstructorReturn(this, _getPrototypeOf(PostAsksView).call(this, selector, escape));
  }

  _createClass(PostAsksView, [{
    key: "template",
    value: function template(model) {
      return "\n        <div class=\"container\" id=\"post-ask-inner-list\">\n            ".concat(model.toArray().map(function (_, i) {
        return "\n                <div id=\"comment-".concat(i, "\"></div>\n            ");
      }).join(''), "\n        </div>\n        ");
    }
  }, {
    key: "update",
    value: function update(model) {
      var _this = this;

      _get(_getPrototypeOf(PostAsksView.prototype), "update", this).call(this, model);

      var postList = document.getElementById('post-ask-inner-list');

      if (postList) {
        Array.from(postList.children).forEach(function (el, i) {
          var view = new _PostAskView.PostAskView("#".concat(el.getAttribute('id') || ''));
          var postAsk = model.toArray()[i];
          view.update(postAsk);
          view.didMount(_this.childrenDidMountFn.bind(view));
        });
      }
    }
  }, {
    key: "childrenDidMount",
    value: function childrenDidMount(fn) {
      this.childrenDidMountFn = fn;
    }
  }]);

  return PostAsksView;
}(_View2.View);

exports.PostAsksView = PostAsksView;
<<<<<<< HEAD
},{"./View":"app/js/views/View.js","./PostAskView":"app/js/views/PostAskView.js"}],"app/js/controllers/HelpCenterAskController.js":[function(require,module,exports) {
=======
},{"./View":"app/js/views/View.js","./PostAskView":"app/js/views/PostAskView.js"}],"app/js/validation/helpCenterAskValidate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comment = comment;

function comment(comment) {
  if (!(comment.value.trim().length > 3)) {
    return 'Comentário muito pequeno.';
  } else {
    return null;
  }
}
},{}],"app/js/utils/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _InputWrapper = require("./InputWrapper");

Object.keys(_InputWrapper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _InputWrapper[key];
    }
  });
});

var _listCheck = require("./listCheck");

Object.keys(_listCheck).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _listCheck[key];
    }
  });
});
},{"./InputWrapper":"app/js/utils/InputWrapper.js","./listCheck":"app/js/utils/listCheck.js"}],"app/js/controllers/HelpCenterAskController.js":[function(require,module,exports) {
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpCenterAskController = void 0;

var _index = require("../services/index");

var _PostAsk = require("../models/PostAsk");

var _PostAsksView = require("../views/PostAsksView");

var _index2 = require("../models/index");

<<<<<<< HEAD
=======
var _index3 = require("../helpers/index");

var vals = _interopRequireWildcard(require("../validation/helpCenterAskValidate"));

var _index4 = require("../utils/index");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HelpCenterAskController =
/*#__PURE__*/
function () {
  function HelpCenterAskController() {
    var _this = this;

    _classCallCheck(this, HelpCenterAskController);

    this.postAsksView = new _PostAsksView.PostAsksView('#post-ask-list');
    this.addComment = document.getElementById('comment');
    var addForm = document.getElementById('comment-form');
    if (addForm) addForm.addEventListener('submit', this.add.bind(this));
    this.postAsksView.childrenDidMount(function (postAsk) {
      var editForm = document.getElementById("comment-edit-form-".concat(postAsk.Id));
<<<<<<< HEAD
      console.log(editForm);
      var deleteBtn = document.getElementById("comment-del-".concat(postAsk.Id));
      console.log(' ~~~ ~', deleteBtn);
=======
      var editField = document.getElementById("comment-edit-".concat(postAsk.Id));
      var deleteBtn = document.getElementById("comment-del-".concat(postAsk.Id));

      _this.editVals.set(postAsk.Id, [(0, _index3.validate)(editField, vals.comment)]);
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014

      if (editForm) {
        editForm.addEventListener('submit', _this.update.bind(_this, postAsk.Id));
      }

      if (deleteBtn) {
        deleteBtn.addEventListener('click', _this.delete.bind(_this, postAsk.Id));
      }
    });
<<<<<<< HEAD
=======
    this.addVals = [(0, _index3.validate)(this.addComment, vals.comment)];
    this.editVals = new Map();
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
  }

  _createClass(HelpCenterAskController, [{
    key: "add",
    value: function add(event) {
      var _this2 = this;

      event.preventDefault();
<<<<<<< HEAD
      var postIdField = document.getElementById('post-meta');

      if (!postIdField) {
        return;
      }

      var ID_POST = postIdField.getAttribute('data-id');

      if (!ID_POST) {
        return;
      }

      var postAsk = new _PostAsk.PostAsk(ID_POST, this.addComment.value, localStorage.getItem('id') || '');
      var helpCenterService = new _index.HelpCenterAskService();
      helpCenterService.add(postAsk).then(function (result) {
        return result.json();
      }).then(function (res) {
        _this2.listByPost(event);
      }).catch(function (error) {
        console.error(error);
      });
=======

      if ((0, _index4.noFalse)(this.addVals)) {
        var postIdField = document.getElementById('post-meta');

        if (!postIdField) {
          return;
        }

        var ID_POST = postIdField.getAttribute('data-id');

        if (!ID_POST) {
          return;
        }

        var postAsk = new _PostAsk.PostAsk(ID_POST, this.addComment.value, localStorage.getItem('id') || '');
        var helpCenterService = new _index.HelpCenterAskService();
        helpCenterService.add(postAsk).then(function (result) {
          return result.json();
        }).then(function (res) {
          _this2.listByPost(event);
        }).catch(function (error) {
          console.error(error);
        });
      }
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
    }
  }, {
    key: "update",
    value: function update(id, event) {
      var _this3 = this;

      event.preventDefault();
<<<<<<< HEAD
      var postIdField = document.getElementById('post-meta');
      var textareaEl = document.querySelector("#comment-edit-form-".concat(id, " textarea"));

      if (!textareaEl) {
        return;
      }

      if (!postIdField) {
        return;
      }

      var ID_POST = postIdField.getAttribute('data-id');

      if (!ID_POST) {
        return;
      }

      var postAsk = new _PostAsk.PostAsk(ID_POST, textareaEl.value, localStorage.getItem('id') || '', id);
      console.log(postAsk);
      var helpCenterService = new _index.HelpCenterAskService();
      helpCenterService.update(postAsk, id).then(function (result) {
        return result.json();
      }).then(function (res) {
        _this3.listByPost(event);
      }).catch(function (error) {
        console.error(error);
      });
=======

      if ((0, _index4.noFalse)(this.editVals.get(id))) {
        var postIdField = document.getElementById('post-meta');
        var textareaEl = document.querySelector("#comment-edit-form-".concat(id, " textarea"));

        if (!textareaEl) {
          return;
        }

        if (!postIdField) {
          return;
        }

        var ID_POST = postIdField.getAttribute('data-id');

        if (!ID_POST) {
          return;
        }

        var postAsk = new _PostAsk.PostAsk(ID_POST, textareaEl.value, localStorage.getItem('id') || '', id);
        var helpCenterService = new _index.HelpCenterAskService();
        helpCenterService.update(postAsk, id).then(function (result) {
          return result.json();
        }).then(function (res) {
          _this3.listByPost(event);
        }).catch(function (error) {
          console.error(error);
        });
      }
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
    }
  }, {
    key: "list",
    value: function list(event) {
      event.preventDefault();
      var helpCenterService = new _index.HelpCenterAskService();
      helpCenterService.list(1).then(function (result) {
        return result.json();
      }).then(function (res) {}).catch(function (error) {
        console.error(error);
      });
    }
  }, {
    key: "listByPost",
    value: function listByPost(event) {
      var _this4 = this;

      event.preventDefault();
      var postIdField = document.getElementById('post-meta');

      if (!postIdField) {
        return;
      }

      var ID_POST = postIdField.getAttribute('data-id');

      if (!ID_POST) {
        return;
      }

      var helpCenterService = new _index.HelpCenterAskService();
      helpCenterService.list(1).then(function (result) {
        return result.json();
      }).then(function (res) {
        console.log('CHE', res);

        _this4.postAsksView.update(_index2.PostAsks.from(res.filter(function (ask) {
          return ask['id_helpCenter'] === ID_POST;
        })));
      }).catch(function (error) {
        console.error(error);
      });
    }
  }, {
    key: "delete",
    value: function _delete(id, event) {
      var _this5 = this;

      event.preventDefault();
      var helpCenterService = new _index.HelpCenterAskService();
      helpCenterService.remove(id).then(function (result) {
        return result.json();
      }).then(function (res) {
<<<<<<< HEAD
        console.log(res);

=======
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
        _this5.listByPost(event);
      }).catch(function (error) {
        console.error(error);
      });
    }
  }, {
    key: "findByID",
    value: function findByID(event) {
      event.preventDefault();
      var helpCenterService = new _index.HelpCenterAskService();
      helpCenterService.findById('title').then(function (result) {
        return result.json();
      }).then(function (res) {}).catch(function (error) {
        console.error(error);
      });
    }
  }]);

  return HelpCenterAskController;
}();

exports.HelpCenterAskController = HelpCenterAskController;
<<<<<<< HEAD
},{"../services/index":"app/js/services/index.js","../models/PostAsk":"app/js/models/PostAsk.js","../views/PostAsksView":"app/js/views/PostAsksView.js","../models/index":"app/js/models/index.js"}],"app/js/controllers/HelpCenterController.js":[function(require,module,exports) {
=======
},{"../services/index":"app/js/services/index.js","../models/PostAsk":"app/js/models/PostAsk.js","../views/PostAsksView":"app/js/views/PostAsksView.js","../models/index":"app/js/models/index.js","../helpers/index":"app/js/helpers/index.js","../validation/helpCenterAskValidate":"app/js/validation/helpCenterAskValidate.js","../utils/index":"app/js/utils/index.js"}],"app/js/views/MessageView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageView = void 0;

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

var MessageView =
/*#__PURE__*/
function (_View) {
  _inherits(MessageView, _View);

  function MessageView() {
    _classCallCheck(this, MessageView);

    return _possibleConstructorReturn(this, _getPrototypeOf(MessageView).apply(this, arguments));
  }

  _createClass(MessageView, [{
    key: "template",
    value: function template(model) {
      return "<p class=\"alert alert-warning\">".concat(model, "</p>");
    }
  }]);

  return MessageView;
}(_View2.View);

exports.MessageView = MessageView;
},{"./View":"app/js/views/View.js"}],"app/js/views/PaginationView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationView = void 0;

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

var PaginationView =
/*#__PURE__*/
function (_View) {
  _inherits(PaginationView, _View);

  function PaginationView(selector, baseUrl) {
    var _this;

    var escape = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, PaginationView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PaginationView).call(this, selector, escape));
    _this.baseUrl = baseUrl;
    return _this;
  }

  _createClass(PaginationView, [{
    key: "generatePageNs",
    value: function generatePageNs(actual) {
      var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
      var half = Math.floor(perPage / 2);
      var ns = [];

      if (actual <= half) {
        for (var i = 0; i < perPage; i++) {
          ns.push(i + 1);
        }
      } else {
        for (var _i = actual - half; _i <= actual + half; _i++) {
          ns.push(_i);
        }
      }

      return ns;
    }
  }, {
    key: "template",
    value: function template(model) {
      var _this2 = this;

      console.log(model);
      console.log(this.generatePageNs(model));
      return "\n        <li class=\"page-item\">\n            <a class=\"page-link\" href=\"".concat(this.baseUrl, "?page=").concat(model - 1, "\" aria-label=\"Anterior\">\n                <span aria-hidden=\"true\" class=\"txt-primary\">&laquo;</span>\n                <span class=\"sr-only txt-primary\">Anterior</span>\n            </a>\n        </li>\n\n        ").concat(this.generatePageNs(model).map(function (n) {
        return "\n            <li class=\"page-item\"><a class=\"page-link txt-primary\" href=\"".concat(_this2.baseUrl, "?page=").concat(n, "\">").concat(n, "</a></li>\n        ");
      }).join(''), "\n        \n        <li class=\"page-item\">\n            <a class=\"page-link\" href=\"").concat(this.baseUrl, "?page=").concat(model + 1, "\" aria-label=\"Pr\xF3ximo\">\n                <span aria-hidden=\"true\" class=\"txt-primary\">&raquo;</span>\n                <span class=\"sr-only txt-primary\">Pr\xF3ximo</span>\n            </a>\n        </li>\n        ");
    }
  }]);

  return PaginationView;
}(_View2.View);

exports.PaginationView = PaginationView;
},{"./View":"app/js/views/View.js"}],"app/js/controllers/HelpCenterController.js":[function(require,module,exports) {
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpCenterController = void 0;

var _index = require("../models/index");

var _index2 = require("../services/index");

var _index3 = require("../helpers/index");

var vals = _interopRequireWildcard(require("../validation/helpCenterValidate"));

var _listCheck = require("../utils/listCheck");

var _PostsView = require("../views/PostsView");

var _PostView = require("../views/PostView");

var _HelpCenterAskController = require("./HelpCenterAskController");

<<<<<<< HEAD
=======
var _MessageView = require("../views/MessageView");

var _PaginationView = require("../views/PaginationView");

>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HelpCenterController =
/*#__PURE__*/
function () {
  function HelpCenterController() {
    var _this = this;

<<<<<<< HEAD
    _classCallCheck(this, HelpCenterController);

    this.searchTitle = document.getElementById('search-title');
    this.searchDesc = document.getElementById('search-desc');
=======
    var currentPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    _classCallCheck(this, HelpCenterController);

    this.searchTitle = document.getElementById('search-joker');
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
    this.addTitle = document.getElementById('add-title');
    this.addDesc = document.getElementById('add-desc');
    this.postsView = new _PostsView.PostsView('#post-list');
    this.postView = new _PostView.PostView('#view-view-modal');
<<<<<<< HEAD
    this.currentPage = 1;
=======
    this.paginationView = new _PaginationView.PaginationView('#pagination', 'app-help-center.html');
    this.messageView = new _MessageView.MessageView('#message-view');
    this.currentPage = currentPage;
    this.paginationView.update(currentPage);
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
    this.addVals = [(0, _index3.validate)(this.addTitle, vals.title), (0, _index3.validate)(this.addDesc, vals.desc)];
    this.postView.didMount(function () {
      _this.helpCenterAsk = new _HelpCenterAskController.HelpCenterAskController();
      _this.editTitle = document.getElementById('edit-title');
      _this.editDesc = document.getElementById('edit-desc');
      var editForm = document.getElementById('edit-form');
      var deleteBtn = document.getElementById('confirm-del-btn');

      if (editForm) {
        editForm.addEventListener('submit', _this.update.bind(_this));
      }

      if (deleteBtn) {
        deleteBtn.addEventListener('click', _this.delete.bind(_this));
      }

      if (_this.editTitle) {
        _this.editVals = [(0, _index3.validate)(_this.editTitle, vals.title), (0, _index3.validate)(_this.editDesc, vals.desc)];
      }

      _this.helpCenterAsk.listByPost(new Event(''));
    });
  }

  _createClass(HelpCenterController, [{
    key: "add",
    value: function add(event) {
      var _this2 = this;

      event.preventDefault();

      if ((0, _listCheck.noFalse)(this.addVals)) {
        var post = new _index.Post(this.addTitle.value.toString(), this.addDesc.value.toString());
        var helpCenterService = new _index2.HelpCenterService();
        helpCenterService.add(post).then(function (result) {
<<<<<<< HEAD
          return result.json();
=======
          if (Math.floor(result.status / 100) === 2) {
            result.json().then(function () {
              _this2.list(event);

              document.getElementById('add-modal-close').click();

              _this2.messageView.update('Adicionado com sucesso!');
            }).catch(function (error) {
              console.error(error);
            });
          } else {
            result.json().then(function (res) {
              _this2.list(event);

              _this2.messageView.update(res.erro);
            });
          }
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
        }).then(function (res) {}).then(function () {
          _this2.list(event);
        }).catch(function (error) {
          console.error(error);
        });
      }
    }
  }, {
    key: "update",
    value: function update(event) {
      var _this3 = this;

      event.preventDefault();

      if ((0, _listCheck.noFalse)(this.editVals)) {
        var postIdField = document.getElementById('post-meta');

        if (!(postIdField && this.editTitle && this.editDesc)) {
          return;
        }

        var ID_POST = postIdField.getAttribute('data-id');

        if (!ID_POST) {
          return;
        }

        var post = new _index.Post(this.editTitle.value, this.editDesc.value);
        var helpCenterService = new _index2.HelpCenterService();
        helpCenterService.update(post, ID_POST).then(function (result) {
          return result.json();
        }).then(function (res) {
          _this3.list(event);
        }).catch(function (error) {
          console.error(error);
        });
      }
    }
  }, {
    key: "list",
    value: function list(event) {
      var _this4 = this;

      event.preventDefault();
      var helpCenterService = new _index2.HelpCenterService();
      helpCenterService.list(this.currentPage).then(function (result) {
        return result.json();
      }).then(function (res) {
        var posts = _index.Posts.from(res.slice(0, -1));

        _this4.postsView.update(posts);

        Array.from(document.getElementsByClassName('post-expand')).forEach(function (el) {
          var i = el.getAttribute('data-i');

          if (i) {
            el.addEventListener('click', function () {
              _this4.postView.update(posts.get(+i));
            });
          }
        });
      }).catch(function (error) {
        console.error(error);
      });
    }
  }, {
    key: "delete",
    value: function _delete(event) {
      var _this5 = this;

      event.preventDefault();
      var postIdField = document.getElementById('post-meta');

      if (!postIdField) {
        return;
      }

      var ID_POST = postIdField.getAttribute('data-id');

      if (!ID_POST) {
        return;
      }

      var helpCenterService = new _index2.HelpCenterService();
      helpCenterService.remove(ID_POST).then(function (result) {
<<<<<<< HEAD
        return result.json();
      }).then(function (res) {
        _this5.list(event);
      }).catch(function (error) {
        console.log(error);
=======
        if (Math.floor(result.status / 100) === 2) {
          result.json().then(function (res) {
            _this5.list(event);

            document.getElementById('confirm-del-modal-close').click();
            document.getElementById('view-modal-close').click();

            _this5.messageView.update('Deletado com sucesso.');
          });
        } else {
          result.json().then(function (res) {
            _this5.list(event);

            _this5.messageView.update(res.erro);
          });
        }
      }).catch(function (error) {
        console.error(error);
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
      });
    }
  }, {
    key: "findByTitle",
    value: function findByTitle(event) {
      var _this6 = this;

      event.preventDefault();
      var title = this.searchTitle.value;
      var helpCenterService = new _index2.HelpCenterService();
<<<<<<< HEAD
      helpCenterService.findByTitle(title).then(function (result) {
=======
      helpCenterService.findByJoker(title).then(function (result) {
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
        return result.json();
      }).then(function (res) {
        var posts = _index.Posts.from(res.slice(0, -1));

        _this6.postsView.update(posts);

        Array.from(document.getElementsByClassName('post-expand')).forEach(function (el) {
          var i = el.getAttribute('data-i');

          if (i) {
            el.addEventListener('click', function () {
              _this6.postView.update(posts.get(+i));
            });
          }
        });
      }).catch(function (error) {
        console.error(error);
      });
    }
  }, {
<<<<<<< HEAD
    key: "findByDesc",
    value: function findByDesc(event) {
      var _this7 = this;

      event.preventDefault();
      var desc = this.searchDesc.value;
      var helpCenterService = new _index2.HelpCenterService();
      helpCenterService.findByDesc(desc).then(function (result) {
        return result.json();
      }).then(function (res) {
        var posts = _index.Posts.from(res.slice(0, -1));

        _this7.postsView.update(posts);

        Array.from(document.getElementsByClassName('post-expand')).forEach(function (el) {
          var i = el.getAttribute('data-i');

          if (i) {
            el.addEventListener('click', function () {
              _this7.postView.update(posts.get(+i));
            });
          }
        });
      }).catch(function (error) {
        console.error(error);
      });
    }
  }]);

  return HelpCenterController;
}();

exports.HelpCenterController = HelpCenterController;
},{"../models/index":"app/js/models/index.js","../services/index":"app/js/services/index.js","../helpers/index":"app/js/helpers/index.js","../validation/helpCenterValidate":"app/js/validation/helpCenterValidate.js","../utils/listCheck":"app/js/utils/listCheck.js","../views/PostsView":"app/js/views/PostsView.js","../views/PostView":"app/js/views/PostView.js","./HelpCenterAskController":"app/js/controllers/HelpCenterAskController.js"}],"app/js/controllers/HomeController.js":[function(require,module,exports) {
=======
    key: "CurrentPage",
    set: function set(page) {
      this.currentPage = page;
      this.paginationView.update(this.currentPage);
    }
  }]);

  return HelpCenterController;
}();

exports.HelpCenterController = HelpCenterController;
},{"../models/index":"app/js/models/index.js","../services/index":"app/js/services/index.js","../helpers/index":"app/js/helpers/index.js","../validation/helpCenterValidate":"app/js/validation/helpCenterValidate.js","../utils/listCheck":"app/js/utils/listCheck.js","../views/PostsView":"app/js/views/PostsView.js","../views/PostView":"app/js/views/PostView.js","./HelpCenterAskController":"app/js/controllers/HelpCenterAskController.js","../views/MessageView":"app/js/views/MessageView.js","../views/PaginationView":"app/js/views/PaginationView.js"}],"app/js/views/UserMenuView.js":[function(require,module,exports) {
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
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeController = void 0;

var _UserService = require("../services/UserService");

var _HelpCenterService = require("../services/HelpCenterService");

var _DailyNoteService = require("../services/DailyNoteService");

<<<<<<< HEAD
=======
var _UserMenuView = require("../views/UserMenuView");

>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HomeController =
/*#__PURE__*/
function () {
  function HomeController() {
    _classCallCheck(this, HomeController);
<<<<<<< HEAD
  }

  _createClass(HomeController, [{
    key: "getUserData",
    value: function getUserData() {
=======

    this.user = new _UserMenuView.UserMenuView("#user-menu-login-link");
    this.user.update('');
  }

  _createClass(HomeController, [{
    key: "getUser",
    value: function getUser() {
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
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
<<<<<<< HEAD
},{"../services/UserService":"app/js/services/UserService.js","../services/HelpCenterService":"app/js/services/HelpCenterService.js","../services/DailyNoteService":"app/js/services/DailyNoteService.js"}],"app/js/helpCenter.js":[function(require,module,exports) {
=======
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
},{"../controllers/HomeController":"app/js/controllers/HomeController.js"}],"app/js/helpCenter.js":[function(require,module,exports) {
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
"use strict";

var _HelpCenterController = require("./controllers/HelpCenterController");

var _HomeController = require("./controllers/HomeController");

<<<<<<< HEAD
var controller = new _HelpCenterController.HelpCenterController();
var homeController = new _HomeController.HomeController();
=======
var _userData = require("./utils/userData");

var userData = (0, _userData.getUser)();
var controller = new _HelpCenterController.HelpCenterController();
var homeController = new _HomeController.HomeController();
var url = new URLSearchParams(location.search);

if (url.get('page')) {
  controller.CurrentPage = +url.get('page');
}

>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
var cadastrar = document.querySelector("#cadastroHelpCenter");

if (cadastrar) {
  cadastrar.addEventListener('click', controller.add.bind(controller));
  window.addEventListener('load', controller.list.bind(controller));
}

<<<<<<< HEAD
var searchTitle = document.getElementById('search-title');
var searchDesc = document.getElementById('search-desc');
if (searchTitle) searchTitle.addEventListener('change', controller.findByTitle.bind(controller));
if (searchDesc) searchDesc.addEventListener('change', controller.findByDesc.bind(controller));
var nameSpan = document.querySelector('#nameSpan');
var userNameSpan = document.querySelector('#userNameSpan');
var data = homeController.getUserData();

if (data) {
  data.then(function (data) {
    if (nameSpan != null) {
      nameSpan.textContent = data.name;
    }

    if (userNameSpan != null) {
      userNameSpan.textContent = "(".concat(data.userName, ")");
    }
  });
} else {
  window.location.href = "index.html";
}
},{"./controllers/HelpCenterController":"app/js/controllers/HelpCenterController.js","./controllers/HomeController":"app/js/controllers/HomeController.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
=======
var searchTitle = document.getElementById('search-joker');
if (searchTitle) searchTitle.addEventListener('change', controller.findByTitle.bind(controller));
},{"./controllers/HelpCenterController":"app/js/controllers/HelpCenterController.js","./controllers/HomeController":"app/js/controllers/HomeController.js","./utils/userData":"app/js/utils/userData.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014
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
<<<<<<< HEAD
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54293" + '/');
=======
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61111" + '/');
>>>>>>> aed165049f5063b566ae51a2c6188c8fe4f5c014

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app/js/helpCenter.js"], null)
//# sourceMappingURL=/helpCenter.5ee8839f.js.map