"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkTransportChanged = linkTransportChanged;
exports.linkBPMChanged = linkBPMChanged;
exports.linkTempoShouldChange = linkTempoShouldChange;

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function linkTransportChanged(beat, phase) {
  return {
    type: actionTypes.LINK_TRANSPORT_CHANGED,
    payload: {
      beat: beat,
      phase: phase
    }
  };
} /**
   *  @file       actions.js
   *
   *	@desc       Action set for dispatching Link changes to the store.
   *
   *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
   *
   *  @copyright  2017 Colin Sullivan
   *  @license    Licensed under the MIT license.
   **/

function linkBPMChanged(bpm) {
  return {
    type: actionTypes.LINK_BPM_CHANGED,
    payload: {
      bpm: bpm
    }
  };
}

function linkTempoShouldChange(bpm) {
  return {
    type: actionTypes.LINK_TEMPO_SHOULD_CHANGE,
    payload: {
      bpm: bpm
    }
  };
}