import React, { Component } from 'react'
import { connect } from 'react-redux'
import Body from '../../../components/Body'
import { Grid,  Table} from 'semantic-ui-react'
// import {Link} from 'react-router-dom'
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
import TableRowViewForView from './TableRowViewForView'
import API_BULK_EXTRACT_ROUTING from '../../../api/API_BULK_EXTRACT_ROUTING'


export class BulkDomainView extends Component {


    constructor(props){
        super(props)
        this.state={
            pageLoading:true,
            fetching:true,
        }
    }


    componentDidMount(){
        API_BULK_EXTRACT_ROUTING.get(`/bulkdomainextract/viewdetail/${this.props.match.params.id}/${cookie.load('qtonixemailextractweb_userid')}`)
        .then(response=>{
            this.setState({
                domainextractinfo:response.data.domainextractinfo,
                bulkdomainextract:response.data.bulkdomainextract,
                bulkdomainextractemails:response.data.bulkdomainextractemails,
                bulkdomainextractcount:response.data.bulkdomainextractcount,
                userinfo:response.data.userinfo,
                userpackageinfo:response.data.userpackageinfo,
                pageLoading:false,
            })
        })



        // set Interval
        this.interval = setInterval(this.getCenter, 3000);
    }


    getCenter = () => {

        if(window.location.pathname==='/bulks/domainextract/view/'+this.props.match.params.id){
            if(this.state.pageLoading===false){
                if(this.state.bulkdomainextract.length!==this.state.domainextractinfo.totaldomains){

                    API_BULK_EXTRACT_ROUTING.get(`/bulkdomainextract/viewdetail/${this.props.match.params.id}/${cookie.load('qtonixemailextractweb_userid')}`)
                    .then(response=>{
                        this.setState({
                            domainextractinfo:response.data.domainextractinfo,
                            bulkdomainextract:response.data.bulkdomainextract,
                            bulkdomainextractemails:response.data.bulkdomainextractemails,
                            bulkdomainextractcount:response.data.bulkdomainextractcount,
                            userinfo:response.data.userinfo,
                            userpackageinfo:response.data.userpackageinfo,
                            pageLoading:false,
                        })
                    })

                }
            }
        }
    }




    render() {
        // console.log(this.state)
        return (
            <Body>
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
                                    {this.state.domainextractinfo.listname} 
                                
                                   



                    
                                {/* EXPORT TO EXCEL */}

                                {/* {this.state.userpackageinfo.name==='Free'
                                ?<></>
                                : */}
                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="ui button float-right bgmblue text-white"
                                    table="table-to-xls"
                                    filename={this.state.domainextractinfo.listname}
                                    sheet="tablexls"
                                    buttonText="Download as XLS"
                                />
                                {/* } */}

                                <table id="table-to-xls" style={{display:'none'}}>
                                        <tr>
                                            <th>Domain</th>
                                            <th>Status</th>
                                            <th>Email</th>
                                        </tr>

                                        {this.state.bulkdomainextract.map((dta)=>{
                                                    return(
                                                        <tr key={dta._id}>
                                                            <td>{dta.domainname}</td>
                                                            <td>{dta.domainemails==='NotFound'?'NotFound':'Found'}</td>
                                                            <td>
                                                                {dta.domainemails==='NotFound'
                                                                ?<>-</>
                                                                :
                                                                dta.domainemails.length>0
                                                                    ?
                                                                    dta.domainemails.map((dt)=>{
                                                                            return(
                                                                                <>
                                                                                {dt},
                                                                                </>
                                                                            )
                                                                        })
                                                                    :
                                                                    <>-</>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                        })}
                                    </table>
                                </h3>



                                <h6>Bulk created on <Moment format="YYYY-MM-DD dddd  HH:mm:ss">{this.state.domainextractinfo.createdAt}</Moment></h6>
                            </Grid.Column>
                            <Grid.Column>
                                <br />
                                <hr />
                                <br />
                                
                                <Grid columns='equal' className="bulksecview">
                                    <Grid.Column>



                                        <div className="bulkdetailsss">
                                            <p><b>Total Domains:</b> {this.state.domainextractinfo.totaldomains}</p>
                                            <p><b>Total Email Found:</b> {this.state.bulkdomainextractemails.length}</p>
                                            <p><b>Status:</b> {this.state.bulkdomainextract.length===this.state.domainextractinfo.totaldomains?'Success':'Pocessing'}</p>
                                            
                                            {this.state.bulkdomainextract.length}/{this.state.domainextractinfo.totaldomains}
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
                                            <Table.HeaderCell>Emails</Table.HeaderCell>
                                            <Table.HeaderCell>Tel</Table.HeaderCell>
                                            <Table.HeaderCell></Table.HeaderCell>

                                        </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {this.state.bulkdomainextract.map((data,key)=>{
                                                return(
                                                    <TableRowViewForView data={data} key={key} />
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
