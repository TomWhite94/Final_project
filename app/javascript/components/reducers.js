import { SET_USER_ID } from './actions'
import { SET_USERNAME } from './actions'
import { IS_LOGGED_IN } from './actions'
import { IS_NOT_LOGGED_IN} from './actions'

const initialState = {userId: localStorage.getItem("userId"), username: localStorage.getItem("username")}

const gigApp = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ID:
          return {...state, ...{userId: action.userId}}
        case SET_USERNAME:
            return {...state, ...{username: action.username}}
        case IS_LOGGED_IN:
            return {...state, ...{loginStatus: true}}
        case IS_NOT_LOGGED_IN:
            return {...state, ...{loginStatus: false}}
        default:
          return state
      }
}

export default gigApp