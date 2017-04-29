import abletonlink from "abletonlink"

import * as actions from "./actions"

class AbletonLinkController {
  constructor(store) {
    this.store = store;

    this.link = new abletonlink();

    this.link.startUpdate(60, (beat, phase, bpm) => {
      this.store.dispatch(actions.linkBeatsChanged(beat));
    });

  }
}

export default AbletonLinkController;
