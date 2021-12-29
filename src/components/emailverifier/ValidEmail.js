import React, { Component } from 'react'
import { MdVerifiedUser } from "react-icons/md";
import { Grid } from 'semantic-ui-react'

export class ValidEmail extends Component {

    constructor(props){
        super(props)
        this.state={
            urls:props.urls,
            data:props.data
        }
    }

    truncate(line){

        var length = 92;
        var myString = line;
        var myTruncatedString = myString.substring(0,length);

        return myTruncatedString;
    }

    render() {
        return (
            <>
              <Grid columns='equal'>
                        <Grid.Column>
                            <center>

                        <span className="emailverify_successicon"><MdVerifiedUser /></span>
                        </center>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <h3 style={{marginTop:'5px'}}>Valid</h3>
                            <p style={{marginTop:'-12px'}}>This email address can be used safely.</p>
                        </Grid.Column>
                    </Grid>
                    <Grid columns='equal'>
                        <Grid.Column>
                            <div className="emailverify_success_status">
                                <p>Format {this.state.data.form ?<span>VALID</span>:<span className="text-danger">INVALID</span>}</p>
                                <p>SMTP {this.state.data.mx?<span>VALID</span>:<span className="text-danger">INVALID</span>}</p>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className="emailverify_success_status">
                                <p>Server status {this.state.data.mx?<span>VALID</span>:<span className="text-danger">INVALID</span>}</p>
                                <p>Deliverable {this.state.data.exist?<span>VALID</span>:<span className="text-danger">INVALID</span>}</p>
                            </div>
                        </Grid.Column>
                    </Grid>
                    <Grid>
                        <Grid.Column>
                            {/* <h5>We found {this.state.urls.length} sources on the web.</h5> */}
                            <div className='emailverify_success_foundlinks'>
                                {/* {this.state.urls.map((url)=>{
                                    return(
                                        <span key={url.link}>
                                        <a rel="noreferrer" target="_blank" href={url.link} >{this.truncate(url.link)} ...</a> <br />
                                        </span>
                                    )
                                })} */}
                              
                            </div>
                        </Grid.Column>
                     </Grid>   
            </>
        )
    }
}

export default ValidEmail;
