import {_getUsers} from "../_DATA";

export const RECEIVE_USERS_DATA = 'RECEIVE_USERS_DATA';

export function receiveUsersAction(users) {
  return {
    type: RECEIVE_USERS_DATA,
    users,
  }
}

export function handleLoadUsers() {
  return (dispatch) => {
    _getUsers().then((users) => {
      dispatch(receiveUsersAction(users))
    })
  }
}