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

function create_default_state () {
  return {
    beat: 0.0,
    phase: 0.0,
    quantum: 0.0
  };
}
export default function (state = create_default_state(), action) {
  switch (action.type) {
    case actionTypes.LINK_BEATS_CHANGED:
      state.bar = action.payload.bar;
      state.beat = action.payload.beat;
      break;
    
    default:
      break;
  }
  return state;
}
