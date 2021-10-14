import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export class CheckPackageRedirect extends Component {
    render() {
        console.log(this.props.navbarprogressinfo)
        return (
            <>
                {this.props.navbarprogressinfo===null
                ?
                <></>
                :
                <>
                {this.props.navbarprogressinfo.package!=='active'
                ?<Redirect to='/account/subscription/view' />
                :<></>}
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckPackageRedirect)
