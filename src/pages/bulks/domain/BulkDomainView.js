import React, { Component } from 'react'
import { connect } from 'react-redux'
import Body from '../../../components/Body'
import { Grid, Button, Confirm, Table, Progress,Popup } from 'semantic-ui-react'
// import {Link} from 'react-router-dom'
// import io from "socket.io-client";
import { MdVerifiedUser,MdErrorOutline } from "react-icons/md";
import API from '../../../api/API'
import API_BULK_EXTRACT_ROUTING_BULK_EXTRACT_ROUTING from '../../../api/API_BULK_EXTRACT_ROUTING'

import Loader from "react-loader-spinner";
import Moment from 'react-moment';
import percentage from 'calculate-percentages'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {navbarProgressInfo} from '../../../actions';
import cookie from 'react-cookies'

import { toast } from 'react-toastify';

export class BulkDomainView extends Component {


    constructor(props){
        super(props)
        this.state={
            pageLoading:true,
            confirmDelete:false,
            isExtractionComplete:false,
            domainextractinfo:false,
            bulkdomainextract:false,
            bulkdomainextractemails:false,
            bulkdomainextractcount:false
        }
    }


    componentDidMount(){

        this.setState({
            id:this.props.match.params.id
        })

        

        var dataprops=this.props;
        

        API_BULK_EXTRACT_ROUTING_BULK_EXTRACT_ROUTING.get(`/bulkdomainextract/viewdetail/${this.props.match.params.id}/${cookie.load('qtonixemailextractweb_userid')}`)
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
            if(this.state.bulkdomainextractcount.length=== this.state.domainextractinfo.totaldomains){
                this.setState({
                    isExtractionComplete:true
                })
            }else{
                this.timer = setInterval(() => {
                    this.getData(dataprops,cookie.load('qtonixemailextractweb_userid'));
                }, this.state.userpackageinfo.mainspeed);

            }
            // console.log(response.data)
        })
    }


    

    getData(dataprops,userid) {

        if(this.state.isExtractionComplete){

        }else{
            if(this.state.bulkdomainextractcount.length === this.state.domainextractinfo.totaldomains){
                this.setState({
                    isExtractionComplete:true
                })
            }else{
                if(this.state.isExtractionComplete){
                }else{
                    if(window.location.pathname===`/bulks/domainextract/view/${this.state.id}`){
                        API_BULK_EXTRACT_ROUTING_BULK_EXTRACT_ROUTING.get(`/bulkdomainextract/viewdetail/${this.state.id}/${userid}`)
                        .then(response=>{
                            this.setState({
                                domainextractinfo:response.data.domainextractinfo,
                                bulkdomainextract:response.data.bulkdomainextract,
                                bulkdomainextractemails:response.data.bulkdomainextractemails,
                                bulkdomainextractcount:response.data.bulkdomainextractcount,
                                pageLoading:false,
                            })
                            if(this.state.bulkdomainextractcount.length=== this.state.domainextractinfo.totaldomains){
                                this.setState({
                                    isExtractionComplete:true
                                })
                                dataprops.navbarProgressInfo();
                                
                            }else{
                            }
                        })
                    }else{
                    }
                }
            }
        }



        


        
  
    }

    // handleDelete=e=>{
    //     alert(this.state.domainextractinfo.uuid)
    // }

    showConfirmDelete = () => this.setState({ confirmDelete: true })
    // handleConfirmDelete = () => this.setState({ confirmDelete: false })
    handleCancelConfirmDelete = () => this.setState({ confirmDelete: false })

    handleConfirmDelete=()=>{
        // alert(this.state.domainextractinfo.uuid)


        API.get(`/bulkdomainextract/deleteall/${this.state.domainextractinfo.uuid}`)
        .then(response=>{
            console.log(response.data)
            if(response.data.response){
                this.props.history.push('/bulks/domainextract')
                toast.success('Successfully deleted', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })

        



    }


    render() {
        console.log(this.state.userpackageinfo)
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
                                <h3>{this.state.domainextractinfo.listname} 
                                
                                {/* DELETE */}
                                <Button className="float-right" color='red' onClick={this.showConfirmDelete}>Delete</Button> 
                                <Confirm
                                    size='mini'
                                    open={this.state.confirmDelete}
                                    content={`Are you sure want to delete ${this.state.domainextractinfo.listname}`}
                                    onCancel={this.handleCancelConfirmDelete}
                                    onConfirm={this.handleConfirmDelete}
                                />        



                       
                                {/* {this.props.navbarprogress.packageinfo.type==='Monthly'
                                ?<></>
                                :
                                <> */}
                                {/* EXPORT TO EXCEL */}

                                {this.state.userpackageinfo.name==='Free'
                                ?<></>
                                :
                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="ui button float-right bgmblue text-white"
                                    table="table-to-xls"
                                    filename={this.state.domainextractinfo.listname}
                                    sheet="tablexls"
                                    buttonText="Download as XLS"
                                />
                                }
                                
                                
                                    <table id="table-to-xls" style={{display:'none'}}>
                                        <tr>
                                            <th>Domain</th>
                                            <th>Email</th>
                                        </tr>

                                        {this.state.bulkdomainextractemails.map((dta)=>{
                                                    return(
                                                        <tr key={dta._id}>
                                                            <td>{dta.domain}</td>
                                                            <td>{dta.email}</td>
                                                        </tr>
                                                    )
                                        })}
                                        
                                </table>
                                {/* EXPORT TO EXCEL */}
                                {/* </> */}
                                {/* } */}
                                

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
                                            <p><b>Total Domain Scanned:</b> {this.state.bulkdomainextractcount.length}</p>
                                            <p><b>Total Email Found:</b> {this.state.bulkdomainextractemails.length}</p>


                                            <p><b>Status:</b> {this.state.isExtractionComplete?<span className="text-success">Completed</span>:<span>Processing</span>}</p>

                                            {this.state.bulkdomainextractcount.length>2
                                            ?
                                            <p><b>Execution Time:</b> <Moment duration={this.state.bulkdomainextractcount[0].createdAt}
                                                    date={this.state.bulkdomainextractcount[this.state.bulkdomainextractcount.length-1].createdAt}
                                                   
                                            /></p>
                                            :<></>
                                            }
                                        </div>




                                        {this.state.isExtractionComplete?
                                        <>
                                        </>
                                        :
                                        <>
                                        <br />
                                        <Progress percent={percentage.calculate(this.state.bulkdomainextractcount.length, this.state.domainextractinfo.totaldomains)} color='blue' active >
                                            {this.state.bulkdomainextractcount.length}/{this.state.domainextractinfo.totaldomains} processing...
                                        </Progress>
                                        </>
                                        }
                                        


                                    </Grid.Column>
                                </Grid>
                                <br />
                                <hr />
                                <br />

                                <Grid columns='equal' className="bulksecview">
                                   
                                    <Grid.Column width={16}>
                                    <Table basic='very'>
                                        <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Domain</Table.HeaderCell>
                                            <Table.HeaderCell>Email</Table.HeaderCell>
                                            <Table.HeaderCell>Email Score</Table.HeaderCell>

                                            <Table.HeaderCell>Extract Time</Table.HeaderCell>
                                            {/* <Table.HeaderCell>Verified</Table.HeaderCell> */}
                                            {/* <Table.HeaderCell>Sources</Table.HeaderCell> */}
                                        </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {this.state.bulkdomainextractemails.map((dta)=>{
                                                return(
                                                    <Table.Row key={dta._id}>
                                                        <Table.Cell>{dta.domain}</Table.Cell>
                                                        <Table.Cell>{dta.email} 
                                                        {dta.emailverified
                                                        ?
                                                        <Popup
                                                            trigger={<span className="bulk9998 text-success"><MdVerifiedUser /></span>}
                                                            content='This email is verified'
                                                            className="text-success"
                                                            size='mini'
                                                        />
                                                        
                                                        :
                                                        <Popup
                                                            trigger={<span className="bulk9998 text-danger"><MdErrorOutline /></span>}
                                                            content='This email is not verified'
                                                            size='mini'
                                                            className="text-danger"
                                                        />
                                                        
                                                        } </Table.Cell>

    

                                                        <Table.Cell>{dta.emailquality}/100 </Table.Cell>

                                                        <Table.Cell><Moment format="YYYY-MM-DD dddd  HH:mm:ss">{dta.createdAt}</Moment></Table.Cell>
                                                        {/* <Table.Cell className="text-success"><MdVerifiedUser /></Table.Cell> */}
                                                        {/* <Table.Cell><Link exact to='/'>11</Link></Table.Cell> */}
                                                    </Table.Row>
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
