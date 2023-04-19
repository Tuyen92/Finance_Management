import * as cookie from 'react-cookies';

const MyUserReducer= (state, action) => {
    switch(action.type){
        case "login":
            return action.payload
        case "logout":
            cookie.remove('access-token')
            cookie.remove('current_user')
            return null
        default:
            return state
    }
}

export default MyUserReducer