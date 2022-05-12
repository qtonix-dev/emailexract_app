import API from '../api/API'
import cookie from 'react-cookies'



// SET USER DETAILS
export const setUserDetails = data => async dispatch => {
    dispatch({type:'SET_USER_DETAILS', payload:data})
}

export const setSocketID = data => async dispatch => {
    cookie.remove('qtonixemailextractweb_socketid');
    cookie.save('qtonixemailextractweb_socketid',data);
    dispatch({type:'SET_SOCKET_ID', payload:data})
}


//NAVBAR PROGRESSINFO
export const navbarProgressInfo = () => async dispatch => {
    const response = await API.get(`/user/show_daily_data/${cookie.load('qtonixemailextractweb_userid')}`);
    // cookie.remove('qtonixemailextractweb_navbarprogress');
    // cookie.save('qtonixemailextractweb_navbarprogress', response.data);
    dispatch({type:'NAVBAR_PROGRESS_INFO', payload:response.data})
}
