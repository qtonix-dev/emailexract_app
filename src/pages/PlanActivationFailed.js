import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

export class PlanActivationFailed extends Component {
    render() {
        return (
            <center>
                <br /><br />
                <img src="https://quicksavaari.com/failed.gif" alt="sss" />
                <br /><br />
                <Link exact to='/'>Go to home</Link>
            </center>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanActivationFailed)
