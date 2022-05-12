// import cookie from 'react-cookies'

const socketReducer = (state=null, action) => {


    // const ISSERVER = typeof window === "undefined";

        // if(!ISSERVER) {
        //     // Access localStorage
        //     if(cookie.load('qtonixemailextractweb_socketid')===undefined) {  
        //     }else{
        //     state = cookie.load('qtonixemailextractweb_socketid');
        //     }
        // }



    switch(action.type){
        case 'SET_SOCKET_ID':
            return action.payload
        default:
            return state;
    }
}

export default socketReducer;