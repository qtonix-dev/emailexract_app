import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

export class ShowQuotaReached extends Component {
    render() {
        return (
            <>
                {this.props.navbarprogressinfo===null
                ?
                <></>
                :
                <>
                    {this.props.navbarprogressinfo.package==='no_package_found'
                    ?<></>
                    :
                    <>
                        {this.props.page==='home'
                            ?
                                <>
                                {this.props.navbarprogressinfo.packageinfo.totalsingledomain <= this.props.navbarprogressinfo.single_domain_search
                                ?
                                <div className="upgradewarning">
                                    <center>
                                    <p>You reached your monthly quota of searches. <Link exact to='/account/subscription/view'><b>Upgrade</b></Link> your subscription to continue.</p>
                                    </center>
                                    <br />
                                </div>
                                :
                                <>
                                {this.props.children}
                                </>
                                }

                                

                                </>
                            :<></>
                        }


                        {this.props.page==='emailverifier'
                            ?
                                <>
                                {this.props.navbarprogressinfo.packageinfo.totalemailverification <= this.props.navbarprogressinfo.email_verification
                                ?
                                <div className="upgradewarning">
                                    <center>
                                    <p>You reached your monthly quota of searches. <Link exact to='/account/subscription/view'><b>Upgrade</b></Link> your subscription to continue.</p>
                                    </center>
                                    <br />
                                </div>
                                :
                                <>
                                {this.props.children}
                                </>
                                }

                                

                                </>
                            :<></>
                        }


                        {this.props.page==='emailfinder'
                            ?
                                <>
                                {this.props.navbarprogressinfo.packageinfo.totalemailsearch <= this.props.navbarprogressinfo.email_finder
                                ?
                                <div className="upgradewarning">
                                    <center>
                                    <p>You reached your monthly quota of searches. <Link exact to='/account/subscription/view'><b>Upgrade</b></Link> your subscription to continue.</p>
                                    </center>
                                    <br />
                                </div>
                                :
                                <>
                                {this.props.children}
                                </>
                                }
                                </>
                            :<></>
                        }


                        {this.props.page==='bulkdomainextract'
                            ?
                                <>
                                {this.props.navbarprogressinfo.packageinfo.totalbuldomainkextract <= this.props.navbarprogressinfo.bulk_domain_search
                                ?
                                <div className="upgradewarning">
                                    <center>
                                    <p>You reached your monthly quota of searches. <Link exact to='/account/subscription/view'><b>Upgrade</b></Link> your subscription to continue.</p>
                                    </center>
                                    <br />
                                </div>
                                :
                                <>
                                {this.props.children}
                                </>
                                }

                                

                                </>
                            :<></>
                        }








                    </>
                    }

                    
                    
                </>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    navbarprogressinfo:state.navbarprogress
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowQuotaReached)
