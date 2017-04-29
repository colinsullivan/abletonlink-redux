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
import { createStore } from "redux"

import liveLinkRootReducer from "./lib/reducers"
import AbletonLinkController from "./lib/AbletonLinkController";

const expect = chai.expect;

function configure_store (initialState) {
  return createStore(liveLinkRootReducer, initialState);
}

describe("reset statestore", function () {
  var store;

  beforeEach(function () {
    store = configure_store();
  });

  it("should init state", function (done) {
    let state = store.getState();
    expect(state.beat).to.equal(0.0);
    done();
  });
});

describe("link state", function() {
  var store = configure_store();
  var abletonLinkController = new AbletonLinkController(store);


  it("bpm should update right away", function (done) {
    setTimeout(() => {
      let state = store.getState();

      expect(state.bpm).to.equal(120.0);
      done();

    }, 100);
  });

  it("beat should update after 1 second", function (done) {
    setTimeout(() => {
      let state = store.getState();
      expect(state.beat).to.be.above(2.0);
      expect(state.phase).to.be.above(2.0);
      done();
    }, 1100);
  });

  it("phase should loop around beat", function (done) {
    setTimeout(() => {
      let state = store.getState();

      expect(state.beat).to.be.above(4.0);
      expect(state.phase).to.be.below(1.0);
      done();
    }, 1100);
  });

});

