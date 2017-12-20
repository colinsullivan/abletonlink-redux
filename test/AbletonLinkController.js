/**
 *  @file       AbletonLinkController.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import abletonlink from "abletonlink"
import abletonlinkRedux from "../"

/**
 *  @class        AbletonLinkController
 *
 *  @classdesc    Entity which spawns the Ableton Link instance and
 *  translates updates into actions for the Redux state store.
 *  
 **/
class AbletonLinkController {
  constructor(store, stateTreePrefix) {
    this.store = store;

    this.stateTreePrefix = stateTreePrefix;

    this.link = new abletonlink();

    var lastBpm = this.link.bpm;
    this.link.startUpdate(20, (beat, phase, bpm) => {
      this.store.dispatch(abletonlinkRedux.actions.linkTransportChanged(beat, phase));
      if (bpm !== lastBpm) {
        this.store.dispatch(
          abletonlinkRedux.actions.linkBPMChanged(bpm)
        );
        lastBpm = bpm;
      }
    });

    this.store.subscribe(() => { this.handleStoreChanged(); });

  }

  handleStoreChanged() {
    var state = this.store.getState();

    if (this.stateTreePrefix) {
      state = state[this.stateTreePrefix];
    }

    if (state.queued_bpm) {
      this.link.bpm = state.queued_bpm;
    }
  }
}

export default AbletonLinkController;
