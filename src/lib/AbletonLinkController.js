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
import * as actions from './actions'
import { DEFAULT_MOUNT_POINT } from './reducers'

/**
 *  @class        AbletonLinkController
 *
 *  @classdesc    Entity which spawns the Ableton Link instance and
 *  translates updates into actions for the Redux state store.
 *
 **/
class AbletonLinkController {

  /**
   *  @constructor
   *
   *  @param  {redux.StateStore}  store - The state store instance.
   *  @param  {String}  mountPoint - The mount point of the abletonlink state
   *  within the overall state tree.
   *  @param  {Number}  updateInterval - The update interval for abletonlink
   **/
  constructor(
    store,
    mountPoint = DEFAULT_MOUNT_POINT,
    updateInterval = 20
  ) {
    this.store = store;

    this.mountPoint = mountPoint;

    this.link = new abletonlink();

    var lastBpm = this.link.bpm;
    this.link.startUpdate(updateInterval, (beat, phase, bpm) => {
      this.store.dispatch(actions.linkTransportChanged(beat, phase));
      if (bpm !== lastBpm) {
        this.store.dispatch(
          actions.linkBPMChanged(bpm)
        );
        lastBpm = bpm;
      }
    });

    this.store.subscribe(() => { this.handleStoreChanged(); });

  }

  handleStoreChanged() {
    var state = this.store.getState()[this.mountPoint];

    if (state.queued_bpm) {
      this.link.bpm = state.queued_bpm;
    }
  }
}

export default AbletonLinkController;
