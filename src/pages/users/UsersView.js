import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import Body from '../../components/Body'
import { Grid,Tab } from 'semantic-ui-react'
import AccountSidenav from '../../components/account/AccountSidenav'
import API from '../../api/API'
import TabBulk from './TabBulk'
import TabVerifier from './TabVerifier'




export const UserCreate = (props) => {

    const [tab,setTab]=useState(0)
    const [user,setUser]=useState(null)



    

    useEffect(()=>{
        const fetchMyAPI = async () => {

            API.get(`/user/viewdetails/${props.match.params.id}`)
            .then(response=>{
                console.log(response.data)
                setUser(response.data.data)
            })
    
    
        }
          fetchMyAPI()
    },[props])



    const panes = [
        { menuItem: 'Domain Search', render: () => <Tab.Pane><TabBulk userid={props.match.params.id} /></Tab.Pane> },
        { menuItem: 'Finder', render: () => <Tab.Pane><TabBulk userid={props.match.params.id} /></Tab.Pane> },
        { menuItem: 'Verifier', render: () => <Tab.Pane><TabVerifier userid={props.match.params.id} /></Tab.Pane> },
        { menuItem: 'Bulk Domain Search', render: () => <Tab.Pane><TabBulk userid={props.match.params.id} /></Tab.Pane> },

    ]

    const handleChange = (e, data) => setTab(data.activeIndex)


    // function handleChange(e, data){
    //     console.log( data )
    // }

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
                                    <h3>User View</h3>
                                    {user===null
                                    ?<></>
                                    :
                                    <>
                                    <p style={{lineHeight:'7px'}}>Name: {user.name}</p>
                                    <p style={{lineHeight:'7px'}}>Email: {user.email}</p>
                                    <p style={{lineHeight:'7px'}}>Password: {user.password}</p>
                                    <br />

                                    
                                    </>}
                                      
                                </Grid.Column>
                                <Grid.Column>
                                    <Tab panes={panes} onTabChange={handleChange} activeIndex={tab} />
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
    navbarprogress:state.navbarprogress,
    admin:state.users
})


export default connect(mapStateToProps)(UserCreate)
