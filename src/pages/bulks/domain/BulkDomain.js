import React, { Component } from 'react'
import Body from '../../../components/Body'
import { Grid, Button, Table, Popup } from 'semantic-ui-react'
import { FiChevronRight } from "react-icons/fi";
import {Link} from 'react-router-dom'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import API from '../../../api/API'
import cookie from 'react-cookies'
import Loader from "react-loader-spinner";
import Moment from 'react-moment';
import ShowQuotaReached from '../../../components/ShowQuotaReached'


export class BulkDomain extends Component {

    constructor(props){
        super(props)
        this.state={
            pageLoad:true,
            datas:false
        }
    }

    

    componentDidMount(){
        var user = cookie.load('qtonixemailextractweb_userdata');
        API.get(`/bulkdomainextract/viewlist/${user._id}`)
        .then(response=>{
            console.log(response.data)
            if(response.data.response){
                this.setState({
                    pageLoad:false,
                    datas:response.data.data
                })
            }
        })
    }

    render() {
        return (
            <Body>
                
                <Popup
                    trigger={<Link exact to='/' className="cusbackbtn"><IoArrowBackCircleOutline /></Link>}
                    content='Go Back'
                    size='mini'
                />
                <ShowQuotaReached page='bulkdomainextract'>
                <section>
                    <div className="cuscontainer">
                    <Grid>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <h3>Bulk Domain Search <Link exact to='/bulks/domainextract/new'><Button className="float-right bgmblue text-white">New Bulk</Button></Link></h3>
                                <h6>Find email addresses from a list of websites or companies.</h6>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid columns='equal' className="bulksec">
                                    <Grid.Column>

                                    {this.state.pageLoad
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
                                    <Table basic='very'>
                                        <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Bulk</Table.HeaderCell>
                                            <Table.HeaderCell>Total</Table.HeaderCell>
                                            <Table.HeaderCell>Created</Table.HeaderCell>
                                            <Table.HeaderCell style={{width:'40px'}}></Table.HeaderCell>
                                        </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {this.state.datas.map((data)=>{
                                                return(
                                                    <Table.Row key={data._id}>
                                                        <Table.Cell>
                                                            <Link exact to={`/bulks/domainextract/view/${data.uuid}`}><span className="text-black">{data.listname}</span></Link>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Link exact to={`/bulks/domainextract/view/${data.uuid}`}><span className="text-black">{data.totaldomains} domains</span></Link>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Link exact to={`/bulks/domainextract/view/${data.uuid}`}><span className="text-black"><Moment format="YYYY-MM-DD dddd  HH:mm:ss">{data.createdAt}</Moment></span></Link>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Link exact to={`/bulks/domainextract/view/${data.uuid}`}><span className="text-black"><FiChevronRight /></span></Link>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )
                                            })}
                                        </Table.Body>
                                    </Table>
                                    }
                                    






                                    </Grid.Column>
                                    {/* <Grid.Column width={14}>
                                       s 
                                        
                                    </Grid.Column> */}
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </div>
                </section>
                </ShowQuotaReached>
            </Body>
        )
    }
}

export default BulkDomain
