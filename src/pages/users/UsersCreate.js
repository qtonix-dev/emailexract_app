import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import Body from '../../components/Body'
import { Grid,Form } from 'semantic-ui-react'
import AccountSidenav from '../../components/account/AccountSidenav'
import cookie from 'react-cookies'
import API from '../../api/API'

export const UserCreate = (props) => {

    const [formLoading,setFormLoading]=useState(false);
    const [user,setUser]=useState({
        name:'',
        email:'',
        password:'',
        parentid:cookie.load('qtonixemailextractweb_userid'),
        type:'SubUser',
        emailverification:'Verified',
        
    })

    useEffect(()=>{
        if(props.admin!==undefined){
            setUser({
                name:'',
                email:'',
                password:'',
                parentid:cookie.load('qtonixemailextractweb_userid'),
                type:'SubUser',
                emailverification:'Verified',
                packageenddate:props.admin.packageenddate,
                packageenddatenumber:props.admin.packageenddatenumber,
                packageid:props.admin.packageid,
                packagename:props.admin.packagename,
                packagestartdate:props.admin.packagestartdate,
                packagetempenddate:props.admin.packagetempenddate,
                packagetype:props.admin.packagetype,
                packagetempstartdate:props.admin.packagetempstartdate,
            })
        }
    },[props])



    function handleChnage(e){
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }


    const handleSubmit = () => {
        setFormLoading(true)
        API.post('/user/create_sub_user',user)
        .then(response=>{
            if(response.data.response){
                setFormLoading(false)
                console.log(response.data)
                props.history.push('/account/users')
            }else{
                alert('Email already exist, please try some diffrent email address.')
                setFormLoading(false)
            }
        })
    }

    
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
                                    <h3>Create User</h3>
                                        {user.sss}
                                </Grid.Column>
                                <Grid.Column>
                                    <Form onSubmit={handleSubmit} loading={formLoading}>
                                        <Form.Input fluid label='Name' placeholder='Name' name='name' value={user.name} onChange={handleChnage} required/>
                                        <Form.Input fluid label='Email' type='email' placeholder='Email' name='email' value={user.email} onChange={handleChnage}  required/>
                                        <Form.Input fluid label='Password' type='password' placeholder='Password' name='password' value={user.password} onChange={handleChnage}  required/>
                                        <Form.Button primary type='submit' >Create</Form.Button>
                                    </Form>
                                    
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
