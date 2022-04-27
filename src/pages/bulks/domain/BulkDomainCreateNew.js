import React, { Component } from 'react'
import { connect } from 'react-redux'
import Body from '../../../components/Body'
import { Grid, Button,Radio, Form, Loader, Table, Progress,Checkbox } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid';
import cookie from 'react-cookies'
// import API_BULK_EXTRACT from '../../../api/API_BULK_EXTRACT'
// import { toast } from 'react-toastify';
// import axios from 'axios'
import percentage from 'calculate-percentages'
import TableRowView from './TableRowView'
// import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import API3 from '../../../api/API3';
import API from '../../../api/API';
import {navbarProgressInfo} from '../../../actions';
import _ from 'lodash'


export class BulkDomainCreate extends Component {


    constructor(props){
        super(props)
        this.state={
            loadSubmitButton:false,
            uuid:uuidv4(),
            maxupload:0,
            extractleft:0,
            totalcredits:0,
            showformbox:false,
            listname:'',
            domains:'',
            // speed:4000,
            user:cookie.load('qtonixemailextractweb_userdata'),
            // totaldomain:1,
            // counter:0,
            domainextractprocess:'Waiting',
            // domainextractprocess:'saving',

            totaldomains:0,
            domainCreate:null,
            datas:[],
            count:0,
            // currentextractdomainname:false,
            // bulkdomainextratdata:[],
            extractPhone:true,
            extractSocial:true,
            extractType:'deep'

        }
        this.handleChange=this.handleChange.bind(this)
        this.fetchRecord=this.fetchRecord.bind(this)
        // this.setRecord=this.setRecord.bind(this)
        
    }

    componentDidMount(){
        this.props.navbarProgressInfo();
        if(this.props.navbarprogress){
            this.setState({
                maxupload:this.props.navbarprogress.packageinfo.bulkuploaddomainatatime,
                totalcredits:this.props.navbarprogress.packageinfo.totalbuldomainkextract,
                extractleft:this.props.navbarprogress.packageinfo.totalbuldomainkextract-this.props.navbarprogress.bulk_domain_search,
                showformbox:true
            })
        }else{
            // console.log(this.props.navbarprogress)
        }
        
    }

    componentWillReceiveProps(props){
        if(props.navbarprogress){
            console.log(props.navbarprogress)
            

            if(props.navbarprogress.packageinfo.bulkuploaddomainatatime<props.navbarprogress.packageinfo.totalbuldomainkextract-props.navbarprogress.bulk_domain_search){
                this.setState({
                    maxupload:props.navbarprogress.packageinfo.bulkuploaddomainatatime,
                    totalcredits:props.navbarprogress.packageinfo.totalbuldomainkextract,
                    extractleft:props.navbarprogress.packageinfo.totalbuldomainkextract-props.navbarprogress.bulk_domain_search,
                    showformbox:true
                })
            }else{
                this.setState({
                    maxupload:props.navbarprogress.packageinfo.totalbuldomainkextract-props.navbarprogress.bulk_domain_search,
                    totalcredits:props.navbarprogress.packageinfo.totalbuldomainkextract,
                    extractleft:props.navbarprogress.packageinfo.totalbuldomainkextract-props.navbarprogress.bulk_domain_search,
                    showformbox:true
                })
            }

        }else{
            // console.log(this.props.navbarprogress)
        }
    }

    
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }


    handleSubmit=speeddata=>{


        var state= this.state;

        console.log(state.extractPhone);
        console.log(state.extractSocial);


        const word = this.state.domains;
        const domains = word.split("\n");

        var domainCreate = [];
        domains.forEach(domainFunction);
        function domainFunction(domainurl, index) {

            if(domainurl===''){

            }else{
                var data={
                    domain:domainurl
                }
                domainCreate.push(data);
            }            
        }


        if(domainCreate.length>this.state.maxupload){
            alert(`You can't uplaod more than ${this.state.maxupload} domains.`)
        }else{
            this.setState({
                domainCreate:domainCreate,
                totaldomains:domainCreate.length,
                domainextractprocess:'processing...'
            })
    
    
            API3.get(`/extract/${domainCreate[this.state.count].domain}/${this.state.extractType}/${this.state.extractPhone}/${this.state.extractSocial}`)
            .then(response=>{
              
                var bulkdomainextratdata = this.state.datas;
                var msdata= response.data.response;
                // msdata.uuid=this.state.uuid,
                // msdata.userid=this.state.userid,

                msdata = { ...msdata, uuid: this.state.uuid ,userid: this.state.user._id};



                bulkdomainextratdata.push(msdata);
    
                this.setState({
                    count:this.state.count+1,
                    datas:bulkdomainextratdata,
                    domainextractprocess:'extracting...'
                })
                this.fetchRecord();
                this.fetchRecord();
                this.fetchRecord();
                this.fetchRecord();

            })
        }

        
    }



    fetchRecord(){
        
        if(this.state.totaldomains===_.uniqBy(this.state.datas, 'domain').length){
            this.setState({
                domainextractprocess:'saving'
            })
            this.storeRecordinDB();
        }else{

            API3.get(`/extract/${this.state.domainCreate[this.state.count].domain}/${this.state.extractType}/${this.state.extractPhone}/${this.state.extractSocial}`)
            .then(response=>{
                var bulkdomainextratdata = _.uniqBy(this.state.datas, 'domain');
                // var msdata= response.data.response;

                // let filtered_array = _.find(bulkdomainextratdata, ['domain', response.data.response.domain]);

                // if(filtered_array===undefined){
                    // msdata = ;
                    bulkdomainextratdata.push({ ...response.data.response, uuid: this.state.uuid ,userid: this.state.user._id});
                    this.setState({
                        count:this.state.count+1,
                        datas:bulkdomainextratdata
                    })
                    this.fetchRecord();
                // }else{
                //     this.fetchRecord();
                // }

            
            })

            
        }
    }



    //****** ==== BACKUP ==== ******//
    // fetchRecord(){
        
    //     if(this.state.totaldomains===this.state.count){
    //         this.setState({
    //             domainextractprocess:'saving'
    //         })
    //         this.storeRecordinDB();
    //     }else{

    //         API3.get(`/extract/${this.state.domainCreate[this.state.count].domain}/${this.state.extractType}/${this.state.extractPhone}/${this.state.extractSocial}`)
    //         .then(response=>{
    //             var bulkdomainextratdata = this.state.datas;
    //             // var msdata= response.data.response;

    //             // let filtered_array = _.find(bulkdomainextratdata, ['domain', response.data.response.domain]);

    //             // if(filtered_array===undefined){
    //                 // msdata = ;
    //                 bulkdomainextratdata.push({ ...response.data.response, uuid: this.state.uuid ,userid: this.state.user._id});
    //                 this.setState({
    //                     count:this.state.count+1,
    //                     datas:bulkdomainextratdata
    //                 })
    //                 this.fetchRecord();
    //             // }else{
    //             //     this.fetchRecord();
    //             // }

            
    //         })

            
    //     }
    // }


    // setRecord(data){
    //     if(this.state.totaldomain===this.state.counter){
    //         console.log('Completed');
    //         this.setState({
    //             domainextractprocess:'saving'
    //         })
    //         this.storeRecordinDB();
    //     }else{
    //         this.fetchRecord(this.state.domainCreate[this.state.counter].domain)
    //     }
    // }


    
    storeRecordinDB=()=>{
        var tmpData={
            uuid:this.state.uuid,
            userid:this.state.user._id,
            listname:this.state.listname,
            totaldomains:_.uniqBy(this.state.datas, 'domain').length,
            datas:_.uniqBy(this.state.datas, 'domain')
        }

        API.post('/bulkdomainextract/storeextractdata',tmpData)
        .then(response=>{
            console.log(response.data)
            this.props.history.push(`/bulks/domainextract/view/${response.data.data.uuid}`)
            this.props.navbarProgressInfo();
        })
    }



    // fetchRecord(domain){
    //     this.setState({currentextractdomainname:domain})
    //     // axios.get(`https://emailextractserver2bulkgetinfo.herokuapp.com/api/bulkdomainextract/testdomainextrat/${domain}`,{timeout:7000})
    //     axios.get(`https://emailextractserver2bulkgetinfo.herokuapp.com/extract/${domain}`)
    

    //     .then(response=>{
    //         console.log(response.data)
    //         var bulkdomainextratdata = this.state.bulkdomainextratdata;
    //         var msdata= response.data;
    //         bulkdomainextratdata.push(msdata);
    //         this.setState({
    //             counter:this.state.counter+1,
    //             bulkdomainextratdata
    //         })
    //         //send data to db
    //         this.storeRecordinDB(msdata);
    //         this.setRecord()
    //     })
    //     .catch(err=>{
    //         var bulkdomainextratdata = this.state.bulkdomainextratdata;
    //         var msdata= {
    //             response:false,
    //             domain:this.state.currentextractdomainname
    //         };
    //         //send data to db
    //         this.storeRecordinDB(msdata);
    //         bulkdomainextratdata.push(msdata);
    //         this.setState({
    //             counter:this.state.counter+1,
    //             bulkdomainextratdata
    //         })
    //         this.setRecord(err)
    //         console.log('err')
    //     })
    // }


    render() {


  console.log(this.state.totaldomains);
  console.log(_.uniqBy(this.state.datas, 'domain'));

        
        return (
            <Body>
                <section>
                    <div className="cuscontainer">
                    {this.props.navbarprogress===null || this.props.navbarprogress===undefined
                    ?<Loader active inline='centered' />
                    :
                    <>
                    <Grid>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <h3>Bulk Domain Search

                                {/* <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="ui button float-right bgmblue text-white"
                                    table="table-to-xls"
                                    filename={'Domains'}
                                    sheet="tablexls"
                                    buttonText="Download as XLS"
                                /> */}
                                {/* } */}

                                <table id="table-to-xls" style={{display:'none'}}>
                                        <tr>
                                        <th>Domain</th>
                                        <th>Emails</th>
                                        {this.state.extractPhone
                                        ?<th>Phone</th>
                                        :<></>}
                                        
                                        {this.state.extractSocial
                                        ?<></>
                                        :<>
                                        <th>GooglePlus</th>
                                        <th>Facebook</th>
                                        <th>Twitter</th>
                                        <th>Instagram</th>
                                        <th>Pinterest</th>
                                        <th>LinkedIn</th>
                                        <th>WhatsApp</th>
                                        <th>YouTube</th>
                                        <th>Skype</th>
                                        </>}
                                        
                                        </tr>

                                        
                                        {this.state.datas.map((data,key)=>{
                                                    return(
                                                        <tr key={key}>
                                                        <td>{data.domain}</td>
                                                        <td>{data.emails.join(", ")}</td>

                                                        {this.state.extractPhone
                                                        ?<td>{data.tel.join(", ")}</td>
                                                        :<></>}
                                                        {this.state.extractSocial
                                                        ?
                                                        <>
                                                        <td>{data.googleplus.join(", ")}</td>
                                                        <td>{data.facebook.join(", ")}</td>
                                                        <td>{data.twitter.join(", ")}</td>
                                                        <td>{data.instagram.join(", ")}</td>
                                                        <td>{data.printrest.join(", ")}</td>
                                                        <td>{data.linkedin.join(", ")}</td>
                                                        <td>{data.whatsapp.join(", ")}</td>
                                                        <td>{data.youtube.join(", ")}</td>
                                                        <td>{data.skype.join(", ")}</td>
                                                        </>
                                                        :<></>
                                                        }
                                                        </tr>
                                                    )
                                        })}
                                    </table>


                                </h3>
                                <h6>Find email addresses from a list of websites or companies.</h6>
                                <br />
                                <br />
                                <div className="bulkdetailsss">
                                    
                                    <p><b>Maxupload:</b> {this.state.maxupload}</p>
                                    <p><b>Extract Left:</b> {this.state.extractleft}</p>
                                    <p><b>Total Credits:</b> {this.state.totalcredits}</p>
                                    <br/>
                                    <p><b>Total Input Domains:</b> {this.state.totaldomains}</p>
                                    <p><b>Domain Extracted:</b> {this.state.count}</p>
                                    <p><b>Status:</b> {this.state.domainextractprocess}</p>
                                    <br/>
                                    <p><b>Extract Phone</b> <span className='jhhj8889'> {this.state.extractPhone?<Checkbox slider checked={true} onClick={()=>this.setState({extractPhone:false})} />:<Checkbox slider checked={false} onClick={()=>this.setState({extractPhone:true})} />} </span></p>
                                    <p><b>Extract Social</b> <span className='jhhj8889'>{this.state.extractSocial?<Checkbox slider checked={true} onClick={()=>this.setState({extractSocial:false})} />:<Checkbox slider checked={false} onClick={()=>this.setState({extractSocial:true})} />}</span></p>
                                    <Form>

                                    <p><b>Extract Type</b></p><br/>
                                    <Form.Group inline style={{position:'absolute',marginTop:'-22px'}}>
                                        
                                        
                                        <Form.Field
                                            control={Radio}
                                            label='Basic'
                                            value='1'
                                            checked={this.state.extractType==='basic'}
                                            onChange={()=>this.setState({extractType:'basic'})}
                                        />
                                        <Form.Field
                                            control={Radio}
                                            label='Normal'
                                            value='2'
                                            checked={this.state.extractType==='normal'}
                                            onChange={()=>this.setState({extractType:'normal'})}
                                        />
                                        <Form.Field
                                            control={Radio}
                                            label='Deep'
                                            value='3'
                                            checked={this.state.extractType==='deep'}
                                            onChange={()=>this.setState({extractType:'deep'})}
                                        />
                                        </Form.Group>
                                        </Form>
                                    
                                </div>  



                                {this.state.domainextractprocess==='extracting...'
                                ?
                                <>
                                <br /><br />
                                <Progress percent={Math.round(percentage.calculate(this.state.count, this.state.totaldomains))} indicating />
                                
                                {/* <center style={{fontSize:'15px',fontWeight:'600',marginTop:'-29px'}}> {this.state.domainCreate!==null?this.state.domainCreate[0]:<></>}  </center> */}
                                </>
                                :<></>
                                }
                                

                            </Grid.Column>
                            {this.state.domainextractprocess==='Waiting'
                            ?
                            <Grid.Column>
                                <Grid columns='equal' className="bulksec">
                                    <Grid.Column>
                                        {this.state.showformbox
                                        ?
                                        
                                        <Form onSubmit={()=>this.handleSubmit(this.props.navbarprogress.packageinfo.mainspeed)}>
                                        <Form.Input label='List name' placeholder='Enter a name' name="listname" onChange={this.handleChange} value={this.state.listname} required />
                                        <Form.TextArea label='Enter the domain names (one per line)' name="domains" onChange={this.handleChange} value={this.state.domains} required placeholder='websiteone.com
websitetwo.com' />
                                        <Button type='submit' className="float-right bgmblue text-white" loading={this.state.loadSubmitButton}>Submit</Button>
                                        </Form>
                                        :
                                        <center>Loading...</center>
                                        }
                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                            :
                            <></>}



                            {this.state.domainextractprocess==='saving'
                            ?
                            <Grid.Column>
                                <Grid columns='equal' className="bulksec">
                                    <Grid.Column>
                                        <center>
                                            <h4>Saving records please wait...</h4>
                                            <h6>Please don't close this tab</h6>

                                        </center>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                            :
                            <></>}
                            
                        </Grid.Row>
                    </Grid>

                    <br />

                
                    {this.state.datas.length===0
                    ?
                    <></>
                    :
                    <>

                    <Table  basic='very'>
                                        <Table.Header>
                                        <Table.Row>
                                        <Table.HeaderCell>Domain</Table.HeaderCell>
                                            
                                            <Table.HeaderCell></Table.HeaderCell>

                                        </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {_.uniqBy(this.state.datas, 'domain').map((data,key)=>{
                                                return(
                                                    <TableRowView data={data} key={key} extractPhone={this.state.extractPhone} extractSocial={this.state.extractSocial} />
                                                )
                                            })}
                                            
                                        </Table.Body>
                                    </Table>

                                    </>
                    }
                    
                    </>
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

export default connect(mapStateToProps, {navbarProgressInfo})(BulkDomainCreate)
