import React, { Component } from 'react'
import { connect } from 'react-redux'
import Body from '../../../components/Body'
import { Grid,  Table, Popup} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { IoArrowBackCircleOutline } from "react-icons/io5";

// import io from "socket.io-client";
// import { MdVerifiedUser,MdErrorOutline } from "react-icons/md";
// import API from '../../../api/API'
// import API from '../../../api/API'
import Loader from "react-loader-spinner";
import Moment from 'react-moment';
// import percentage from 'calculate-percentages'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {navbarProgressInfo} from '../../../actions';
import cookie from 'react-cookies'
// import _ from 'lodash';
// import { toast } from 'react-toastify';
import TableRowView from './TableRowView'
import API from '../../../api/API'
import _ from 'lodash'

export class BulkDomainView extends Component {


    constructor(props){
        super(props)
        this.state={
            pageLoading:true,
            fetching:true,
            data:null
        }
    }


    componentDidMount(){
        API.get(`/bulkdomainextract/viewdetail/${this.props.match.params.id}/${cookie.load('qtonixemailextractweb_userid')}`)
        .then(response=>{
            console.log(response.data)
            if(response.data.response){
                this.setState({
                    pageLoading:false,
                    data:response.data.data
                })
            }else{
                this.props.history.push('/bulks/domainextract')
            }
        })
    }


    render() {
        console.log(this.state)
        return (
            <Body>
                <Popup
                    trigger={<Link exact to='/bulks/domainextract' className="cusbackbtn"><IoArrowBackCircleOutline /></Link>}
                    content='Go Back'
                    size='mini'
                />
                <section>
                    <div className="cuscontainer">
                    {this.state.pageLoading
                                    ?
                                    <center>
                                    <br />
                                    <Loader
                                        type="TailSpin"
                                        color="#0495fd"
                                        height={30}
                                        width={30}
                                    />
                                    </center>
                    :
                    <Grid>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <h3>
                                    {this.state.data.listname} 
                                
                                   


                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="ui button float-right bgmblue text-white"
                                    table="table-to-xls"
                                    filename={'Domains'}
                                    sheet="tablexls"
                                    buttonText="Download as XLS"
                                />

<table id="table-to-xls" style={{display:'none'}}>
                                        <tr>
                                        <th>Domain</th>
                                        <th>Emails</th>
                                        <th>Phone</th>
                                        <th>GooglePlus</th>
                                        <th>Facebook</th>
                                        <th>Twitter</th>
                                        <th>Instagram</th>
                                        <th>Pinterest</th>
                                        <th>LinkedIn</th>
                                        <th>WhatsApp</th>
                                        <th>YouTube</th>
                                        <th>Skype</th>
                                       
                                        
                                        </tr>

                                        
                                        {this.state.data.datas.map((data)=>{
                                                    return(
                                                        <tr key={data.domain}>
                                                            <td style={{textTransform:'lowercase'}}>{data.domain}</td>
                                                            <td>{data.tel.join(", ")}</td>
                                                            <td>{data.emails.join(", ")}</td>
                                                            <td>{data.googleplus.join(", ")}</td>
                                                            <td>{data.facebook.join(", ")}</td>
                                                            <td>{data.twitter.join(", ")}</td>
                                                            <td>{data.instagram.join(", ")}</td>
                                                            <td>{data.printrest.join(", ")}</td>
                                                            <td>{data.linkedin.join(", ")}</td>
                                                            <td>{data.whatsapp.join(", ")}</td>
                                                            <td>{data.youtube.join(", ")}</td>
                                                            <td>{data.skype.join(", ")}</td>
                                                        </tr>
                                                    )
                                        })}
                                    </table>
                                </h3>



                                <h6>Bulk extract created on <Moment format="YYYY-MM-DD dddd  HH:mm:ss">{this.state.data.createdAt}</Moment></h6>
                            </Grid.Column>
                            <Grid.Column>
                                <br />
                                <hr />
                                <br />
                                
                                <Grid columns='equal' className="bulksecview">
                                    <Grid.Column>



                                        <div className="bulkdetailsss">
                                            <p><b>Total Domains:</b> {this.state.data.totaldomains}</p>
                                            <p><b>Status:</b> Completed</p>

                                            {/* <p><b>Total Email Found:</b> {this.state.bulkdomainextractemails.length}</p> */}
                                            {/* <p><b>Status:</b> {this.state.bulkdomainextract.length===this.state.domainextractinfo.totaldomains?'Success':'Pocessing'}</p> */}


                                            
                                             
                                            
                                            
                                        </div>




                                        


                                    </Grid.Column>
                                </Grid>
                                <br />
                                <hr />
                                <br />

                                <Grid columns='equal' className="bulksecview">
                                   
                                    <Grid.Column width={16}>
                                    


                                    <Table  basic='very'>
                                        <Table.Header>
                                        <Table.Row>
                                        <Table.HeaderCell>Domain</Table.HeaderCell>
                                            <Table.HeaderCell></Table.HeaderCell>
                                            <Table.HeaderCell></Table.HeaderCell>

                                        </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                        
                                            {_.uniqBy(this.state.data.datas, 'domain').map((data,key)=>{
                                                return(
                                                    <TableRowView data={data} key={key} extractPhone={true} extractSocial={true} />
                                                )
                                            })}
                                            
                                        </Table.Body>
                                    </Table>

                                    



                                    

                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    }


                    
                    </div>
                </section>
            </Body>
        )
    }
}

const mapStateToProps = (state) => ({
    navbarprogress:state.navbarprogress
})


export default connect(mapStateToProps, {navbarProgressInfo})(BulkDomainView)
