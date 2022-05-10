import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import Navbar from '../components/Navbar'
import cookie from 'react-cookies'
import {setUserDetails,navbarProgressInfo} from '../actions'
import Loader from "react-loader-spinner";
import socketIoClient from 'socket.io-client'
const socket = socketIoClient(process.env.REACT_APP_BACKENDURL)


export class Body extends Component {


    componentDidMount(){
        this.props.setUserDetails(cookie.load('qtonixemailextractweb_userdata'))
        this.props.navbarProgressInfo();


        
    }



    componentDidUpdate(){
        console.log(socket)
        


            // var socket = io(process.env.REACT_APP_SOCKET, {     
            //     query: {
            //         category: category,
            //     }              
            // });
            // socket.connect();



            socket.emit('loginbulkextract', cookie.load('qtonixemailextractweb_userdata')._id);

            socket.on('testsocket',data=>{
                console.log(data)
            })
    }


    render() {
        return (
            <>
            
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
                {/* <div className="upgradewarning">
                    <center>
                    <p>You reached your monthly quota of searches. <Link exact to='/account/subscription/view'><b>Upgrade</b></Link> your subscription to continue.</p>
                    </center>
                </div> */}
                <Container>
                
                <br />
                {/* <Online> */}
                {this.props.children}

                {/* </Online>
                <Offline>
                    <center>
                    <img src="/images/im-offline-right-now.jpg" alt="nointernet" />
                    <h2>
                    Please check your internet connection
                    </h2>
                    </center>
                </Offline> */}


                </Container>
                </>
                }

            {/* </>
            } */}


                

                


                <br />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user:state.users,
    navbarprogress:state.navbarprogress
})


export default connect(mapStateToProps, {setUserDetails,navbarProgressInfo})(Body)
