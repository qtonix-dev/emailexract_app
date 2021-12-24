import React, { Component } from 'react'
import { connect } from 'react-redux'
import Body from '../../../components/Body'
import { Grid, Button, Form, Loader, Table, Progress } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid';
import cookie from 'react-cookies'
import API_BULK_EXTRACT from '../../../api/API_BULK_EXTRACT'
import { toast } from 'react-toastify';
import axios from 'axios'
import percentage from 'calculate-percentages'
import TableRowView from './TableRowView'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export class BulkDomainCreate extends Component {


    constructor(props){
        super(props)
        this.state={
            loadSubmitButton:false,
            uuid:uuidv4(),
            listname:'',
            domains:'',
            speed:4000,
            user:cookie.load('qtonixemailextractweb_userdata'),
            totaldomain:1,
            counter:0,
            domainextractprocess:'Waiting',
            domainCreate:null,
            currentextractdomainname:false,
            bulkdomainextratdata:[]
        }
        this.handleChange=this.handleChange.bind(this)
        this.fetchRecord=this.fetchRecord.bind(this)
        this.setRecord=this.setRecord.bind(this)
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

               
            if (/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(domainurl)) {





    
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
            
            else {
                alert("Enter Valid Domain Name");
                
       
               
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

                //====OLD DONT DELETE
                // API_BULK_EXTRACT.post('/bulkdomainextract/bulkextractbyuser',domainCreate)
                // .then(response=>{
                //     if(response.data.response){
                //         this.props.history.push(`/bulks/domainextract/view/${this.state.uuid}`)
                //     }else{
                //         alert('Failed')
                //     }
                // })

                // ====OLD DONT DELETE
                API_BULK_EXTRACT.post('/bulkdomainextract/new/storebulkinfo',domainCreate)
                .then(response=>{
                    console.log(response.data)
                    // if(response.data.response){
                    //     this.props.history.push(`/bulks/domainextract/view/${this.state.uuid}`)
                    // }else{
                    //     alert('Failed')
                    // }
                    this.fetchRecord(domainCreate[this.state.counter].domain)
                    if(response.data.response){
                            this.setState({
                            domainCreate:domainCreate,
                            totaldomain:domainCreate.length,
                            domainextractprocess:'Processing'
                        })
                        
                    }
                })
            }
        }
    
        







    

    }



    setRecord(data){
        if(this.state.totaldomain===this.state.counter){
            console.log('Completed')
            this.setState({
                domainextractprocess:'Completed'
            })
        }else{
            this.fetchRecord(this.state.domainCreate[this.state.counter].domain)
        }
    }


    
    storeRecordinDB(data){

        var tmpData={
            data,
            uuid:this.state.uuid,
            userid:this.state.user._id
        }

        API_BULK_EXTRACT.post('/bulkdomainextract/new/storebulksubdatasnew',tmpData)
        .then(response=>{
            console.log(response.data)
        })
    }



    fetchRecord(domain){
        this.setState({currentextractdomainname:domain})
        // axios.get(`https://emailextractserver2bulkgetinfo.herokuapp.com/api/bulkdomainextract/testdomainextrat/${domain}`,{timeout:7000})
        axios.get(`https://emailextractserver2bulkgetinfo.herokuapp.com/extract/${domain}`)
    

        .then(response=>{
            console.log(response.data)
            var bulkdomainextratdata = this.state.bulkdomainextratdata;
            var msdata= response.data;
            bulkdomainextratdata.push(msdata);
            this.setState({
                counter:this.state.counter+1,
                bulkdomainextratdata
            })
            //send data to db
            this.storeRecordinDB(msdata);
            this.setRecord()
        })
        .catch(err=>{
            var bulkdomainextratdata = this.state.bulkdomainextratdata;
            var msdata= {
                response:false,
                domain:this.state.currentextractdomainname
            };
            //send data to db
            this.storeRecordinDB(msdata);
            bulkdomainextratdata.push(msdata);
            this.setState({
                counter:this.state.counter+1,
                bulkdomainextratdata
            })
            this.setRecord(err)
            console.log('err')
        })
    }


    render() {
        // console.log(this.state.counter)
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

                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="ui button float-right bgmblue text-white"
                                    table="table-to-xls"
                                    filename={'Domains'}
                                    sheet="tablexls"
                                    buttonText="Download as XLS"
                                />
                                {/* } */}

                                <table id="table-to-xls" style={{display:'none'}}>
                                        <tr>
                                            <th>Domain</th>
                                            <th>Emails</th>
                                        </tr>

                                        
                                        {this.state.bulkdomainextratdata.map((data)=>{
                                                    return(
                                                        <tr key={data.response.domain}>
                                                            <td>{data.response.domain}</td>
                                                            <td>
                                                            {data.response.status==='Found'
                                                                ?
                                                                    data.response.emails.map((ds)=>{
                                                                        return(
                                                                            <>
                                                                            {ds}, &nbsp;
                                                                            </>
                                                                        )
                                                                    })
                                                                :
                                                                <>-</>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                        })}
                                    </table>


                                </h3>
                                <h6>Find email addresses from a list of websites or companies.</h6>
                                <br />
                                <br />
                                <div className="bulkdetailsss">
                                    <p><b>Total Input Domains:</b> {this.state.totaldomain}</p>
                                    <p><b>Domain Extracted:</b> {this.state.counter}</p>
                                    <p><b>Status:</b> {this.state.domainextractprocess}</p>
                                </div>  



                                {this.state.domainextractprocess==='Processing'
                                ?
                                <>
                                <Progress percent={Math.round(percentage.calculate(this.state.counter, this.state.totaldomain))} progress />
                                
                                <center style={{fontSize:'15px',fontWeight:'600',marginTop:'-29px'}}>{this.state.currentextractdomainname===false?'':<>{this.state.currentextractdomainname}...</> } </center>
                                </>
                                :<></>
                                }
                                

                            </Grid.Column>
                            {this.state.domainextractprocess==='Waiting'
                            ?
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
                            :
                            <></>}
                            
                        </Grid.Row>
                    </Grid>

                    <br />

                
                    {this.state.bulkdomainextratdata.length===0
                    ?
                    <></>
                    :
                    <>

                    <Table  basic='very'>
                                        <Table.Header>
                                        <Table.Row>
                                        <Table.HeaderCell>Domain</Table.HeaderCell>
                                            <Table.HeaderCell>Emails</Table.HeaderCell>
                                            <Table.HeaderCell>Tel</Table.HeaderCell>
                                            <Table.HeaderCell></Table.HeaderCell>

                                        </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {this.state.bulkdomainextratdata.map((data,key)=>{
                                                return(
                                                    <TableRowView data={data} key={key} />
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

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkDomainCreate)
