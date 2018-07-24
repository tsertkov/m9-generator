"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ware = _interopRequireDefault(require("ware"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Content {
  constructor() {
    this.middleware = (0, _ware.default)();
  }

  use(plugin) {
    return this.middleware.use(plugin);
  }

  getContext() {
    return new Promise((resolve, reject) => {
      this.middleware.run({
        __config: _config.default
      }, (err, context) => {
        if (err) return reject(err);
        resolve(context);
      });
    });
  }

}

exports.default = Content;