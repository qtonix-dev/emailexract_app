import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import Navbar from '../components/Navbar'
// import {Link} from 'react-router-dom'
import cookie from 'react-cookies'
import {setUserDetails,navbarProgressInfo} from '../actions'
import Loader from "react-loader-spinner";


export class Body extends Component {


    componentDidMount(){
        this.props.setUserDetails(cookie.load('qtonixemailextractweb_userdata'))
        this.props.navbarProgressInfo();
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

                {this.props.children}

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
