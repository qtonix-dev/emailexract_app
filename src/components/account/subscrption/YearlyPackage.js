import React from 'react'
import { connect } from 'react-redux'
import { Grid, Card, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import FreeButton from './FreeButton'


export const YearlyPackage = (props) => {

    var data = props.data;
    var user = props.user;


    return (
        <Card className="w-100">
                                    <Card.Content>
                                        <Card.Description>
                                            <Grid>
                                                <Grid.Column mobile={6} tablet={6} computer={8}>
                                                    <div className="subsdetone">
                                                        <h4>{data.name} </h4>
                                                        <p><b>{data.totalsingledomain}</b> single domain search /month</p>
                                                        <p><b>{data.totalemailverification}</b> email verification /month</p>
                                                        <p><b>{data.totalemailsearch}</b> email search /month</p>
                                                        <p><b>{data.totalbuldomainkextract}</b> bulk domain extract /month</p>

                                                    </div>
                                                </Grid.Column>
                                                <Grid.Column mobile={5} tablet={5} computer={5} verticalAlign="middle">
                                                    <div className="subsdettwo">
                                                        <h4>${data.displayprice} /year </h4>
                                                        <p> Billed yearly</p>
                                                    </div>
                                                </Grid.Column>
                                                <Grid.Column mobile={5} tablet={5} computer={3} verticalAlign="middle">
                                                
                                                {props.navbarprogress===null
                                                    ?
                                                    <></>
                                                    :
                                                    <>
                                                    {props.navbarprogress.package==='active'
                                                    ?
                                                    <>
                                                        {props.navbarprogress.packageinfo._id===data._id
                                                        ?
                                                        <>
                                                        <h2 className="text-success">Active</h2>
                                                        </>
                                                        :
                                                        <>
                                                        {data.name==='Free'
                                                        ?<FreeButton data={data} />
                                                        :<Link exact to={`/account/subscription/pay/61519ea638decb4661519ea638/${data._id}/${user._id}/61519ea638decb46c8473a8061519ea638decb46c8473a80/638decb46c8473a80615`}><Button className="w-100 bgmblue text-white">Select</Button></Link>
                                                        }
                                                        </>
                                                        }

                                                    </>
                                                    :
                                                    <>
                                                    {data.name==='Free'
                                                    ?<FreeButton data={data} />
                                                    :<Link exact to={`/account/subscription/pay/61519ea638decb4661519ea638/${data._id}/${user._id}/61519ea638decb46c8473a8061519ea638decb46c8473a80/638decb46c8473a80615`}><Button className="w-100 bgmblue text-white">Select</Button></Link>
                                                    }
                                                    
                                                    </>
                                                    }
                                                    </>
                                                    }


                                                {/* <Link exact to={`/account/subscription/pay/61519ea638decb4661519ea638/${data._id}/${user._id}/61519ea638decb46c8473a8061519ea638decb46c8473a80/638decb46c8473a80615`}><Button className="w-100 bgmblue text-white">Select</Button></Link> */}
                                                
                                                </Grid.Column>
                                            </Grid>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
    )
}

const mapStateToProps = (state) => ({
    user:state.users,
    navbarprogress:state.navbarprogress
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(YearlyPackage)
