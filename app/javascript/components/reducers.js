import { SET_USER_ID } from './actions'
const initialState = {userId: localStorage.getItem("userId")}

const gigApp = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ID:
          return {...state, ...{userId: action.userId}}
        default:
          return state
      }
}

export default gigApp