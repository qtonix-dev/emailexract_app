import cookie from 'react-cookies'

const navbarProgressInfo = (state=null, action) => {


    const ISSERVER = typeof window === "undefined";

        if(!ISSERVER) {
            // Access localStorage
            if(cookie.load('qtonixemailextractweb_navbar_progress_info')===undefined) {  
            }else{
            state = cookie.load('qtonixemailextractweb_navbar_progress_info');
            }
        }



    switch(action.type){
        case 'NAVBAR_PROGRESS_INFO':
            return action.payload
        default:
            return state;
    }
}

export default navbarProgressInfo;