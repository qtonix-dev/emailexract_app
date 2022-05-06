import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import Body from '../../components/Body'
import { Grid,List,Button } from 'semantic-ui-react'
import AccountSidenav from '../../components/account/AccountSidenav'
// import Chart from "react-google-charts";
import {Link,Redirect} from 'react-router-dom'
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



    
    // if(props.navbarprogress!==null){
    //     if(props.navbarprogress.packageinfo!==undefined){
    //         console.log(props.navbarprogress.packageinfo)
    //     }
    // }
    console.log(props.navbarprogress)
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
                            

                                {props.navbarprogress===undefined || props.navbarprogress===null
                                ?
                                <></>
                                :
                                <>
                                    {props.navbarprogress.packageinfo==='no_package_found'
                                    ?
                                    <Redirect to='/account/subscription/view' />
                                    :
                                    <>
                                    {props.navbarprogress.packageinfo.totalbuldomainkextract===123456789
                                    ?
                                    <>
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
                                    </>
                                    :
                                    <>
                                    <Redirect to='/account/subscription/view' />
                                    </>
                                    }
                                    </>
                                    }

                                </>
                                }



                            
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
