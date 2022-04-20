import React, { Component } from 'react'
import { FcCancel } from "react-icons/fc";
import { Grid } from 'semantic-ui-react'

export class InvalidEmail extends Component {

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
                            <span className="emailverify_successicon"><FcCancel /></span>
                            {/* {this.state.data.dnsCheck==='false' && this.state.data.smtpCheck === 'false'
                            ?<span className="emailverify_successicon"><FcCancel /></span>
                            :<span className="emailverify_successicon"><FcHighPriority /></span>
                            } */}
                            
                    
                        </center>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <h3 style={{marginTop:'5px'}}>Invalid</h3>
                            <p style={{marginTop:'-12px'}}>This email address isn't used to receive emails.</p>

                            {/* {this.state.data.dnsCheck==='false' && this.state.data.smtpCheck === 'false'
                            ?<p style={{marginTop:'-12px'}}>This email address isn't used to receive emails.</p>
                            :<p style={{marginTop:'-12px'}}>This email address isn't verified.</p>
                            } */}

                            

                            

                        </Grid.Column>
                    </Grid>
                    <Grid columns='equal'>
                        <Grid.Column>
                            <div className="emailverify_success_status">
                                <p>Format {this.state.data.isValidDomain ?<span>VALID</span>:<span className="text-danger">INVALID</span>}</p>
                                <p>SMTP {this.state.data.serverstatus?<span>VALID</span>:<span className="text-danger">INVALID</span>}</p>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className="emailverify_success_status">
                                <p>Server status {this.state.data.serverstatus?<span>VALID</span>:<span className="text-danger">INVALID</span>}</p>
                                <p>Deliverable {this.state.data.deliverable?<span>VALID</span>:<span className="text-danger">INVALID</span>}</p>
                            </div>
                        </Grid.Column>
                    </Grid>
                    {/* <Grid>
                        <Grid.Column>
                            <h5>We couldn't find this email address publicly available on the web.</h5>
                        </Grid.Column>
                    </Grid> */}
                    {/* <Grid>
                        <Grid.Column>
                        <h5>We found {this.state.urls.length} sources on the web.</h5>
                            <div className='emailverify_success_foundlinks'>
                                {this.state.urls.map((url)=>{
                                    return(
                                        <>
                                        <a rel="noreferrer" target="_blank" href={url.link} key={url.link}>{this.truncate(url.link)} ...</a> <br />
                                        </>
                                    )
                                })}
                            </div>
                        </Grid.Column>
                    </Grid>   */}
            </>
        )
    }
}

export default InvalidEmail;
