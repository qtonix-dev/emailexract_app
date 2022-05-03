import React, { Component } from 'react'
import { connect } from 'react-redux'
import Body from '../../components/Body'
import { Grid } from 'semantic-ui-react'
import AccountInformation from '../../components/account/account/AccountInformation'
import AccountPassword from '../../components/account/account/AccountPassword'
import AccountDelete from '../../components/account/account/AccountDelete'
import AccountSidenav from '../../components/account/AccountSidenav'

export class AccountHome extends Component {

    render() {
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
                                    {this.props.user===undefined
                                    ?
                                    <>
                                    </>
                                    :
                                    <>
                                    <h2>{this.props.user.name}</h2>
                                    <p>{this.props.user.email}</p>
                                    </>
                                    }
                                    
                                    
                                </Grid.Column>
                                <Grid.Column>
                                    <div className="accountcontainer_box">
                                        <AccountInformation />
                                        <hr />
                                        <AccountPassword />
                                        {this.props.user===undefined
                                        ?
                                        <>
                                        </>
                                        :
                                        this.props.user.type==='SubUser'
                                        ?<></>
                                        :<>
                                        <hr />
                                        <AccountDelete />
                                        </>
                                        }
                                        
                                    </div>
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
}

const mapStateToProps = (state) => ({
    user:state.users
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountHome)
