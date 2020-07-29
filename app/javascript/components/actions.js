import axios from 'axios'

export const SET_USER_ID = 'SET_USER_ID'
export const SET_USERNAME = 'SET_USERNAME'
export const IS_LOGGED_IN = 'IS_LOGGED_IN'
export const FETCH_LOGIN = 'FETCH_LOGIN'
export const IS_NOT_LOGGED_IN = 'IS_NOT_LOGGED_IN'

export const setUserId = (userId) => ({
    type: SET_USER_ID,
    userId
})

export const setUsername = (username) => ({
    type: SET_USERNAME,
    username
})

export const fetchLogin = () => {
    return (dispatch) => {
        axios.get('http://localhost:3000/logged_in', 
        {withCredentials: true})
        .then(loginStatus => {
            if (loginStatus.data.logged_in == true) {
            dispatch({ type: IS_LOGGED_IN, loginStatus: true })
        } else if (loginStatus.data.logged_in == false) {
            dispatch({ type: IS_NOT_LOGGED_IN, loginStatus: false})
        }
    })
        
    }

}