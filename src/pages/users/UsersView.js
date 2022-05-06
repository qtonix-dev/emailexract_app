import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import Body from '../../components/Body'
import { Button, Grid,Tab,Modal } from 'semantic-ui-react'
import AccountSidenav from '../../components/account/AccountSidenav'
import API from '../../api/API'
import TabBulk from './TabBulk'
import TabVerifier from './TabVerifier'
import TabFinder from './TabFinder'
import TabSingleSearch from './TabSingleSearch'
import TabLogin from './TabLogin'







export const UserCreate = (props) => {

    const [tab,setTab]=useState(0)
    const [user,setUser]=useState(null)
    const [open,setOpen]=useState(false)


    
    

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
        { menuItem: 'Domain Search', render: () => <Tab.Pane><TabSingleSearch userid={props.match.params.id} /></Tab.Pane> },
        { menuItem: 'Finder', render: () => <Tab.Pane><TabFinder userid={props.match.params.id} /></Tab.Pane> },
        { menuItem: 'Verifier', render: () => <Tab.Pane><TabVerifier userid={props.match.params.id} /></Tab.Pane> },
        { menuItem: 'Bulk Domain Search', render: () => <Tab.Pane><TabBulk userid={props.match.params.id} /></Tab.Pane> },
        { menuItem: 'Login', render: () => <Tab.Pane><TabLogin userid={props.match.params.id} /></Tab.Pane> },
    ]

    const handleChange = (e, data) => setTab(data.activeIndex)


    const handleDelete = () => {
        API.get(`/user/deleteuser/${props.match.params.id}`)
            .then(response=>{
                if(response.data.response){
                    props.history.push('/account/users')
                }
            })
    }


    const chnageStatus = (id,status) => {

        API.get(`/user/userstatusupdate/${id}/${status}`)
            .then(response=>{
                if(response.data.response){
                    setUser(response.data.data)
                }
            })
    
    
    }


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
                                    <h3>User View  
                                        <span className='float-right'>
                                        {user===null
                                        ?<></>
                                        :
                                        <>
                                        {user.status==='Active'
                                        ?
                                        <Button color='green' size='sm' onClick={() => chnageStatus(user._id,'InActive')}>
                                            Deactive
                                        </Button>
                                        :
                                        <Button color='green' size='sm' onClick={() => chnageStatus(user._id,'Active')}>
                                            Active
                                        </Button>
                                        }
                                        </>
                                        }
                                        
                                        
                                        <Modal
                                            onClose={() => setOpen(false)}
                                            onOpen={() => setOpen(true)}
                                            open={open}
                                            size='mini'
                                            trigger={<Button color='red'>Delete</Button>}
                                            >
                                            <Modal.Content image>
                                                
                                                <Modal.Description>
                                                <h2>Are you sure?</h2>
                                                <Button color='red' size='sm' onClick={() => setOpen(false)}>
                                                    No
                                                </Button>
                                                <Button color='green' size='sm' onClick={() => handleDelete()}>
                                                    Yes
                                                </Button>
                                                </Modal.Description>
                                            </Modal.Content>
                                            </Modal>    
                                        </span> 
                                    </h3>
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
