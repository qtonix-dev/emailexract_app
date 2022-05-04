import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { CgUser, CgDollar, CgPrinter, CgScreen, CgUserAdd } from "react-icons/cg";
import { connect } from 'react-redux'


export class AccountSidenav extends Component {
  render() {
    return (
        <div className="accountsidenav">
        <h5>Account & Settings</h5>
        {this.props.admin.type==='SubUser'
        ?
        <>
        <p className={window.location.pathname==='/account'?`accountsidenav_active`:``}><Link exact to='/account'><span className="accountsidenav_icon_active"><CgUser /></span> &nbsp; Account</Link></p>
        <p className={window.location.pathname==='/account/usage'?`accountsidenav_active`:``}><Link exact to='/account/usage'><span className="accountsidenav_icon"><CgScreen /></span> &nbsp; Usage</Link></p>
        </>
        :
        <>
        <p className={window.location.pathname==='/account'?`accountsidenav_active`:``}><Link exact to='/account'><span className="accountsidenav_icon_active"><CgUser /></span> &nbsp; Account</Link></p>
        <p className={window.location.pathname==='/account/users'?`accountsidenav_active`:``}><Link exact to='/account/users'><span className="accountsidenav_icon"><CgUserAdd /></span> &nbsp; Users</Link></p>
        <p className={window.location.pathname==='/account/subscription'?`accountsidenav_active`:``}><Link exact to='/account/subscription'><span className="accountsidenav_icon"><CgDollar /></span> &nbsp; Subscription</Link></p>
        <p className={window.location.pathname==='/account/billing'?`accountsidenav_active`:``}><Link exact to='/account/billing'><span className="accountsidenav_icon"><CgPrinter /></span> &nbsp; Invoice</Link></p>
        <p className={window.location.pathname==='/account/usage'?`accountsidenav_active`:``}><Link exact to='/account/usage'><span className="accountsidenav_icon"><CgScreen /></span> &nbsp; Usage</Link></p>
        </>
        }
        

    </div>
    )
  }
}

const mapStateToProps = (state) => ({
    admin: state.users

})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSidenav)