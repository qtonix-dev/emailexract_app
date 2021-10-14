import React, { Component } from 'react'
import Body from '../../components/Body'
import {Grid,Form,Table, Button, List, Loader, Input} from 'semantic-ui-react'
import { AiOutlineLock } from "react-icons/ai";
import API from '../../api/API'
import moment from 'moment';
import { toast } from 'react-toastify';
import ReactFormInputValidation from "react-form-input-validation";
import cookie from 'react-cookies'
import { uuid } from 'uuidv4';

export class AccountSubscriptionTwo extends Component {

    // constructor(props){
    //     super(props)
    //     this.state={
    //         pageLoading:true,
    //         packagedetails:null,
    //         userdetails:null,
    //         coupon:false,
    //         couponname:'',
    //         couponprice:0,
    //     }
    //     this.applyCoupon=this.applyCoupon.bind(this);
    // }

    constructor(props) {
        super(props);
        this.state = {
            uuid:uuid(),
            secondform:false,
            pageLoading:true,
            formLoading:false,
            packagedetails:null,
            userid:cookie.load('qtonixemailextractweb_userid'),
            coupon:false,
            couponname:'',
            couponprice:0,
            fields: {
            type: "User"
          },
          errors: {}
        };
        this.form = new ReactFormInputValidation(this);
        this.applyCoupon=this.applyCoupon.bind(this);

        this.form.useRules({
            name: "required|max:70",
            email: "required|email|max:70",
            company: "required|max:20",
            phone: "required|numeric|digits_between:10,12",
            zip: "required|numeric|digits_between:5,10",
            city: "required|max:20",
            country: "required|max:20",
            address: "required|max:100",

        });
        this.form.onformsubmit = (fields) => {


            var tempData = {
                name:fields.name,
                email:fields.email,
                company:fields.company,
                phone:fields.phone,
                zip:fields.zip,
                city:fields.city,
                country:fields.country,
                address:fields.address,
                packagedetails:this.state.packagedetails,
                userid:this.state.userid,
                coupon:this.state.coupon,
                couponname:this.state.couponname,
                couponprice:this.state.couponprice,
                uuid:this.state.uuid,
                amountpaid:this.state.packagedetails.displayprice-this.state.couponprice
            }


            // SET COOKIES
            cookie.remove('qtonixemailextractweb_paymentdetails');
            var expires = new Date();
            expires.setSeconds(21600);
            cookie.save('qtonixemailextractweb_paymentdetails', tempData, { path: '/',expires });


            this.setState({
                secondform:true,
                formLoading:true,
            })

            document.getElementById('theForm').submit();
            

        }
      }


    componentDidMount(){
        // console.log(`userid- ${this.props.match.params.userid} packageid- ${this.props.match.params.packageid}`)

        // document.getElementById('theForm').submit();
        cookie.remove('qtonixemailextractweb_paymentdetails', { path: '/' })



        var temmpData={
            userid:this.props.match.params.userid,
            packageid:this.props.match.params.packageid
        }


        API.post('/user/checkpackage',temmpData,{timeout:5000})
        .then(response=>{
            this.setState({
                packagedetails:response.data.package,
                pageLoading:false
            })
        })
        .catch((err)=>{
            this.props.history.push('/account/subscription/view')
        })
    }



    applyCoupon(e){
        console.log(e);
        this.setState({
            coupon:true,
            couponname:e.name,
            couponprice:e.price,
        })


    }

    render() {

        // var price1 = parseInt(this.state.packagedetails.mainprice);
        // var price2 = parseInt(this.state.couponprice);
        // var totalpri = price1-price2;


        console.log(this.state);

        return (
            <Body>
                <section>
                    <div className="accountcontainer">

                        {this.state.pageLoading
                        ?<Loader active inline='centered' />
                        :
                        <>
                        <Form onSubmit={this.form.handleSubmit} loading={this.state.formLoading}>
                        <Grid>
                            
                            <Grid.Column mobile={16} tablet={16} computer={16}>
                                <div className="subscriptiontwo_head">
                                    <center>
                                        <h2>Upgrade to {this.state.packagedetails.name} Plan </h2>
                                    </center>
                                </div>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={16} computer={16}>
                                <div className="subscriptiontwo_body">
                                    <h5> <span>1</span> Complete your billing information </h5>
                                    <Form.Input fluid label='Name' placeholder='Name' name="name" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.name} error={this.state.errors.name?this.state.errors.name:false} />
                                    <Form.Input fluid label='Email' placeholder='Email'  name="email" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.email} error={this.state.errors.email?this.state.errors.email:false} />

                                    <Form.Group widths='equal'>
                                        <Form.Input fluid label='Company Name' placeholder='Company Name'name="company" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.company} error={this.state.errors.company?this.state.errors.company:false}  />
                                        <Form.Input fluid label='Phone Number' placeholder='Phone Number' name="phone" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.phone} error={this.state.errors.phone?this.state.errors.phone:false}  />

                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                            <Form.Input fluid label='Postal / ZIP code' placeholder='Postal / ZIP code' name="zip" width={4} onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.zip} error={this.state.errors.zip?this.state.errors.zip:false}  />
                                            <Form.Input fluid label='City' placeholder='City' width={5} name="city" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.city} error={this.state.errors.city?this.state.errors.city:false}  />
                                            <Form.Input fluid label='Country' placeholder='Country' width={6} name="country"  onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.country} error={this.state.errors.country?this.state.errors.country:false} />

                                    </Form.Group>
                                    <Form.Input fluid label='Address' placeholder='Address' name='address' onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.address} error={this.state.errors.address?this.state.errors.address:false}  />

                                    <label htmlFor="">Please make sure this address matches the one known by your bank. </label>
                                </div>
                            </Grid.Column>

                            <Grid.Column mobile={16} tablet={16} computer={16}>
                                <div className="subscriptiontwo_body">
                                    
                                    <h5> <span>2</span>  Review your order </h5>
                                    <Table basic='very'>
                                        

                                        <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>Price <span className="float-right">${this.state.packagedetails.displayprice} USD</span></Table.Cell>
                                        </Table.Row>
                                        
                                        <Table.Row>
                                            <Table.Cell>Tax  <span className="float-right"> 0 USD </span></Table.Cell>
                                        </Table.Row>

                                        {this.state.coupon
                                        ?
                                        <Table.Row>
                                            <Table.Cell>Coupon  <span className="float-right">- ${this.state.couponprice} USD </span></Table.Cell>
                                        </Table.Row>
                                        :<></>
                                        }
                                        
                                        <Table.Row>
                                            <Table.Cell>Total  <span className="float-right">${this.state.packagedetails.displayprice-this.state.couponprice} USD</span></Table.Cell>
                                        </Table.Row>
                                        </Table.Body>
                                    </Table>

                                    {this.state.coupon
                                    ?
                                    <>
                                    <div className="subscriptiontwo_appliedcoupon">
                                        <p>{this.state.couponname} Coupon Applied</p>
                                    </div>
                                    </>
                                    :
                                    <Coupons runf={this.applyCoupon} />
                                    }
                                    

                                    <Button className="payandupgradebtn"> <span><AiOutlineLock /></span> Pay and Upgrade</Button>
                                    
                                </div>
                            </Grid.Column>
                            
                        </Grid>
                        </Form>

                        <br />
                        <List bulleted>
                            <List.Item className="listitem122">The requests of your plan will be renewed every month. Your next billing will be on {this.state.packagedetails.type==='Monthly'?moment().add(1, 'M').format('MMMM DD, YYYY'):moment().add(1, 'Y').format('MMMM DD, YYYY')}</List.Item>
                            <List.Item className="listitem122">You can cancel or modify your subscription at any time in the "Subscription" section of your dashboard. When you cancel, your premium plan is kept active until the next billing date.</List.Item>
                        
                            <List.Item className="listitem122">By placing this order, you agree to our Terms of Service.</List.Item>
                        </List>
                        <br />
                        </>
                        }

                        {this.state.secondform
                        ?
                        <form action={`${process.env.REACT_APP_BACKENDURL}/api/user/userpayment`} method="POST" id="theForm" hidden>
                            <button type="submit">Checkout</button>
                            <input type="hidden" name="uuid" value={this.state.uuid} />
                            <input type="hidden" name="email" value={this.state.fields.email} />
                            <input type="hidden" name="product" value={this.state.packagedetails.name} />
                            <input type="hidden" name="totalamount" value={this.state.packagedetails.displayprice-this.state.couponprice} />

                        </form>
                        :
                        <></>}
                        

                        
                    </div>
                </section>
            </Body>
        )
    }
}











class Coupons extends React.Component {

    constructor(props){
        super(props)
        this.state={
            hidden:false,
            hiddenForm:true,
            code:''
        }
        this.showHideForm=this.showHideForm.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
   
    handleSubmit=(e)=>{

        console.log(this.props)

        if(this.state.code===''){
            toast.error('Please enter coupon code', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{

            API.get(`/coupon/matchcode/${this.state.code}`)
            .then(response=>{
                console.log(response.data)
                if(response.data.response){
                    this.props.runf(response.data.data)
                }else{
                    toast.error('Invalid code', {
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
    }

    showHideForm(){
        if(this.state.hiddenForm){
            this.setState({
                hiddenForm:false
            })
        }else{
            this.setState({
                hiddenForm:true
            })
        }
    }


    render() {
      return(
        <div className="subscriptiontwo_coupon">
            <h4>Have a coupon? <span onClick={this.showHideForm}>Click here to enter your code</span></h4>

            <div className="subscriptiontwo_showhideform" hidden={this.state.hiddenForm}>
                {/* <Form onSubmit={this.handleSubmit}> */}
                {/* <Form.Group disabled={true}>
                    <Form.Input
                        placeholder='Code'
                        name='code'
                        value={this.state.code}
                        onChange={this.handleChange}
                    />
                    <Form.Button content='Apply' onClick={this.handleSubmit} />
                </Form.Group> */}


                    <Input type='text' name='code' value={this.state.code} onChange={this.handleChange} action style={{width:'200px', heght:'32px'}}>
                        <input />
                        <Button type='button' onClick={this.handleSubmit} style={{backgroundColor:'#0495fd', color:'white'}}>Search</Button>
                    </Input>

                {/* </Form> */}
            </div>
        </div>
      )
    }
}


export default AccountSubscriptionTwo;




