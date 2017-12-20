import * as actions from "./lib/actions"
import * as actionTypes from "./lib/actionTypes"
import reducer, { create_default_state, DEFAULT_MOUNT_POINT } from "./lib/reducers"
import AbletonLinkController from './lib/AbletonLinkController'

export default {
  DEFAULT_MOUNT_POINT,
  actions,
  actionTypes,
  reducer,
  create_default_state,
  AbletonLinkController
}
