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

import * as actions from "./actions"

/**
 *  @class        AbletonLinkController
 *
 *  @classdesc    Entity which spawns the Ableton Link instance and
 *  translates updates into actions for the Redux state store.
 *  
 **/
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
