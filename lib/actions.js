import * as actionTypes from "./actionTypes"

export function linkBeatsChanged (beat) {
  return {
    type: actionTypes.LINK_BEATS_CHANGED,
    payload: {
      beat,
    }
  };
}
