import {AUTHENTICATE_USER, LOGOUT_USER} from "./actions";

export function authentication(state = {}, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {user: action.user}
    case LOGOUT_USER:
      return {user: undefined}
    default:
      return state
  }
}