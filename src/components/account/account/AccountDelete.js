import React, { Component } from 'react'
import {Grid, Button} from 'semantic-ui-react'
import { FiUser } from "react-icons/fi";
import { IoChevronDown,IoChevronUp } from "react-icons/io5";

export class AccountDelete extends Component {

    constructor(props){
        super(props)
        this.state={
            hideTab:true
        }
        this.showHideTab=this.showHideTab.bind(this)
    }

    showHideTab(e){
        if(this.state.hideTab){
        this.setState({hideTab:false})
        }else{
        this.setState({hideTab:true})
        }
    }


    render() {
        return (
            <div className="accountcontainer_box_linkbox">
                <Grid>
                    <Grid.Column mobile={2} >
                        <center className="accountcontainer_box_linkbox_center">
                            <span className="accountcontainer_box_linkbox_icon"><FiUser /></span>
                        </center>
                    </Grid.Column>
                    <Grid.Column mobile={14} >
                    <h5 className="cursor-pointer" onClick={this.showHideTab}>Delete Account {this.state.hideTab?<span onClick={this.showHideTab} className="cursor-pointer"><IoChevronDown /></span>:<span onClick={this.showHideTab} className="cursor-pointer"><IoChevronUp /></span>}</h5>
                    <p className="cursor-pointer" onClick={this.showHideTab}>Delete your Hunter account.</p>
                    </Grid.Column>
                    {this.state.hideTab
                    ?
                    <></>
                    :
                    <Grid.Column  mobile={16}>
                        
                        <Button color="red">I want to delete my account</Button>
                        <br /><br />
                    </Grid.Column>
                    }
                 </Grid>
            </div>
        )
    }
}

export default AccountDelete
