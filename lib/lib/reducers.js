'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_default_state = create_default_state;

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : create_default_state();
  var action = arguments[1];

  switch (action.type) {
    case actionTypes.LINK_TRANSPORT_CHANGED:
      state = Object.assign({}, state, {
        'beat': action.payload.beat,
        'phase': action.payload.phase
      });
      break;

    case actionTypes.LINK_TEMPO_SHOULD_CHANGE:
      state = Object.assign({}, state, {
        'queued_bpm': action.payload.bpm
      });
      break;

    case actionTypes.LINK_BPM_CHANGED:
      state = Object.assign({}, state, {
        'bpm': action.payload.bpm,
        'queued_bpm': false
      });
      break;

    default:
      break;
  }
  return state;
};

var _actionTypes = require('./actionTypes');

var actionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function create_default_state() {
  return {
    beat: 0.0,
    phase: 0.0,
    quantum: 0.0,
    queued_bpm: false,
    bpm: false
  };
} /**
   *  @file       reducers.js
   *
   *	@desc       Translate actions into changes in the Redux state store.
   *
   *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
   *
   *  @copyright  2017 Colin Sullivan
   *  @license    Licensed under the MIT license.
   **/