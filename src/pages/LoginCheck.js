import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import API from '../api/API'
import { toast } from 'react-toastify';
import cookie from 'react-cookies'
import {setSocketID} from '../actions'


export const LoginCheck = (props) => {


    useEffect(()=>{
        console.log(props)
        var tempData = {
            userid:props.match.params.userid,
            loginid:props.match.params.loginid
        }

        API.post('/user/loginchecktwo',tempData)
        .then(response=>{
            

            if(response.data.response){
                props.setSocketID('9658667287')


                toast.success('Login Success', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                cookie.remove('qtonixemailextractweb_userdata', { path: '/' })
                cookie.remove('qtonixemailextractweb_userlogin', { path: '/' })
                cookie.remove('qtonixemailextractweb_userid', { path: '/' })
                cookie.remove('qtonixemailextractweb_navbarprogress', { path: '/' });
                cookie.remove('qtonixemailextractweb_emailverification', { path: '/' });



                var expires = new Date();
                expires.setSeconds(21600);
                cookie.save('qtonixemailextractweb_userdata', response.data.user, { path: '/',expires });
                cookie.save('qtonixemailextractweb_userid', response.data.user._id, { path: '/',expires });
                cookie.save('qtonixemailextractweb_userlogin',true, { path: '/',expires });
                cookie.save('qtonixemailextractweb_emailverification', response.data.user.emailverification, { path: '/' });


                // props.history.push('/')
                window.location.href = '/'
                // console.log(response.data.user)


            }else{
                toast.success('Login Failed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                window.location.assign(`${process.env.REACT_APP_APPURL}/login`);


            }


        })



    },[props])



    return (
        <Grid verticalAlign="middle">
            <Grid.Column mobile={7} tablet={7} computer={7}></Grid.Column>
            <Grid.Column mobile={2} tablet={2} computer={2}>
                <br /><br /><br /><br /><br /><br />
                <center>
                <img src="https://cdn.dribbble.com/users/1907055/screenshots/10812238/media/60bf4d08e816fe6b561b02a462d5e31c.gif" alt="sasas" className="w-100" />
                <p>Checking...</p>
                </center>
            </Grid.Column>
            <Grid.Column mobile={7} tablet={7} computer={7}></Grid.Column>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps, {setSocketID})(LoginCheck)
