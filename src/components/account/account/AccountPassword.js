import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Grid,Form,Button} from 'semantic-ui-react'
import { FiUnlock } from "react-icons/fi";
import { IoChevronDown,IoChevronUp } from "react-icons/io5";
import API from '../../../api/API'
import cookie from 'react-cookies'
import {setUserDetails} from '../../../actions'
import { toast } from 'react-toastify';

export class AccountPassword extends Component {

    constructor(props){
        super(props)
        this.state={
            formLoading:false,
            hideTab:true
        }
        this.showHideTab=this.showHideTab.bind(this)
        this.handleChnage=this.handleChnage.bind(this)

    }
    

    showHideTab(e){
        if(this.state.hideTab){
        this.setState({hideTab:false})
        }else{
        this.setState({hideTab:true})
        }
    }

    handleChnage(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    componentDidMount(){
        var user = this.props.user;
        this.setState({
            id:user._id,
            backuppassword:user.password
        })
    }

    handleSubmit=()=>{
        this.setState({formLoading:true})
        console.log(this.state)

        var state = this.state;

        if(state.backuppassword===state.oldpassword){

            if(state.newpassword===state.reenternewpassword){

                var tempData={
                    id:state.id,
                    password:state.newpassword
                }

                API.post('/user/chnage_account_details',tempData)
                .then(response=>{
                    this.setState({formLoading:false,hideTab:true,oldpassword:'',newpassword:'',reenternewpassword:''})

                    toast.success('Success', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    this.props.setUserDetails(response.data.user)
    
                        cookie.remove('qtonixemailextractweb_userdata', { path: '/' })
                        cookie.remove('qtonixemailextractweb_userdata', { path: '/' })
                        cookie.remove('qtonixemailextractweb_userid', { path: '/' })
    
    
                        var expires = new Date();
                        expires.setSeconds(21600);
                        cookie.save('qtonixemailextractweb_userdata', response.data.user, { path: '/',expires });
                        cookie.save('qtonixemailextractweb_userid', response.data.user._id, { path: '/',expires });
                })

            }else{
                this.setState({formLoading:false})
                toast.error('New and reenter passwords are not matching', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
    
            }

        }else{
            toast.error('Old password is not matching', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({formLoading:false})
        }

        
    }

    render() {
        return (
            <div className="accountcontainer_box_linkbox">
                <Grid>
                     <Grid.Column mobile={2} >
                           <center className="accountcontainer_box_linkbox_center">
                              <span className="accountcontainer_box_linkbox_icon"><FiUnlock /></span>
                           </center>
                    </Grid.Column>
                    <Grid.Column mobile={14} >
                    <h5 className="cursor-pointer" onClick={this.showHideTab}>Password {this.state.hideTab?<span onClick={this.showHideTab} className="cursor-pointer"><IoChevronDown /></span>:<span onClick={this.showHideTab} className="cursor-pointer"><IoChevronUp /></span>}  </h5>
                    <p className="cursor-pointer" onClick={this.showHideTab}>Update your email address, name and time zone.</p>
                    </Grid.Column>
                    {this.state.hideTab
                    ?
                    <></>
                    :
                    <Grid.Column  mobile={16}>
                        
                        <Form success loading={this.state.formLoading} onSubmit={this.handleSubmit}>
                            <Form.Input type="password" label='Old Password' name="oldpassword" value={this.state.oldpassword} onChange={this.handleChnage} placeholder='' />
                            <Form.Input type="password" label='New Password' placeholder='' name="newpassword" value={this.state.newpassword} onChange={this.handleChnage} />
                            <Form.Input type="password" label='Reenter New Password' placeholder='' name="reenternewpassword" value={this.state.reenternewpassword} onChange={this.handleChnage} />


                            {/* <Message
                            success
                            header='Form Completed'
                            content="You're all signed up for the newsletter"
                            /> */}
                            <Button className="bgmblue text-white">Change Password</Button>
                        </Form>
                        <br /><br />
                    </Grid.Column>
                    }
                </Grid>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user:state.users
})


export default connect(mapStateToProps, {setUserDetails})(AccountPassword)
