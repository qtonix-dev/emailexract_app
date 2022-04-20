import React, { Component } from 'react'
import { connect } from 'react-redux'
import Body from '../components/Body'
import { Grid,Form, Button, Label, Icon} from 'semantic-ui-react'
import { MdVerifiedUser } from "react-icons/md";
import API from '../api/API'
import cookie from 'react-cookies'
import { toast } from 'react-toastify';
import {navbarProgressInfo} from '../actions';
import CheckPackageRedirect from '../components/CheckPackageRedirect'
import ShowQuotaReached from '../components/ShowQuotaReached'
// import axios from 'axios';
import API2 from '../api/API2';


export class EmailFinder extends Component {

    constructor(props){
        super(props)
        this.state={
            name:'',
            domain:'',
            formLoading:false,
            showFound:false,
            showNotFound:false,
            data:null,
            userid:cookie.load('qtonixemailextractweb_userid'),
            recentsearches:[]
        }
        this.handleChnage=this.handleChnage.bind(this)
    }



    componentDidMount(){
        this.fetchRecentSearches();
    }



    fetchRecentSearches(){
        API.get(`/emailfinder/recentsearches/${this.state.userid}`)
        .then(response=>{
            console.log(response.data)
            this.setState({
                recentsearches:response.data.data
            })
        })
    }


    async handleSetEmail(a,b) {
        await this.setState({
            name:a,
            domain:b,

        })
    }


    handleChnage(e){
        this.setState({
            data:null,
            [e.target.name]:e.target.value
        })
    }


    handleSubmit=e=>{
        this.setState({formLoading:true})

        var name = this.state.name;
        var nameArray = name.split(' ');

        var tempdata={
            name:nameArray[0].toLowerCase(),
            domain:this.state.domain,
            fullname:this.state.name,
            userid:this.state.userid
        }

        API2.post(`/emailfind`,tempdata)
        .then(response=>{
            this.props.navbarProgressInfo();
            this.fetchRecentSearches();
            console.log(response.data)

            if(response.data.deliverable){
                this.setState({
                showFound:true,
                showNotFound:false,
                formLoading:false,
                data:response.data
            })
            }else{
                this.setState({
                    showFound:false,
                    showNotFound:true,
                    formLoading:false,
                    data:response.data
                })
            }
            
            
        })
        .catch(error => {
            this.setState({
                showFound:false,
                showNotFound:true,
                formLoading:false,
                data:[]
            })
        });
    }


    
    handleDelete=(e,f)=>{
        API.get(`/emailfinder/delete/${e}`)
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
                <ShowQuotaReached page='emailfinder'>


                <section>
                    <div className="cuscontainer">
                    <Grid>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <h3>Email Finder</h3>
                            </Grid.Column>
                            <Grid.Column>
                                    <Form onSubmit={this.handleSubmit} loading={this.state.formLoading}>
                                        <Form.Group>
                                        <Form.Input placeholder='John Doe' className="input55" width={8} onChange={this.handleChnage} name='name' value={this.state.name} required />
                                        <Form.Input placeholder='xyz.com' className="input55" width={6} onChange={this.handleChnage} name='domain' value={this.state.domain} required />
                                        <Button type='submit' className='btn211'>Find</Button>
                                        </Form.Group>
                                        <p>Enter a full name and the domain name of the email address (for example "xyz.com").</p>
                                    </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>


                    {this.state.data===null
                    ?
                    <>
                    </>
                    :
                    <>
                    
                    {this.state.showNotFound
                    ?
                    <Grid>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                               <h4>We didn't find the email address of this person. Why?</h4>
                               <br />
                        </Grid.Column>
                    </Grid>
                    :
                    <></>
                    }
                    {/* NOT FOUND */}


                        {this.state.showFound
                        ?
                        <Grid>
                            <Grid.Column mobile={16} tablet={16} computer={16}>
                                <div className="findbyname">
                                    <h1>{this.state.data.email} &nbsp; <span><MdVerifiedUser /></span> </h1>
                                </div>   
                            </Grid.Column>
                            {/* <br />
                            <Grid.Column mobile={4} tablet={2} computer={2}>
                        
                            <img src={this.state.data.metadata.icon} onError={(e)=>{e.target.onerror = null; e.target.src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"}} alt="found" style={{height:'48px',width:'48px'}} />
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={16} computer={13}>
                                <div className="findbyname_foundperson">
                                    <h5>{this.state.name}</h5>
                                    <h6>{this.state.data.metadata.title}</h6>
                                </div>
                            </Grid.Column>
                            <br /> */}
                            {/* <Grid.Column mobile={16} tablet={16} computer={13}>
                                <div className="findbyname_links">
                                    <h6>We found {this.state.data.urls.length} email sources</h6>
                                    {this.state.data.urls.map((url)=>{
                                        return(
                                            <>
                                            <a rel="noreferrer" href={url.link} key={url.link} target="_blank">{url.link}</a><br />
                                            </>
                                        )
                                    })}
                                    

                                </div>
                            </Grid.Column> */}

                        </Grid>
                        :<></>}
                    
                    </>
                    }

                        <Grid>

                        <Grid.Column >
                                <div className="recentsearches">
                                    {this.state.recentsearches.length===0
                                    ?<></>
                                    :
                                    <>
                                    <h4>Recent Searches &nbsp;
                                    
                                        {this.state.recentsearches.map((rs, key)=>{

                                            return(
                                                <>
                                                <Label as='a' key={key} >
                                                    <span onClick={()=>this.handleSetEmail(rs.fullname,rs.domain)}>{rs.fullname}</span>
                                                        <Icon name='delete' onClick={()=>this.handleDelete(rs._id,rs.fullname)} />
                                                </Label>

                                                

                                                </>
                                            )
                                        })} 
                                        </h4>   
                                    
                                    </>
                                    }
                                    
                                </div>
                            </Grid.Column>
                            
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


export default connect(mapStateToProps, {navbarProgressInfo})(EmailFinder)
