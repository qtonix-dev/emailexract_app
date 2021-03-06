import React, { Component } from 'react'
import { connect } from 'react-redux'
import Body from '../components/Body'
import { Grid,Form,Button,Input,Label,Icon } from 'semantic-ui-react'
import * as EmailValidator from 'email-validator';
import { toast } from 'react-toastify';
import ValidEmail from '../components/emailverifier/ValidEmail'
import InvalidEmail from '../components/emailverifier/InvalidEmail'
import API from '../api/API'
// import axios from 'axios'
import cookie from 'react-cookies'
import {navbarProgressInfo} from '../actions';
import CheckPackageRedirect from '../components/CheckPackageRedirect'
import ShowQuotaReached from '../components/ShowQuotaReached'
import API2 from '../api/API2';

export class EmailVerifier extends Component {

    constructor(props){
        super(props)
        this.state={
            email:'',
            formLoading:false,
            isValid:true,
            isInvalid:false,
            data:null,
            userid:cookie.load('qtonixemailextractweb_userid'),
            recentsearches:[]


        }
        this.handleChange=this.handleChange.bind(this)
    }


    componentDidMount(){
        this.fetchRecentSearches();
    }


    fetchRecentSearches(){
        API.get(`emailverifcation/recentsearches/${this.state.userid}`)
        .then(response=>{
            this.setState({
                recentsearches:response.data.data
            })
        })
    }

    handleChange(e){
        this.setState({
            data:null,
            [e.target.name]:e.target.value
        })
    }

    handleSubmit=e=>{
        
        if(EmailValidator.validate(this.state.email)){
            this.setState({formLoading:true})
            
            var datatemp={
                email:this.state.email,
                userid:this.state.userid
            }

            API2.post(`/emailverification`,datatemp)
            .then(response=>{
                


                if(response.data.deliverable){
                    this.setState({
                        formLoading:false,
                        isValid:true,
                        isInvalid:false,
                        data:response.data,
                    })
                    this.fetchRecentSearches();
                this.props.navbarProgressInfo();
                }else{
                    this.setState({
                        formLoading:false,
                        isValid:false,
                        isInvalid:true,
                        data:response.data,
                    })
                    this.fetchRecentSearches();
                this.props.navbarProgressInfo();
                }
            })
            


        }else{
            toast.warn('Invalid email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    async handleSetEmail(event) {
        await this.setState({
            email:event
        })
    }

    
    handleDelete=(e,f)=>{
        API.get(`/emailverifcation/delete/${e}`)
        .then(response=>{
            if(response.data.response){
                this.fetchRecentSearches();
                toast.success(`${f} removed successfully`, {
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
        return (
            <Body>
                <CheckPackageRedirect />
                <ShowQuotaReached page='emailverifier'>
                
                <section>
                    <div className="cuscontainer">
                    <Grid>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <h3>Email Verifier</h3>
                            </Grid.Column>
                            <Grid.Column>
                                    <Form onSubmit={this.handleSubmit} loading={this.state.formLoading}>
                                        <Input type='text' fluid placeholder='Search...' action className="input55" name="email" value={this.state.email} onChange={this.handleChange} required>
                                            <input />
                                            <Button type='submit' className='btn211'>Verify</Button>
                                        </Input>
                                        {/* <p>Enter an email address to verify its deliverability.</p> */}
                                    </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    

                    {this.state.data!==null
                    ?
                    <>
                    {this.state.isValid
                    ?<ValidEmail urls={this.state.data.urls} data={this.state.data} />
                    :<></>}

                    {this.state.isInvalid
                    ?<InvalidEmail urls={this.state.data.urls} data={this.state.data} />
                    :<></>}
                    </>
                    :<></>}

                    <Grid>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <div className="recentsearches">
                                                {this.state.recentsearches.length===0
                                                ?<></>
                                                :
                                                <>
                                                <h4>Recent Searches &nbsp;
                                                
                                                    {this.state.recentsearches.map((rs, key)=>{

                                                        return(
                                                            <Label as='a' key={key} >
                                                                <span onClick={()=>this.handleSetEmail(rs.email)}>{rs.email}</span>
                                                                    <Icon name='delete' onClick={()=>this.handleDelete(rs._id,rs.email)} />
                                                            </Label>
                                                        )
                                                    })} 
                                                    </h4>   
                                                
                                                </>
                                                }
                                                
                                </div>
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

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps, {navbarProgressInfo})(EmailVerifier)

