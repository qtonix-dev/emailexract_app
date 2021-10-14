import cookie from 'react-cookies'

const userReducer = (state=null, action) => {


    const ISSERVER = typeof window === "undefined";

        if(!ISSERVER) {
            // Access localStorage
            if(cookie.load('qtonixemailextractweb_userdata')===undefined) {  
            }else{
            state = cookie.load('qtonixemailextractweb_userdata');
            }
        }



    switch(action.type){
        case 'SET_USER_DETAILS':
            return action.payload
        default:
            return state;
    }
}

export default userReducer;