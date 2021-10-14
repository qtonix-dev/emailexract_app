import React, { Component } from 'react'
import Body from '../../components/Body'
import { Table, Grid, Loader } from 'semantic-ui-react'
import MonthlyPackage from '../../components/account/subscrption/MonthlyPackage'
import YearlyPackage from '../../components/account/subscrption/YearlyPackage'
import API from '../../api/API'
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import _ from "lodash";

export class AccountSubscriptionOne extends Component {

    constructor(props){
        super(props)
        this.state={
            pageLoading:true,
            monthly:true
        }
        this.monthlyYearly=this.monthlyYearly.bind(this)
    }


    monthlyYearly(){
        if(this.state.monthly){
            this.setState({monthly:false})
        }else{
            this.setState({monthly:true})

        }
    }


    componentDidMount(){
        API.get('/package')
        .then(response=>{
            var packages = response.data.data
            var monthlypackages = _.filter(packages, function(dta) { return dta.type === 'Monthly'});
            var yearlypackages = _.filter(packages, function(dta) { return dta.type === 'Yearly'});
            this.setState({
                pageLoading:false,monthlypackages,yearlypackages
            })
        })
    }



    render() {
        return (
            <Body>
               <Grid>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                    <section>
                    <div className="accountcontainer">
                        <Grid>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <div className="subscription">
                                        <h1>Take your email outreach to the next level.</h1>
                             
                                        <h3> <span><AiFillCheckCircle /></span> Increased monthly searches and verifications <br />
                                        <span><AiFillCheckCircle /></span>  Domain Search full results and exports  <br />
                                        <span><AiFillCheckCircle /></span> Campaigns premium features  <br />
                                        <span><AiFillCheckCircle /></span> Priority customer support
                                        </h3>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid>

                            {this.state.pageLoading
                            ?<Grid.Column mobile={16} tablet={16} computer={16}><Loader active inline='centered' /></Grid.Column>
                            :
                            <>  
                            <Grid.Column mobile={16} tablet={16} computer={4}>
                               
                               <Table unstackable>
       
   
                                   <Table.Body>
                                   <Table.Row>
                                       <Table.Cell className="subscription_time cursor-pointer" onClick={this.monthlyYearly}>
                                            Monthly
                                            {this.state.monthly
                                            ?<span className="subscription_time_check"><BsCheck /></span>
                                            :
                                            <></>}
                                             
                                           
                                            </Table.Cell>
                                   </Table.Row>
                                   <Table.Row>
                                       <Table.Cell className="subscription_time cursor-pointer" onClick={this.monthlyYearly}> 
                                       Yearly
                                       {this.state.monthly===false
                                            ?<span className="subscription_time_check"><BsCheck /></span>
                                            :
                                            <></>}
                                            </Table.Cell>
                                   </Table.Row>
                                   </Table.Body>
                               </Table>
   
                               </Grid.Column>
                               <Grid.Column mobile={16} tablet={16} computer={12}>
                                   
                                   {this.state.monthly
                                   ?
                                   this.state.monthlypackages.map((mth)=>{
                                       return(
                                        <MonthlyPackage key={mth._id} data={mth}/>
                                       )
                                   })
                                   
                                   
                                   :
                                   this.state.yearlypackages.map((yer)=>{
                                    return(
                                     <YearlyPackage key={yer._id}  data={yer}/>
                                    )
                                    })
                                   }
                                   
   
                               </Grid.Column>
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
}

export default AccountSubscriptionOne
