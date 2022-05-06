import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import Body from '../../components/Body'
import { Grid,List,Button } from 'semantic-ui-react'
import AccountSidenav from '../../components/account/AccountSidenav'
// import Chart from "react-google-charts";
import {Link} from 'react-router-dom'
import cookie from 'react-cookies'
import API from '../../api/API'



export const UserIndex = (props) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        API.get(`/user/showsubuser/${cookie.load('qtonixemailextractweb_userid')}`)
        .then(response=>{
            setUsers(response.data.datas)
        })

    }, [])


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
                                    {users.length>=5
                                    ?
                                    <span className='float-right'>
                                        {/* Max user limit 5 */}
                                    </span>
                                    :<h3>Users <Button color='orange' className='float-right'><Link exact to='/account/users/create' className="text-white">Create User</Link></Button></h3>
                                    }
                                    
                                    
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
                                        <h4>Your Team {users.length}</h4>
                                        <hr />
                                        <List divided verticalAlign='middle'>
                                            {users.map((user)=>{
                                                return(
                                                    <List.Item key={user._id}>
                                                        <List.Content>
                                                        <p style={{margin:'5px 10px'}}>
                                                            {user.email} | {user.status}
                                                            
                                                            {/* &nbsp; <Label color={'green'} style={{fontSize:'10px',fontWeight:'300'}}>Active</Label> */}
                                                            <Link exact to={`/account/users/view/${user._id}`}>
                                                            <span style={{float: 'right', color: 'white', cursor: 'pointer', backgroundColor: '#0798fd', padding: '0px 7px', borderRadius: 3}}>view</span>
                                                                
                                                            </Link>

                                                        </p>
                                                        </List.Content>
                                                    </List.Item>
                                                )
                                            })}
                                        </List>
                                    </div>
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

const mapStateToProps = (state) => ({
    navbarprogress:state.navbarprogress
})


export default connect(mapStateToProps)(UserIndex)
