import React, { Component } from 'react'
import { connect } from 'react-redux'
import Body from '../../components/Body'
import { Button, Grid } from 'semantic-ui-react'
import AccountSidenav from '../../components/account/AccountSidenav'
import { FiCheck,FiX } from "react-icons/fi";
import { Redirect } from 'react-router-dom'
import API from '../../api/API'
import cookie from 'react-cookies'
import Moment from 'react-moment';
import {Link} from 'react-router-dom'

export class AccountSubscription extends Component {

    constructor(props){
        super(props)
        this.state={
            
        }
    }

    componentDidMount(){
        API.get(`/user/viewuserpackage/${cookie.load('qtonixemailextractweb_userid')}`)
        .then(response=>{
            console.log(response.data)
        })
    }



    render() {
        console.log(this.props.navbarprogress)
        return (
            <Body>
               <Grid>
                    <Grid.Column mobile={16} tablet={6} computer={4}>
                        <AccountSidenav />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={10} computer={12}>
                    <section>
                    <div className="accountcontainer">
                        <Grid>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <h3>Subscription  <Button color='orange' className='float-right'><Link exact to='/account/subscription/view' className="text-white">Upgrade</Link></Button> </h3>
                                    <br />
                                    
                                </Grid.Column>

                                {this.props.navbarprogress===undefined || this.props.navbarprogress===null
                                ?
                                <></>
                                :
                                <>
                                {this.props.navbarprogress.package==='no_package_found'
                                ?
                                <Redirect to='/account/subscription/view' />
                                :
                                <>
                                <Grid.Column>
                                    <h4>{this.props.navbarprogress.packageinfo.name} Plan ({this.props.navbarprogress.packageinfo.type})</h4>
                                    <hr />
                                    <Grid>
                                        <Grid.Column mobile={16} tablet={8} computer={8}>
                                            <div className="subscription_box">
                                                <h5>Quotas</h5>
                                                <p><span className="text-success"><FiCheck /></span>{this.props.navbarprogress.packageinfo.totalsingledomain===123456789?'Unlimited':this.props.navbarprogress.packageinfo.totalsingledomain} Domain Search /mo</p>
                                                <p><span className="text-success"><FiCheck /></span>{this.props.navbarprogress.packageinfo.totalemailsearch===123456789?'Unlimited':this.props.navbarprogress.packageinfo.totalemailsearch} Email Finder /mo</p>
                                                <p><span className="text-success"><FiCheck /></span>{this.props.navbarprogress.packageinfo.totalemailverification===123456789?'Unlimited':this.props.navbarprogress.packageinfo.totalemailverification} Email Verifier /mo</p>
                                                <p><span className="text-success"><FiCheck /></span>{this.props.navbarprogress.packageinfo.totalbuldomainkextract===123456789?'Unlimited':this.props.navbarprogress.packageinfo.totalbuldomainkextract} Bulk Domain Extract /mo</p>
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column mobile={16} tablet={8} computer={8}>
                                            <div className="subscription_box">
                                                <h5>Premium features</h5>
                                                {this.props.navbarprogress.packageinfo.name==='Free'
                                                ?
                                                <>
                                                <p><span className="text-danger"><FiX /></span>CSV Exporting</p>
                                                <p><span className="text-danger"><FiX /></span>Techinical support</p>
                                                </>
                                                :
                                                <>
                                                <p><span className="text-success"><FiCheck /></span>CSV Exporting</p>
                                                <p><span className="text-success"><FiCheck /></span>Techinical support</p>
                                                </>
                                                }
                                                
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column mobile={16} tablet={8} computer={8}>
                                            <div className="subscription_box">
                                                <h5>Price</h5>
                                                <p style={{color:'#0495fd', fontSize:'28px', fontWeight:'600'}}>${this.props.navbarprogress.packageinfo.displayprice}</p>
                                            </div>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column>
                                    <br />
                                    <h4>Subscription status</h4>
                                    <hr />
                                    <Grid>
                                        <Grid.Column mobile={16} tablet={8} computer={8}>
                                            <div className="subscription_box">
                                                <h5>Active</h5>
                                                <p>Next plan renewal on <Moment format="MMMM DD, YYYY">{this.props.navbarprogress.userinfo.packageenddate}</Moment></p>
                                            </div>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                </>
                                }
                                
                                </>
                                }


                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    </section>
                    </Grid.Column>
                </Grid>

            </Body>
        )
    }
}

const mapStateToProps = (state) => ({
    navbarprogress:state.navbarprogress
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSubscription)
