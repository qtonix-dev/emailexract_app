import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {Link} from 'react-router-dom'
import { FiSearch } from "react-icons/fi";
import axios  from 'axios';
import Body from '../components/Body'
import { Grid,Form, Button,Input,Label,Icon } from 'semantic-ui-react'
import ShowFoundUrls from '../components/home/ShowFoundUrls'
import API from '../api/API'
import cookie from 'react-cookies'
import ReactImageFallback from "react-image-fallback";
import { toast } from 'react-toastify';
import {navbarProgressInfo} from '../actions';
import CheckPackageRedirect from '../components/CheckPackageRedirect'
import ShowQuotaReached from '../components/ShowQuotaReached'

// import PDF from '../components/PDF'
// import Stripe from '../components/Stripe'

export class Home extends Component {


    constructor(props){
        super(props)
        this.state={
            loadingBtn:false,
            staus:'waiting',
            domain:'',
            datas:false,
            userid:cookie.load('qtonixemailextractweb_userid'),
            recentsearches:[]
        }
        this.handleChange=this.handleChange.bind(this)

    }

    handleChange(e){
        // if(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(e)) {
        this.setState({
            [e.target.name]:e.target.value,
            datas:false,
            status:'waiting'
        })
    
     }


    componentDidMount(){
        this.fetchRecentSearches();
    }


    fetchRecentSearches(){
        API.get(`domainsearch/recentsearches/${this.state.userid}`)
        .then(response=>{


            this.setState({
                recentsearches:response.data.data
            })
        })
    }


    async handleSetEmail(event) {
        await this.setState({
            domain:event,
            datas:false,
            status:'waiting'
        })
    }
    


    handleSubmit=e=>{
        if(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(this.state.domain)) {

        
       
           
            e.preventDefault();
        this.setState({loadingBtn:true})
        axios.get(`https://emailextractserver2bulkgetinfo.herokuapp.com/extract/${this.state.domain}`)
        // API.get(`/domainsearch/finddomain/${this.state.domain}/${this.state.userid}`)
        .then(response=>{
            this.props.navbarProgressInfo()
            if(response.data.response){
                
                if(response.data.response.emails.length===0){
                    this.setState({loadingBtn:false,status:'not_found',datas:false})
                    this.fetchRecentSearches();

                }else{
                    this.setState({loadingBtn:false,status:'found',datas:response.data.response  })
                    this.fetchRecentSearches();

                }


            }else{
                this.setState({loadingBtn:false,status:'not_found',datas:false}) 
                this.fetchRecentSearches();

            }
            console.log(response.data);
        })
        .catch(error => {
            API.get(`/domainsearch/storerecentsearch/${this.state.domain}/${this.state.userid}`)
            .then(response=>{
                if(response.data.response){
                    this.fetchRecentSearches();
                }
                
            })
            this.setState({loadingBtn:false,status:'not_found',datas:false}) 
        });


    }
    else {
            
        toast.error('invalid domain', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        
    this.setState({loadSubmitButton:false})

    }
        





        
    }

    handleDelete=(e,f)=>{
        API.get(`/domainsearch/delete/${e}`)
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


    // componentDidMount(){
    //     API.get(`/user/show_daily_data/${cookie.load('qtonixemailextractweb_userid')}`)
    //     .then(response=>{
    //         this.setState({
    //             navbarprogress:response.data
    //         })
    //     })
    // }
    

    render() {
        return (
            <Body>
                <CheckPackageRedirect />
                <ShowQuotaReached page='home'>
                <section>
                    {/* {this.state.navbarprogress===undefined
                    ?<></>
                    :
                    <>
                    <div className="upgradewarning">
                    <center>
                    <p>You reached your monthly quota of searches. <Link exact to='/account/subscription/view'><b>Upgrade</b></Link> your subscription to continue.</p>
                    </center>
                    <br />
                    </div>
                    </>
                    } */}
                    <div className="cuscontainer">
                    <Grid>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <h3>Domain Search </h3>
                            </Grid.Column>
                            <Grid.Column>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Input type='text' name='domain' value={this.state.domain} onChange={this.handleChange} fluid placeholder='Enter a domain name to find email addresses' action className="input55" required={true}>
                                            <input />
                                            <Button type='submit' className='btn211'  loading={this.state.loadingBtn} disabled={this.state.loadingBtn}><FiSearch /></Button>
                                        </Input>
                                        {/* <p>Enter a domain name to find email addresses.</p> */}
                                        <br />
                                    </Form>
                            </Grid.Column>
                            <Grid.Column>
                            <p className="float-right">{this.state.datas===false
                                ?<></>
                                :
                                <>
                                {this.state.datas.emails.length} results

                                </>
                                    }</p>
                            </Grid.Column>
                            <Grid.Column >

                                
                                
                                
                                {this.state.status==='found'
                                
                                ?
                                    <>
                                    {this.state.datas.emails.length>5
                                    ?
                                    <>
                                   
                                  
                                   <ReactImageFallback
                                                    src={`https://logo.clearbit.com/${this.state.domain}`}
                                                    fallbackImage="https://www.freepnglogos.com/uploads/logo-website-png/logo-website-website-logo-png-transparent-background-background-15.png"
                                                    initialImage={`https://logo.clearbit.com/${this.state.domain}`}
                                                    alt="cool image should be here"
                                                    className="my-image" />
                                     {/* {this.state.datas.emails.map((data)=>{
                                        return(
                                            // <ShowFoundUrls key={data.email} data={data} />
                                            <p>
                                                {data} </p>
                                        )
                                    })}  */}
                                    


                                      
                                        <ShowFoundUrls key={1} data={this.state.datas.emails[0]} />
                                        <ShowFoundUrls key={2} data={this.state.datas.emails[1]} />
                                        <ShowFoundUrls key={3} data={this.state.datas.emails[2]} />
                                        <ShowFoundUrls key={4} data={this.state.datas.emails[3]} />
                                        <ShowFoundUrls key={5} data={this.state.datas.emails[4]} /> 
                                        <p>and {this.state.datas.emails.length-5} more results</p>
                                    </>
                                    :
                                    <>
                                    <div style={{overflowY:'hidden'}}>
                                    <ReactImageFallback
                                                    src={`https://logo.clearbit.com/${this.state.domain}`}
                                                    fallbackImage="https://www.freepnglogos.com/uploads/logo-website-png/logo-website-website-logo-png-transparent-background-background-15.png"
                                                    initialImage={`https://logo.clearbit.com/${this.state.domain}`}
                                                    alt="cool image should be here"
                                                    className="my-image" />
                                     {this.state.datas.emails.map((data)=>{
                                         return(
                                             // <ShowFoundUrls key={data.email} data={data} />
                                             <p>{data} </p>
                                         )
                                     })}
                                     </div>
    
                                    </>
                                    }
                                    </>


                                
                                :<></>
                                }


                                {this.state.status==='not_found'
                                ?
                                <>
                                <div>
                                    <h3 style={{color:"red"}}>Oh no! We couldn't find any emails</h3>
                                    <p>our trackers are searching the internet for leads of the highest quality, unfortunately we don't have any for this company, YET. but rest assured, we are working on it.</p>
                                
                                </div>
                                </>
                                :<></>
                                }
                                <br />
                                
                                
                                

                            </Grid.Column>

                           

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
                                                    <span onClick={()=>this.handleSetEmail(rs.domain)}>{rs.domain}</span>
                                                        <Icon name='delete' onClick={()=>this.handleDelete(rs._id,rs.domain)} />
                                                </Label>

                                                

                                                </>
                                            )
                                        })} 
                                        </h4>   
                                    
                                    </>
                                    }
                                    
                                </div>
                            </Grid.Column>


                            {/* <Grid.Column >
                                <div className="recentsearches2">
                                    <div className="recentsearches2_block">
                                        <Grid>
                                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                               <span className='recentsearches2_block_span'>abc.com</span> 
                                            </Grid.Column>
                                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                                <span className='recentsearches2_block_span'>2021 08 09</span>
                                            </Grid.Column>
                                        </Grid>
                                    </div>

                                    <div className="recentsearches2_block">
                                        <Grid>
                                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                               <span className='recentsearches2_block_span'>abc.com</span> 
                                            </Grid.Column>
                                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                                <span className='recentsearches2_block_span'>2021 08 09</span>
                                            </Grid.Column>
                                        </Grid>
                                    </div>

                                    <div className="recentsearches2_block">
                                        <Grid>
                                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                               <span className='recentsearches2_block_span'>abc.com</span> 
                                            </Grid.Column>
                                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                                <span className='recentsearches2_block_span'>2021 08 09</span>
                                            </Grid.Column>
                                        </Grid>
                                    </div>
                                </div>
                            </Grid.Column> */}
                        </Grid.Row>
                    </Grid>
                    </div>                       
                </section>
                </ShowQuotaReached>

                {/* <PDF /> */}
                {/* <Stripe /> */}
            </Body>
        )
    }
}

const mapStateToProps = (state) => ({
})


export default connect(mapStateToProps,{navbarProgressInfo})(Home)
