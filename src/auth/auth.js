import React from "react";
// import { Route, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

import cookie from 'react-cookies'

export const ProtectedRouteUser = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {

        const logindata = cookie.load('qtonixemailextractweb_userlogin') === 'true';
      
        if (logindata) {
          
          // // Check Email Verify
          // var data=cookie.load('qtonixemailextractweb_emailverification');


          // if(data !=='Verified'){
          //   return <Redirect to="/verifyemail" />
          // }else{
          //   return <Component {...props} />;
          // }

          return <Component {...props} />;

        } else {
            window.location.href = process.env.REACT_APP_APPURL+'/login';
        //   return (
        //     <Redirect
        //       to={{
        //         pathname: '/'+process.env.REACT_APP_BACKENDURL+'/login',
        //         state: {
        //           from: props.location
        //         }
        //       }}
              
        //     />
        //   );

        }
      }}
    />
  );
};