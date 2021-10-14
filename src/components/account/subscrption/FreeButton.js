import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Loader } from 'semantic-ui-react'
import cookie from 'react-cookies'
import API from '../../../api/API'
import { Redirect } from 'react-router-dom'

export class FreeButton extends Component {


    state={
        buttonLoad:false,
        success:false,
    }

    handleClick=()=>{
        this.setState({buttonLoad:true})
        var tempData={
            packageid:this.props.data._id,
            _id:cookie.load('qtonixemailextractweb_userid')
        }

        API.post('/user/adminupdateuserpackage',tempData)
        .then(response=>{
            if(response.data.response){
            
                this.setState({
                    success:true
                })
            }else{
                this.setState({
                    buttonLoad:false
                })
            }
        })
    }


    componentDidMount(){

    }


    render() {
        return (
            <>
            {this.state.success
            ?
            <>
            <Redirect to='/account/subscription' />
            </>
            :
            <>
            {this.state.buttonLoad
            ?<Loader active inline='center' />
            :<Button className="w-100 bgmblue text-white" onClick={()=>this.handleClick()}>Select</Button>
            }
            </>
            }


            

            </>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(FreeButton)
