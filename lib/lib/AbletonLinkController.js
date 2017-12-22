'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  @file       AbletonLinkController.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  @copyright  2017 Colin Sullivan
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  @license    Licensed under the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      **/

var _abletonlink = require('abletonlink');

var _abletonlink2 = _interopRequireDefault(_abletonlink);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _reducers = require('./reducers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  @class        AbletonLinkController
 *
 *  @classdesc    Entity which spawns the Ableton Link instance and
 *  translates updates into actions for the Redux state store.
 *
 **/
var AbletonLinkController = function () {

  /**
   *  @constructor
   *
   *  @param  {redux.StateStore}  store - The state store instance.
   *  @param  {String}  mountPoint - The mount point of the abletonlink state
   *  within the overall state tree.
   *  @param  {Number}  updateInterval - The update interval for abletonlink
   **/
  function AbletonLinkController(store) {
    var _this = this;

    var mountPoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _reducers.DEFAULT_MOUNT_POINT;
    var updateInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

    _classCallCheck(this, AbletonLinkController);

    this.store = store;

    this.mountPoint = mountPoint;

    var state = this.store.getState()[this.mountPoint];
    var bpm = state.bpm;
    var quantum = state.quantum;

    console.log('Initializing abletonlink with bpm: ' + bpm + ' and quantum: ' + quantum);

    this.link = new _abletonlink2.default(bpm, quantum);

    var lastBpm = this.link.bpm;
    this.link.startUpdate(updateInterval, function (beat, phase, bpm) {
      _this.store.dispatch(actions.linkTransportChanged(beat, phase));
      if (bpm !== lastBpm) {
        _this.store.dispatch(actions.linkBPMChanged(bpm));
        lastBpm = bpm;
      }
    });

    this.store.subscribe(function () {
      _this.handleStoreChanged();
    });
  }

  _createClass(AbletonLinkController, [{
    key: 'handleStoreChanged',
    value: function handleStoreChanged() {
      var state = this.store.getState()[this.mountPoint];

      if (state.queued_bpm) {
        this.link.bpm = state.queued_bpm;
      }
    }
  }]);

  return AbletonLinkController;
}();

exports.default = AbletonLinkController;