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

describe("transport", function() {
  var store = configure_store();
  var abletonLinkController = new AbletonLinkController(store);

  it("should update after 1 second", function (done) {
    setTimeout(() => {
      let state = store.getState();
      expect(state.beat).to.be.above(2.0);
      done();
    }, 1100);
  });

});

