import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { Menu, Dropdown, Button, Grid } from 'semantic-ui-react'
import { Line } from 'rc-progress';
import { IoSearchOutline, IoPaperPlaneOutline, IoShieldCheckmarkOutline, IoPodiumOutline } from "react-icons/io5";
import percentage from 'calculate-percentages'
import cookie from 'react-cookies'

export class Navbar extends Component {

    constructor(props){
        super(props)
        this.state={
            user:this.props.user
        }
    }


    handleLogout=e=>{
        cookie.remove('qtonixemailextractweb_userdata', { path: '/' })
        cookie.remove('qtonixemailextractweb_userlogin', { path: '/' })
        cookie.remove('qtonixemailextractweb_userid', { path: '/' })

        window.location.href = process.env.REACT_APP_APPURL+'/login';
    }


    render() {


        const trigger = (
            <>
            <span><img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="userimage" style={{width:'33px',marginRight:'12px'}} /></span>
            <span>{this.props.user.name}</span>
            </>
          )
        return (
            <>
            <Grid>
                <Grid.Row columns={1} only='computer tablet'>
                    <Grid.Column>
                        <Menu pointing secondary  size='huge'>
                            <Menu.Item>
                                <img src='https://admin.emailextractonline.com/images/favicon.png' alt="logo" style={{width:'29px'}} />
                            </Menu.Item>
                            
                            <Link exact to='/' className="navsitem">
                            <Menu.Item
                                // name= 'Search'
                                active={window.location.pathname==='/'?true:false}
                                className="navsitem"
                            >
                                <IoSearchOutline /> &nbsp; Search
                            </Menu.Item>
                            </Link>

                            <Link exact to='/finder' className="navsitem">
                            <Menu.Item
                                // name= 'Search'
                                active={window.location.pathname==='/finder'?true:false}
                                className="navsitem"
                            >
                                <IoPaperPlaneOutline /> &nbsp; Finder
                            </Menu.Item>
                            </Link>

                            <Link exact to='/verify' className="navsitem">
                            <Menu.Item
                                active={window.location.pathname==='/verify'?true:false}
                                className="navsitem"
                            >
                            <IoShieldCheckmarkOutline /> &nbsp; Verifier
                            </Menu.Item>
                            </Link>


                            <Link exact to='/bulks' className="navsitem">
                            <Menu.Item
                                active={window.location.pathname==='/bulks'?true:false}
                                className="navsitem"
                            >
                            <IoPodiumOutline /> &nbsp; Bulks
                            </Menu.Item>
                            </Link>

                            
                            
                            <Menu.Menu position='right' style={{backgroundColor: '#f1f1f1'}}>
                                <Dropdown item trigger={trigger}>
                                    <Dropdown.Menu>
                                        {/* <Dropdown.Item><Link exact to='/'>Account</Link></Dropdown.Item>
                                        <Dropdown.Item><Link exact to='/'>Subscription</Link></Dropdown.Item>
                                        <Dropdown.Item><Link exact to='/'>Logout</Link></Dropdown.Item> */}
                                        <div className="dropdownitems">
                                    
                                        <br />
                                        <div className='navbprgs' style={{lineHeight:'7px'}}>

                                            {this.props.navbarprogress===null
                                            ?<></>
                                            :
                                            <>
                                            {this.props.navbarprogress.package==='no_package_found'
                                            ?
                                            <>
                                            <p style={{visibility:'hidden'}}>Monthly quotas reset in 22 days.</p>
                                            </>
                                            :
                                            <>
                                                <h6>Domain Search <span className="float-right">{this.props.navbarprogress.single_domain_search} / {this.props.navbarprogress.packageinfo.totalsingledomain}</span></h6>
                                               
                                                <br /><Line percent={percentage.calculate(this.props.navbarprogress.single_domain_search, this.props.navbarprogress.packageinfo.totalsingledomain)} strokeWidth="3" strokeColor="#0495fd" />
                                                <br />

                                                <h6>EmailFinder <span className="float-right">{this.props.navbarprogress.email_finder} / {this.props.navbarprogress.packageinfo.totalemailsearch}</span>  </h6>
                                               
                                                <br /><Line percent={percentage.calculate(this.props.navbarprogress.email_finder, this.props.navbarprogress.packageinfo.totalemailsearch)} strokeWidth="3" strokeColor="#0495fd" />
                                                <br />

                                                <h6>Verifier <span className="float-right">{this.props.navbarprogress.email_verification} / {this.props.navbarprogress.packageinfo.totalemailverification}</span></h6>
                                               
                                                <br /><Line percent={percentage.calculate(this.props.navbarprogress.email_verification, this.props.navbarprogress.packageinfo.totalemailverification)} strokeWidth="3" strokeColor="#0495fd" />
                                                <br />

                                                {this.props.navbarprogress.packageinfo.totalbuldomainkextract===123456789
                                                ?<h6>Bulk Domain Extract <span className="float-right"> Unlimited</span></h6>
                                                :<h6>Bulk Domain Extract <span className="float-right">{this.props.navbarprogress.bulk_domain_search} / {this.props.navbarprogress.packageinfo.totalbuldomainkextract}</span></h6>
                                                }
                                                
                                               
                                                <br /><Line percent={percentage.calculate(this.props.navbarprogress.bulk_domain_search, this.props.navbarprogress.packageinfo.totalbuldomainkextract)} strokeWidth="3" strokeColor="#0495fd" />
                                                <br />
                                                
                                                <br />

                                                <p style={{visibility:'hidden'}}>Monthly quotas reset in 22 days xxxxxxx.</p>
                                            </>
                                            }
                                                
                                            </>
                                            }

                                            
                                        </div>
                                        


                                        {this.props.admin.type==='SubUser'
                                        ?
                                        <>
                                        <br />
                                        <p><Link exact to='/account'><span>Account</span></Link></p> <br />
                                        <p><Link exact to='/account/usage'><span>Usage</span></Link></p><br />
                                        <p onClick={this.handleLogout}>
                                           <center style={{backgroundColor: '#0495fd', padding: 15, color: '#ffffff', cursor: 'pointer'}}>Logout</center>

                                        </p><br />
                                        </>
                                        :
                                        <>
                                        <Button className="bgmblue w-100 text-white dpsubbtn"><Link exact to='/account/subscription' className="text-white">Upgrade</Link></Button>
                                        <br /> <br /> <br />
                                        <p><Link exact to='/account'><span>Account</span></Link></p> <br />
                                        <p><Link exact to='/account/subscription'><span>Subscription</span></Link></p><br />
                                        <p><Link exact to='/account/usage'><span>Usage</span></Link></p><br />
                                        <p onClick={this.handleLogout}><span>Logout</span></p><br />
                                        </>
                                        }

                                        
                                    
                                        </div>
                                        


                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>


                
                <Grid.Row columns={1} only='mobile'>
                <Grid.Column>
                        <Menu pointing secondary  size='huge'>
                            <Menu.Item>
                                <img src='https://admin.emailextractonline.com/images/favicon.png' alt="logo" style={{width:'29px'}} />
                            </Menu.Item>
                            

                            <Link exact to='/' className="navsitem">
                            <Menu.Item
                                // name= 'Search'
                                active={window.location.pathname==='/'?true:false}
                                className="navsitem"
                            >
                                <IoSearchOutline />
                            </Menu.Item>
                            </Link>

                            <Link exact to='/finder' className="navsitem">
                            <Menu.Item
                                // name= 'Search'
                                active={window.location.pathname==='/finder'?true:false}
                                className="navsitem"
                            >
                                <IoPaperPlaneOutline />
                            </Menu.Item>
                            </Link>

                            <Link exact to='/verify' className="navsitem">
                            <Menu.Item
                                active={window.location.pathname==='/verify'?true:false}
                                className="navsitem"
                            >
                            <IoShieldCheckmarkOutline />
                            </Menu.Item>
                            </Link>


                            <Link exact to='/bulks' className="navsitem">
                            <Menu.Item
                                active={window.location.pathname==='/bulks'?true:false}
                                className="navsitem"
                            >
                            <IoPodiumOutline />
                            </Menu.Item>
                            </Link>

                            
                            
                            <Menu.Menu position='right'>
                                <Dropdown item trigger={trigger}>
                                    <Dropdown.Menu>
                                        {/* <Dropdown.Item><Link exact to='/'>Account</Link></Dropdown.Item>
                                        <Dropdown.Item><Link exact to='/'>Subscription</Link></Dropdown.Item>
                                        <Dropdown.Item><Link exact to='/'>Logout</Link></Dropdown.Item> */}
                                        <div className="dropdownitems">
                                    
                                        <br />
                                        <Button color='orange' className="w-100">Upgrade</Button>
                                        <h6>Monthly quotas reset in 24 days.</h6>
                                        <p><Link exact to='/'><span>Account</span></Link></p> <br />
                                        <p><Link exact to='/'><span>Subscription</span></Link></p><br />
                                        <p><Link exact to='/'><span>Usage</span></Link></p><br />
                                        <p onClick={this.handleLogout}><span>Logout</span></p><br />
                                    
                                        </div>
                                        


                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    navbarprogress : state.navbarprogress,
    admin: state.users
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
