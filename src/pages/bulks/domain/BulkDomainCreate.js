import React, { Component } from 'react'
import { connect } from 'react-redux'
import Body from '../../../components/Body'
import { Grid, Button, Form, Loader } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid';
import cookie from 'react-cookies'
import API_BULK_EXTRACT from '../../../api/API_BULK_EXTRACT'
import { toast } from 'react-toastify';
import axios from 'axios';


export class BulkDomainCreate extends Component {


    constructor(props){
        super(props)
        this.state={
            loadSubmitButton:false,
            uuid:uuidv4(),
            listname:'',
            domains:'',
            speed:4000,
            user:cookie.load('qtonixemailextractweb_userdata')
        }
        this.handleChange=this.handleChange.bind(this)
    }


    

    componentDidMount(){
        axios.get('https://emailextractserver2bulkgetinfo.herokuapp.com/api/bulkdomainextract/pupextract/sweetheartgallery.com')
        .then(response=>{
            // console.log(response.data.response.html[10])

            // const $ = cheerio.load(`${response.data.response.html.toString()}`);
            // var stringdata = $.html();
    
            // console.log(stringdata)


            // console.log(`${response.data.response.html.toString()}`)




            // var varEmails = []

            // // working code
            // var emaildata = extractEmail(`${stringdata}`);
            // // console.log(emaildata)
            // emaildata.forEach(element => {
            //     console.log(element)
            // });

            // console.log(stringdata)
            // var resEmail = emaildata;


            // resEmail.forEach((item) => {
            //     var href = item
            //     var thref = href.toLowerCase();
            //     if(ValidateEmail(thref)){
            //       var tdataarray=[thref];
            //       tdataarray.forEach(function(value){
            //         if (varEmails.indexOf(value)==-1) varEmails.push(value);
            //       });
            //     }
            //   });
        
        
        
            //   //GET ALL EMAILS
            //   $('a[href^="mailto:"]').each((i, link) => {
            //     const href = link.attribs.href;
            //     var thref = href.substring(7).toLowerCase();
            //     if(ValidateEmail(thref)){
            //       var tdataarray=[thref];
            //       tdataarray.forEach(function(value){
            //         if (varEmails.indexOf(value)==-1) varEmails.push(value);
            //       });
            //     }
            //   });



            //   console.log(varEmails)
              
        })

        
    }


    
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }


    handleSubmit=speeddata=>{
        this.setState({loadSubmitButton:true})
        const word = this.state.domains;
        const domains = word.split("\n");
        const state= this.state;

        var domainCreate = [];
        domains.forEach(domainFunction);
        function domainFunction(domainurl, index) {

            if(domainurl===''){

            }else{
                var data={
                    domain:domainurl,
                    uuid:state.uuid,
                    userid:state.user._id,
                    username:state.user.name,
                    useremail:state.user.email,
                    listname:state.listname,
                    speed:speeddata
                }
                domainCreate.push(data);
            }
            
        }


        //CHECK HOW MANY CREDIT LEFT
        if(this.props.navbarprogress.packageinfo.totalbuldomainkextract-this.props.navbarprogress.bulk_domain_search<domainCreate.length){
            toast.warning(`You can't extract more than ${this.props.navbarprogress.packageinfo.totalbuldomainkextract-this.props.navbarprogress.bulk_domain_search}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({loadSubmitButton:false})
            
        }else{
            // CHECK BULK UPLOAD AT A TIME
            if(this.props.navbarprogress.packageinfo.bulkuploaddomainatatime<domainCreate.length){
                toast.warning(`You can't upload more than ${this.props.navbarprogress.packageinfo.bulkuploaddomainatatime}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.setState({loadSubmitButton:false})
            }else{
            
            
            // API_BULK_EXTRACT.post('/bulkdomainextract/bulkextractbyuser',domainCreate)
            // axios.post('http://localhost:5004/api/bulkdomainextract/websitesingledomainextract',domainCreate)


            


            API_BULK_EXTRACT.post('/bulkdomainextract/new/storebulkinfo',domainCreate)
            .then(response=>{
                if(response.data.response){
                    // alert('Success');


                    // axios.post('https://emailextractserver2bulkgetinfo.herokuapp.com/api/bulkdomainextract/websitemultidomainextract',domainCreate)
                    // axios.post('https://emailextractserver2bulkgetinfo.herokuapp.com/api/bulkdomainextract/websitesingledomainextract',domainCreate)
                    
                    // axios.post('http://localhost:5002/api/bulkdomainextract/new/storebulksubdatas',domainCreate)

                    axios.post('http://localhost:5002/api/bulkdomainextract/new/storebulksubdatas',domainCreate)
                    .then(response=>{
                        this.props.history.push(`/bulks/domainextract/view/${this.state.uuid}`)
                        // console.log(response.data)

                        // if(response.data.response){
                        //     this.props.history.push(`/bulks/domainextract/view/${this.state.uuid}`)
                        // }else{
                        //     alert('Failed')
                        // }
                    })


                }else{
                    alert('Failed try again');
                }
            })



            

            }
        }

        





        


    }


    render() {
        
        return (
            <Body>
                <section>
                    <div className="cuscontainer">
                    {this.props.navbarprogress===null || this.props.navbarprogress===undefined
                    ?<Loader active inline='centered' />
                    :
                    <Grid>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <h3>Bulk Domain Search</h3>
                                <h6>Find email addresses from a list of websites or companies.</h6>
                                <br />
                                <p>Max upload limit: {this.props.navbarprogress.packageinfo.bulkuploaddomainatatime}</p>
                                <p>Limit: {this.props.navbarprogress.packageinfo.totalbuldomainkextract}</p>
                                <p>Credit Left: {this.props.navbarprogress.packageinfo.totalbuldomainkextract-this.props.navbarprogress.bulk_domain_search}</p>


                            </Grid.Column>
                            <Grid.Column>
                                <Grid columns='equal' className="bulksec">
                                    <Grid.Column>
                                        <Form onSubmit={()=>this.handleSubmit(this.props.navbarprogress.packageinfo.mainspeed)}>
                                        <Form.Input label='List name' placeholder='Enter a name' name="listname" onChange={this.handleChange} value={this.state.listname} required />
                                        <Form.TextArea label='Enter the domain names (one per line)' name="domains" onChange={this.handleChange} value={this.state.domains} required placeholder='websiteone.com
websitetwo.com' />
                                        <Button type='submit' className="float-right bgmblue text-white" loading={this.state.loadSubmitButton}>Submit</Button>
                                        </Form>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    }
                    
                    </div>
                </section>
            </Body>
        )
    }
}

const mapStateToProps = (state) => ({
    navbarprogress:state.navbarprogress
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkDomainCreate)
