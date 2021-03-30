import { Api, Network } from '../config/http'
/**
 * type
 */

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT = 'LOGOUT'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAILURE = 'REGISTER_FAILURE'
const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
const PROFILE_FAILURE = 'PROFILE_FAILURE'

/**
 * state
 */
const initState = {
  user: '',
  msg: '',
  refresh: 1
}

/**
 * reducer
 * @param {*} state 
 * @param {*} action 
 */
export function user(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        msg: action.payload.msg
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: '',
        msg: action.payload.msg
      }
    case LOGOUT:
      return {
        user: '',
        msg: '',
        refresh: 0
      }
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        user: '',
        msg: action.payload
      }
    case PROFILE_SUCCESS:
    case PROFILE_FAILURE:
      return {
        ...state,
        user: action.payload.data,
        msg: action.payload.message
      }
    default:
      return state
  }
}

/**
 * action type
 */

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

export function loginFailure(data) {
  return {
    type: LOGIN_FAILURE,
    payload: data
  }
}

export function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

export function registerFailue(data) {
  return {
    type: REGISTER_FAILURE,
    payload: data
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

function profileSuccess(data) {
  return {
    type: PROFILE_SUCCESS,
    payload: data
  }
}

function profileFailure(data) {
  return {
    type: PROFILE_FAILURE,
    payload: data
  }
}


// params: {
//   offset,
//   limit,
//   tags,
//   catalog_id,
//   order
// }
export function getProfile({
  uid
}) {
  return dispatch => {
    Network.get(Api.profile.url(), { "uid": uid })
      .then(res => {
        if (res.status === 0) {
          dispatch(profileSuccess(res))
        } else {
          dispatch(profileFailure(res))
        }
      })
  }
}