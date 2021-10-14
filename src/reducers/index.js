import {combineReducers} from 'redux'

import userReducer from './userReducer'
import navbarProgressInfo from './navbarProgressInfo'

// const songReducer = () => {
//     return[
//         {title:'Song1', duration:'4.45'},
//         {title:'Song2', duration:'5.45'},
//         {title:'Song3', duration:'6.45'},
//         {title:'Song4', duration:'7.45'},
//         {title:'Song5', duration:'8.45'},
//     ]
// };

export default combineReducers({
    // songs:songReducer,
    users:userReducer,
    navbarprogress:navbarProgressInfo
})