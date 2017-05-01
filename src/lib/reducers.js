/**
 *  @file       reducers.js
 *
 *	@desc       Translate actions into changes in the Redux state store.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import * as actionTypes from "./actionTypes";

export function create_default_state () {
  return {
    beat: 0.0,
    phase: 0.0,
    quantum: 0.0,
    queued_bpm: false,
    bpm: false
  };
}
export default function (state = create_default_state(), action) {
  switch (action.type) {
    case actionTypes.LINK_TRANSPORT_CHANGED:
      state.beat = action.payload.beat;
      state.phase = action.payload.phase;
      break;

    case actionTypes.LINK_TEMPO_SHOULD_CHANGE:
      state.queued_bpm = action.payload.bpm;
      break;

    case actionTypes.LINK_BPM_CHANGED:
      state.bpm = action.payload.bpm;
      state.queued_bpm = false;
      break;
    
    default:
      break;
  }
  return state;
}
