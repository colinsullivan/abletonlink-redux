/**
 *  @file       test.js
 *
 *	@desc       Tests and example code.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import chai from "chai"
import { createStore, combineReducers } from "redux"

import abletonlinkRedux from "../"
const AbletonLinkController = abletonlinkRedux.AbletonLinkController;
const mountPoint = abletonlinkRedux.DEFAULT_MOUNT_POINT;

const expect = chai.expect;

function configure_store (initialState) {
  if (initialState) {
    return createStore(combineReducers({
      [mountPoint]: abletonlinkRedux.reducer
    }), {
      [mountPoint]: initialState
    });
  } else {
    return createStore(combineReducers({
      [mountPoint]: abletonlinkRedux.reducer
    }));
  }
}

describe("reset statestore", function () {
  var store;

  beforeEach(function () {
    store = configure_store();
  });

  it("should init state", function (done) {
    let state = store.getState()[mountPoint];
    expect(state.beat).to.equal(0.0);
    expect(state.bpm).to.equal(120.0);
    done();
  });
});

describe("link state", function() {
  var defaultState = Object.assign(abletonlinkRedux.create_default_state(), {
    bpm: 120.0
  });
  var store, abletonLinkController, reset;
  reset = function () {
    store = configure_store(defaultState);
    abletonLinkController = new AbletonLinkController(store);
  };


  it("bpm should update right away", function (done) {
    reset();
    setTimeout(() => {
      let state = store.getState()[mountPoint];

      expect(state.bpm).to.equal(120.0);
      done();

    }, 100);
  });

  it("should be immutable", function (done) {
    var oldState, newState, unsub;
    oldState = store.getState()[mountPoint];
    unsub = store.subscribe(() => {
      newState = store.getState()[mountPoint];

      expect(oldState).to.not.equal(newState);
      unsub();
      done();
    });
  });

  it("beat should update after 1 second", function (done) {
    setTimeout(() => {
      let state = store.getState()[mountPoint];
      expect(state.beat).to.be.above(2.0);
      expect(state.phase).to.be.above(2.0);
      done();
    }, 1100);
  });

  it("phase should loop around beat", function (done) {
    setTimeout(() => {
      let state = store.getState()[mountPoint];

      expect(state.beat).to.be.above(4.0);
      expect(state.phase).to.be.below(1.0);
      done();
    }, 1100);
  });

  it("should change tempo", function (done) {
    reset();

    store.dispatch(abletonlinkRedux.actions.linkTempoShouldChange(240.0));

    // now beats should advance twice as fast
    setTimeout(() => {
      let state = store.getState()[mountPoint];

      expect(state.bpm).to.equal(240.0);
      expect(state.beat).to.be.above(4);
      done();

    }, 1100);
  });

});

