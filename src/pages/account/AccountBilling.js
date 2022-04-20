import React, { Component } from 'react'
import Body from '../../components/Body'
import { Grid,Table,Loader } from 'semantic-ui-react'
import AccountSidenav from '../../components/account/AccountSidenav'
import API from '../../api/API'
import cookie from 'react-cookies'
import Moment from 'react-moment';

export class AccountBilling extends Component {

    constructor(props){
        super(props)
        this.state={
            datas:null
        }
    }

    componentDidMount(){
        API.get(`/user/show_user_invoice_list/${cookie.load('qtonixemailextractweb_userid')}`)
        .then(response=>{
            this.setState({
                datas:response.data.datas
            })
        })
    }


    render() {
        console.log(this.state.datas)
        return (
            <Body>
               <Grid>
                    <Grid.Column mobile={16} tablet={6} computer={4}>
                        <AccountSidenav />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={10} computer={12}>
                    <section>
                    <div className="accountcontainer">
                        <Grid>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <h3>Invoice </h3>
                                    <br />
                                </Grid.Column>
                                <Grid.Column>
                                    {/* <div className="billing_box">
                                        <h4>Billing information</h4>
                                        <hr />
                                        <p>You don't have any billing information on your account.</p>
                                    </div>
                                    <br /><br /> */}
                                    {/* <div className="billing_box">
                                        <h4>Invoices</h4>
                                        <hr />
                                        <p>No invoice yet.</p>
                                    </div> */}
                                    {this.state.datas===null
                                            ?<Loader active inline='centered'  />
                                            :

                                    <Table basic='very'>
                                        <Table.Header>
                                        <Table.Row>
                                            {/* <Table.HeaderCell>Invoice ID</Table.HeaderCell> */}
                                            <Table.HeaderCell>Package</Table.HeaderCell>
                                            <Table.HeaderCell>Type</Table.HeaderCell>
                                            <Table.HeaderCell>Amount</Table.HeaderCell>
                                            <Table.HeaderCell>Date</Table.HeaderCell>
                                            <Table.HeaderCell>Download</Table.HeaderCell>

                                        </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {this.state.datas.map((data)=>{
                                                return(
                                                    <Table.Row>
                                                        {/* <Table.Cell>{data._id}</Table.Cell> */}
                                                        <Table.Cell>{data.packagedetails.name}</Table.Cell>
                                                        <Table.Cell>{data.packagedetails.type}</Table.Cell>  
                                                        <Table.Cell>$ {data.amountpaid}</Table.Cell>
                                                        <Table.Cell><Moment format="YYYY-MM-DD HH:mm:ss dddd">{data.createdAt}</Moment></Table.Cell>
                                                        <Table.Cell> 
<a href={`${process.env.REACT_APP_BACKENDURL}${data.downloadlink}`}>Download PDF</a>

                                                        </Table.Cell>

                                                    </Table.Row>
                                                )
                                            })}
                                            
                                            
                                            
                                        </Table.Body>
                                    </Table>
                                        }

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    </section>
                    </Grid.Column>
                </Grid>

            </Body>
        )
    }
}

export default AccountBilling
