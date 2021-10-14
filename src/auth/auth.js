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

        // const logindata = localStorage.getItem('aquastorelogin') === 'true'
        const logindata = cookie.load('qtonixemailextractweb_userlogin') === 'true';

        // const navbarprofress = cookie.load('qtonixemailextractweb_navbarprogress');

        // console.log(navbarprofress)
      
        if (logindata) {
          

          //Check Email Verify
          // var data = JSON.parse(localStorage.getItem('qbuserdata'));
          // var data = localStorage.getItem('qbuseremailverify');
          // var data=cookie.load('qbuserdata');


          // if(localStorage.getItem('aquastoreemailverify') !=='Verified'){
          //   return <Redirect to="/emailverify" />
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