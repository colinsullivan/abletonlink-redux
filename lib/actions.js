/**
 *  @file       actions.js
 *
 *	@desc       Action set for dispatching Link changes to the store.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import * as actionTypes from "./actionTypes"

export function linkTransportChanged (beat, phase) {
  return {
    type: actionTypes.LINK_TRANSPORT_CHANGED,
    payload: {
      beat,
      phase
    }
  };
}

export function linkBPMChanged (bpm) {
  return {
    type: actionTypes.LINK_BPM_CHANGED,
    payload: {
      bpm
    }
  };
}
