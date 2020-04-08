"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 拖拽/滑屏构建工具
var reusableDrag = /*#__PURE__*/function () {
  function reusableDrag(options) {
    _classCallCheck(this, reusableDrag);

    _defineProperty(this, "units", {
      // 通用工具方法库
      forIn: function forIn(object, callback) {
        for (var key in object) {
          if (object.hasOwnProperty(key)) {
            callback(key, object);
          }
        }
      },
      thisBind: function thisBind(_this, object) {
        // 对象添加另一个对象的key:val
        if (_typeof(object) === 'object') {
          this.forIn(object, function (key, obj) {
            if (typeof obj[key] === 'function') {
              _this[key] = obj[key].bind(_this);
            } else {
              !_this[key] && (_this[key] = obj[key]);
            }
          });
        }
      },
      objectFunThisBind: function objectFunThisBind(_this, object) {
        //对象方法绑定this
        if (_typeof(object) === 'object') {
          this.forIn(object, function (key, obj) {
            if (typeof obj[key] === 'function') {
              obj[key] = obj[key].bind(_this);
            }
          });
        }
      },
      browserRedirect: function browserRedirect() {
        // 判断浏览器类型
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
          return 'mobile';
        } else {
          return 'pc';
        }
      }
    });

    _defineProperty(this, "touchBuilder", {
      // touch事件构建器, 添加钩子事件
      start: function start(ev) {
        ev = ev || window.event;
        this.touch.start.call(this, ev);
      },
      move: function move(ev) {
        ev = ev || window.event;
        this.touch.move.call(this, ev);
      },
      end: function end(ev) {
        ev = ev || window.event;
        this.touch.end.call(this, ev);
      }
    });

    _defineProperty(this, "mouseBuilder", {
      // mouse事件构建器, 添加钩子事件
      down: function down(ev) {
        ev = ev || window.event;
        this.mouse.down.call(this, ev);
      },
      move: function move(ev) {
        ev = ev || window.event;
        this.mouse.move.call(this, ev);
      },
      up: function up() {
        ev = ev || window.event;
        this.mouse.up.call(this, ev);
      }
    });

    this.options = options;
  }

  _createClass(reusableDrag, [{
    key: "delayConstructor",
    value: function delayConstructor(options) {
      // 自定义构建器
      typeof options.data === 'function' && this.units.thisBind(this, options.data.call(this));
      _typeof(options.methods) === 'object' && this.units.thisBind(this, options.methods);
      _typeof(options.touch) === 'object' && (this.touch = options.touch);
      _typeof(options.mouse) === 'object' && (this.mouse = options.mouse);
      typeof options.mounted === 'function' && options.mounted.call(this);
      this.units.objectFunThisBind(this, this.touchBuilder);
    }
  }, {
    key: "create",
    value: function create(options) {
      // 生成器
      var device = this.units.browserRedirect(); // 获取设备类型

      this.units.thisBind(this, options); // 生成器数据保存

      this.delayConstructor(this.options); // 执行延迟构建器

      if (device === 'pc') {
        // 如果设备是pc 添加mouse事件
        if (_typeof(this.mouse) === 'object') {
          var _this$mouseBuilder = this.mouseBuilder,
              down = _this$mouseBuilder.down,
              move = _this$mouseBuilder.move,
              up = _this$mouseBuilder.up;

          if (typeof this.mouse.down === 'function') {
            this.el.onmousedown = down.bind(this);
          }

          if (typeof this.mouse.move === 'function') {
            this.el.onmousemove = move.bind(this);
          }

          if (typeof this.mouse.up === 'function') {
            this.el.onmouseup = up.bind(this);
          }
        }
      } else if (device === 'mobile') {
        // 如果设备是mobile 添加touch事件
        if (_typeof(this.touch) === 'object') {
          if (typeof this.touch.start === 'function') {
            this.el.addEventListener('touchstart', this.touchBuilder.start);
          }

          if (typeof this.touch.move === 'function') {
            this.el.addEventListener('touchmove', this.touchBuilder.move);
          }

          if (typeof this.touch.end === 'function') {
            this.el.addEventListener('touchend', this.touchBuilder.end);
          }
        }
      }
    }
  }, {
    key: "delete",
    value: function _delete() {
      // 卸除拖拽事件
      if (_typeof(this.touch) === 'object') {
        this.el.removeEventListener('touchstart', this.touchBuilder.start);
        this.el.removeEventListener('touchmove', this.touchBuilder.move);
        this.el.removeEventListener('touchend', this.touchBuilder.end);
      }

      this.timer && clearInterval(this.timer);
      this.options.delete && this.options.delete.call(this);
    }
  }]);

  return reusableDrag;
}();

module.exports = RcDrag;
/*!
    滑屏事件ev封装?
    滑屏事件钩子?
 */