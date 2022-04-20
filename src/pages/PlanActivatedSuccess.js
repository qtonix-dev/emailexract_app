import React, { Component } from 'react'
import { connect } from 'react-redux'
import Body from '../components/Body'
import { FiCheckCircle } from "react-icons/fi";
import cookie from 'react-cookies'
import API from '../api/API'
import {Link} from 'react-router-dom'

export class PlanActivatedSuccess extends Component {

    constructor(props){
        super(props)
        this.state={
            pageLoading:true
        }
    }


    componentDidMount(){


        if(cookie.load('qtonixemailextractweb_paymentdetails')===undefined){
            this.props.history.push('/')
        }else{
            console.log(cookie.load('qtonixemailextractweb_paymentdetails'))

            var data = cookie.load('qtonixemailextractweb_paymentdetails');



            if(data.uuid === this.props.match.params.uuid){

                var tempData = {
                    _id:data.userid,
                    packageid:data.packagedetails._id
                }

                API.post('/user/adminupdateuserpackage', tempData)
                .then(response=>{
                    if(response.data.response){

                        API.post('/user/userpaymentstore', data)
                        .then(response=>{
                            console.log(response.data)
                            if(response.data.response){
                                this.setState({
                                    pageLoading:false,
                                    data:data
                                })
                            }else{
                                this.props.history.push('/paymentfailed');
                            }
                        })

                    }else{
                        this.props.history.push('/paymentfailed');

                    }
                })
               
                


            }else{
                this.props.history.push('/paymentfailed');

            }


        }

       
    }

    render() {
        console.log(this.state)
        return (
            <>
               <Body>
                    <div className="cuscontainer">
                        {this.state.pageLoading
                        ?
                        <center>
                            <br /><br />
                            <img src="https://www.costcoauto.com/save/images/ajax-loading.gif" alt="loader" style={{width:'50px'}} />
                            <h5>Please don't close or refresh the page...</h5>
                            <br /><br />

                        </center>
                        :
                        <>
                        <div className="paymentsuccess">
                            <center><FiCheckCircle className="paymentsuccess_icon" /></center>
                            <h1>Payment successfull!</h1>
                            <div className="paymentsuccess_box">
                                <p>Name <span className="float-right">{this.state.data.name}</span> </p>
                                <p>Email <span className="float-right">{this.state.data.email}</span> </p>
                                <p>Mobile <span className="float-right">{this.state.data.phone}</span> </p>
                                <p>Amount Paid <span className="float-right">$ {this.state.data.amountpaid}</span> </p>
                                <p>Transaction ID <span className="float-right">{this.state.data.uuid}</span> </p>

                                <br />
                                
                                
                            </div>
                        </div>
                        <center>
                                <Link exact to='/'>Go to home</Link>
                                </center>
                        </>
                        }


                        
                        
                        
                    </div>   
                </Body> 
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanActivatedSuccess)
