import React from 'react'
import { connect } from 'react-redux'
import Body from '../../../components/Body'
import { Grid,List,Loader } from 'semantic-ui-react'
import AccountSidenav from '../../../components/account/AccountSidenav'
// import Chart from "react-google-charts";
// import {Link} from 'react-router-dom'
import Moment from 'react-moment';


export const AccountUsage = (props) => {

    // const [props.navbarprogress, setprops.navbarprogress] = useState(null);

    // useEffect(() => {
    //     setprops.navbarprogress(props.props.navbarprogress)
    //     console.log(props)

    // }, [props])


    return (
        <Body>
               <Grid>
                    <Grid.Column mobile={16} tablet={6} computer={4}>
                        <AccountSidenav />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={10} computer={12}>
                    <section>
                    <div className="accountcontainer">

                        {props.navbarprogress===null || props.navbarprogress===undefined
                        ?<Loader active inline="centered" />
                        :
                        <Grid>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <h3>Usage</h3>
                                    <p style={{marginTop:'-17px',marginBottom:'20px'}}>
                                    {props.navbarprogress===null || props.navbarprogress===undefined
                                        ?<></>
                                        :
                                        props.navbarprogress.packageinfo.type==='Monthly'
                                        ?
                                        <>
                                            <Moment format="MMMM DD YYYY">{props.navbarprogress.userinfo.packagestartdate}</Moment>
                                            &nbsp;-&nbsp; 
                                            <Moment format="MMMM DD YYYY">{props.navbarprogress.userinfo.packageenddate}</Moment> 
          
                                        </>
                                        :  
                                        <>

                                        </>  
                                    }
                                    </p>
                                </Grid.Column>
                                <Grid.Column>
                                    {/* <div className="chart_box">
                                    <h4>Last 5 day records</h4>
                                    <hr />
                                    <Chart
                                        width={'100%'}
                                        height={'300px'}
                                        chartType="Bar"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Date', 'Extract', 'Finder', 'Verifier'],
                                            ['12 SEP 2021', 20, 2, 2],
                                            ['11 SEP 2021', 44, 5, 8],
                                            ['10 SEP 2021', 10, 66, 12],
                                            ['09 SEP 2021', 5, 41, 22],
                                            ['08 SEP 2021', 6, 11, 35],
                                            ['07 SEP 2021', 80, 22, 0],
                                        ]}
                                        />
                                    </div>
                                    <br /> */}
                                    <div className="chartbox">
                                        <h4>Your monthly record</h4>
                                        <hr />
                                        <List divided verticalAlign='middle'>
                                            
                                            <List.Item>
                                                <List.Content>
                                                    <p className="chartbox_listtext">Domain Search 
                                                    <span className="float-right">
                                                        {props.navbarprogress.packageinfo.totalsingledomain===123456789
                                                        ?<>{props.navbarprogress.single_domain_search} / Unlimited</>
                                                        :<>{props.navbarprogress.single_domain_search} /{props.navbarprogress.packageinfo.totalsingledomain} &nbsp;&nbsp;</>
                                                        }
                                                    </span>
                                                    </p>
                                                </List.Content>
                                            </List.Item>
                                            

                                            <List.Item>
                                                <List.Content>
                                                    <p className="chartbox_listtext">Email Finder 
                                                    <span className="float-right">
                                                        {props.navbarprogress.packageinfo.totalemailsearch===123456789
                                                        ?<>{props.navbarprogress.email_finder} / Unlimited</>
                                                        :<>{props.navbarprogress.email_finder} /{props.navbarprogress.packageinfo.totalemailsearch} &nbsp;&nbsp;</>
                                                        }
                                                    </span>
                                                    </p>
                                                </List.Content>
                                            </List.Item>



                                            <List.Item>
                                                <List.Content>
                                                    <p className="chartbox_listtext">Email Verification 
                                                    <span className="float-right">
                                                        {props.navbarprogress.packageinfo.totalemailverification===123456789
                                                        ?<>{props.navbarprogress.email_verification} / Unlimited</>
                                                        :<>{props.navbarprogress.email_verification} /{props.navbarprogress.packageinfo.totalemailverification} &nbsp;&nbsp;</>
                                                        }
                                                    </span>
                                                    </p>
                                                </List.Content>
                                            </List.Item>

                                            <List.Item>
                                                <List.Content>
                                                    <p className="chartbox_listtext">Bulk Domain Extract 
                                                    <span className="float-right">
                                                        {props.navbarprogress.packageinfo.totalbuldomainkextract===123456789
                                                        ?<>{props.navbarprogress.bulk_domain_search} / Unlimited</>
                                                        :<>{props.navbarprogress.bulk_domain_search}/{props.navbarprogress.packageinfo.totalbuldomainkextract} &nbsp;&nbsp;</>
                                                        }
                                                    </span>
                                                    </p>
                                                </List.Content>
                                            </List.Item>
                                        </List>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        }

                        
                    </div>
                    </section>
                    </Grid.Column>
                </Grid>

            </Body>
    )
}

const mapStateToProps = (state) => ({
    navbarprogress:state.navbarprogress
})


export default connect(mapStateToProps)(AccountUsage)
