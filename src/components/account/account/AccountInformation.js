import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Form, Button } from 'semantic-ui-react'
import { FiUser } from "react-icons/fi";
import { IoChevronDown,IoChevronUp } from "react-icons/io5";
import API from '../../../api/API'
import cookie from 'react-cookies'
import {setUserDetails} from '../../../actions'
import { toast } from 'react-toastify';

export class AccountInformation extends Component {

    constructor(props){
        super(props)
        this.state={
            hideTab:true,
            formLoading:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.showHideTab=this.showHideTab.bind(this)
    }

    showHideTab(e){
        if(this.state.hideTab){
        this.setState({hideTab:false})
        }else{
        this.setState({hideTab:true})
        }
    }


    componentDidMount(){
        var user = this.props.user;
        this.setState({
            id:user._id,
            name:user.name,
            email:user.email,
            contact:user.contact,
            city:user.city,
            company:user.company,

        })
    }


    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit=()=>{
        this.setState({formLoading:true})
        var tempData = {
            id:this.state.id,
            name:this.state.name,
            contact:this.state.contact,
            city:this.state.city,
            company:this.state.company,


        }
        API.post('/user/chnage_account_details',tempData)
        .then(response=>{
            this.setState({formLoading:false,hideTab:true})


            if(response.data.response){
                toast.success('Successfully updated', {
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
            }else{
                alert('Failed')
            }

                    
        })
    }

    render() {
        return (
            <div className="accountcontainer_box_linkbox">
                <Grid>
                    <Grid.Column mobile={2} >
                        <center className="accountcontainer_box_linkbox_center">
                            <span className="accountcontainer_box_linkbox_icon"><FiUser /></span>
                        </center>
                    </Grid.Column>
                    <Grid.Column mobile={14} >
                    <h5 className="cursor-pointer" onClick={this.showHideTab}>Account  {this.state.hideTab?<span onClick={this.showHideTab} className="cursor-pointer"><IoChevronDown /></span>:<span onClick={this.showHideTab} className="cursor-pointer"><IoChevronUp /></span>}  </h5>
                    <p className="cursor-pointer" onClick={this.showHideTab}>Update your email address, name and time zone.</p>
                    </Grid.Column>
                    {this.state.hideTab
                    ?
                    <></>
                    :
                    <Grid.Column  mobile={16}>
                        
                        <Form success loading={this.state.formLoading} onSubmit={this.handleSubmit}>
                            <Form.Input label='Name' value={this.state.name} name="name" onChange={this.handleChange} placeholder='' />
                            <Form.Input label='Company' value={this.state.company} name="company"onChange={this.handleChange} placeholder='' />

                            <Form.Input label='Contact' value={this.state.contact} name="contact"onChange={this.handleChange} placeholder='' />
                            <Form.Input label='City' value={this.state.city} name="city"onChange={this.handleChange} placeholder='' />

                            {/* <Message
                            success
                            header='Form Completed'
                            content="You're all signed up for the newsletter"
                            /> */}
                            <Button className="bgmblue text-white">Update Information</Button>
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


export default connect(mapStateToProps, {setUserDetails})(AccountInformation)
