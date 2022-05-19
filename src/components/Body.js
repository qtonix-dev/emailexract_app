import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import Navbar from '../components/Navbar'
// import {Link} from 'react-router-dom'
import cookie from 'react-cookies'
import {setUserDetails,navbarProgressInfo,setSocketID} from '../actions'
import Loader from "react-loader-spinner";
// import socketIoClient from 'socket.io-client'
import {Helmet} from "react-helmet";





export class Body extends Component {

    constructor(props){
        super(props)
        this.state={
            loading:false,
            multipleTab:false,
        }
    }


    componentDidMount(){
        this.props.setUserDetails(cookie.load('qtonixemailextractweb_userdata'))
        this.props.navbarProgressInfo();

        //============DO NOT DELETE============//
        // const socket = socketIoClient(process.env.REACT_APP_BACKENDURL,{     
        //     query: {
        //         userid: cookie.load('qtonixemailextractweb_userdata')._id,
        //     }              
        // })


        
        // socket.emit('loginbulkextract',cookie.load('qtonixemailextractweb_userdata')._id);

    
        // socket.on("connect", () => {
        //     console.log(socket.id);
        // });



        // socket.off('getuserinfo').on('getuserinfo', (data) => {
        //     if(data.socketid===socket.id){
        //         this.setState({
        //             multipleTab:false
        //         })

        //     }else{
        //         this.setState({
        //             multipleTab:true
        //         })
        //     }
        // });
        //============DO NOT DELETE============//


    }


    

    render() {
        return (
            <>
            {this.state.multipleTab
            ?
            <Helmet>
                <title>Duplicate (Email Extract Online)</title>
            </Helmet>
            :
            <Helmet>
                <title>Email Extract Online</title>
            </Helmet>
            }


            
                {this.props.user===undefined
                ?
                <Container>

                    

                    <br /><br /><br /><br /><br />
                    <center>
                        <Loader type="TailSpin"
                        color="black"
                        height={100}
                        width={100} 
                        />
                    </center>
                </Container>
                :
                <>
                <Navbar user={this.props.user} />
                    <Container>
                        

                            {this.state.multipleTab
                            ?
                            <center>
                                <br/>
                                <br/>
                                <br/>

                                <h2>Multiple Tab / Login are not allowed.</h2>
                            </center>
                            :
                            <>
                                <br />
                                {this.props.children}
                            </>
                            }
                        
                        
                        
                    </Container>
                </>
                }
                <br />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user:state.users,
    navbarprogress:state.navbarprogress
})


export default connect(mapStateToProps, {setUserDetails,navbarProgressInfo,setSocketID})(Body)
